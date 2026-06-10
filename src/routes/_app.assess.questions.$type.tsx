import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { QuestionCard } from "@/components/QuestionCard";
import { OptionButton } from "@/components/OptionButton";
import { Button } from "@/components/Button";
import { useDraft } from "@/lib/assessment/draft";
import { useState } from "react";
import type { ActivityType } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/questions/$type")({
  component: Page,
});

interface Q {
  key: string;
  q: string;
  type: "options" | "slider" | "yesno";
  options?: { v: string; label: string; common?: Partial<Record<string, number | boolean>> }[];
  commonKey?: "painLevel" | "activityImpact" | "dailyImpact" | "restResponse" | "loadIncrease" | "radiatingMild";
}

const RUNNING: Q[] = [
  { key: "onset", q: "อาการปวดเริ่มขึ้นเมื่อใด?", type: "options", options: [
    { v: "today", label: "วันนี้" },
    { v: "week", label: "ภายใน 1 สัปดาห์" },
    { v: "2weeks", label: "1-2 สัปดาห์" },
    { v: "month", label: "มากกว่า 1 เดือน" },
  ]},
  { key: "loadInc", q: "ใน 1-2 สัปดาห์ที่ผ่านมา คุณเพิ่มระยะ ความเร็ว ความถี่ ทางชัน หรือความเข้มข้นหรือไม่?", type: "yesno", commonKey: "loadIncrease" },
  { key: "duringRun", q: "ขณะวิ่ง อาการปวดเป็นอย่างไร?", type: "options", options: [
    { v: "warmup", label: "ปวดตอนเริ่ม แล้วดีขึ้น", common: { activityImpact: 1 } },
    { v: "during", label: "ปวดมากขึ้นเรื่อย ๆ", common: { activityImpact: 2 } },
    { v: "stop", label: "ปวดจนต้องหยุด", common: { activityImpact: 3 } },
  ]},
  { key: "afterRun", q: "หลังวิ่งหรือพัก 24-48 ชม. อาการเป็นอย่างไร?", type: "options", options: [
    { v: "better", label: "ดีขึ้น", common: { restResponse: 0 } },
    { v: "same", label: "เท่าเดิม", common: { restResponse: 1 } },
    { v: "worse", label: "แย่ลงเล็กน้อย", common: { restResponse: 2 } },
    { v: "muchworse", label: "แย่ลงมาก", common: { restResponse: 3 } },
  ]},
  { key: "dailyLife", q: "อาการกระทบชีวิตประจำวันหรือไม่?", type: "options", options: [
    { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
    { v: "mild", label: "กระทบเล็กน้อย", common: { dailyImpact: 1 } },
    { v: "much", label: "เดิน/ก้ม/ยืนลำบาก", common: { dailyImpact: 2 } },
    { v: "severe", label: "ใช้ชีวิตปกติไม่ได้", common: { dailyImpact: 3 } },
  ]},
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  { key: "radiatingMild", q: "มีอาการปวดร้าว ชา หรืออ่อนแรงเล็กน้อยหรือไม่?", type: "yesno", commonKey: "radiatingMild" },
];

const WEIGHTS: Q[] = [
  { key: "exercise", q: "ท่าใดกระตุ้นอาการมากที่สุด?", type: "options", options: [
    { v: "squat", label: "Squat" }, { v: "deadlift", label: "Deadlift" },
    { v: "ohp", label: "Overhead Press" }, { v: "bench", label: "Bench Press" },
    { v: "row", label: "Row" }, { v: "hipthrust", label: "Hip Thrust" },
    { v: "core", label: "Core Exercise" }, { v: "other", label: "อื่น ๆ / ไม่แน่ใจ" },
  ]},
  { key: "when", q: "อาการปวดเกิดขึ้นเมื่อใด?", type: "options", options: [
    { v: "during", label: "ระหว่างเล่น", common: { activityImpact: 2 } },
    { v: "after", label: "หลังเล่นทันที", common: { activityImpact: 1 } },
    { v: "nextday", label: "วันถัดมา", common: { activityImpact: 1 } },
    { v: "always", label: "ปวดต่อเนื่อง", common: { activityImpact: 3 } },
  ]},
  { key: "loadInc", q: "1-2 สัปดาห์ที่ผ่านมา เพิ่มน้ำหนัก เซ็ต เร็พ วันฝึก หรือลองท่าใหม่หรือไม่?", type: "yesno", commonKey: "loadIncrease" },
  { key: "formBreak", q: "ฟอร์มหลุดหรือเสียการควบคุมแกนกลางหรือไม่?", type: "yesno" },
  { key: "stopped", q: "ต้องหยุดเล่นกลางคันหรือไม่?", type: "yesno" },
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  { key: "radiatingMild", q: "มีอาการปวดร้าว ชา หรืออ่อนแรงเล็กน้อยหรือไม่?", type: "yesno", commonKey: "radiatingMild" },
  { key: "dailyLife", q: "อาการกระทบชีวิตประจำวันหรือไม่?", type: "options", options: [
    { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
    { v: "mild", label: "กระทบเล็กน้อย", common: { dailyImpact: 1 } },
    { v: "much", label: "เดิน/ก้ม/ยืนลำบาก", common: { dailyImpact: 2 } },
    { v: "severe", label: "ใช้ชีวิตปกติไม่ได้", common: { dailyImpact: 3 } },
  ]},
];

const UNSURE: Q[] = [
  { key: "cause", q: "คุณคิดว่าอะไรเป็นสาเหตุของอาการ?", type: "options", options: [
    { v: "unknown", label: "ไม่แน่ใจ" },
    { v: "lifestyle", label: "นั่งนาน/ท่าทาง" },
    { v: "exercise", label: "การออกกำลังกาย" },
    { v: "lift", label: "ยกของหนัก" },
  ]},
  { key: "when", q: "อาการปวดเกิดบ่อยเมื่อใด?", type: "options", options: [
    { v: "morning", label: "ตื่นนอน" },
    { v: "sit", label: "นั่งนาน" },
    { v: "move", label: "ขณะเคลื่อนไหว" },
    { v: "unsure2", label: "ไม่แน่ใจ" },
  ]},
  { key: "feel", q: "ลักษณะอาการปวดเป็นอย่างไร?", type: "options", options: [
    { v: "dull", label: "ปวดตื้อ" },
    { v: "sharp", label: "ปวดแปลบ" },
    { v: "stiff", label: "ตึง" },
    { v: "unsure3", label: "ไม่แน่ใจ" },
  ]},
  { key: "dailyLife", q: "กระทบชีวิตประจำวันหรือออกกำลังกายแค่ไหน?", type: "options", options: [
    { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
    { v: "mild", label: "เล็กน้อย", common: { dailyImpact: 1 } },
    { v: "much", label: "ปานกลาง", common: { dailyImpact: 2 } },
    { v: "severe", label: "มาก", common: { dailyImpact: 3 } },
  ]},
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  { key: "afterRest", q: "ดีขึ้นหลังพักหรือไม่?", type: "options", options: [
    { v: "better", label: "ดีขึ้น", common: { restResponse: 0 } },
    { v: "same", label: "เท่าเดิม", common: { restResponse: 1 } },
    { v: "worse", label: "แย่ลง", common: { restResponse: 2 } },
  ]},
];

const BANKS: Record<ActivityType, Q[]> = {
  running: RUNNING,
  weights: WEIGHTS,
  unsure: UNSURE,
};

function Page() {
  const { type } = useParams({ from: "/_app/assess/questions/$type" });
  const nav = useNavigate();
  const draft = useDraft();
  const questions = BANKS[type as ActivityType] ?? UNSURE;
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAns = (q: Q, v: string) => {
    setAnswers((a) => ({ ...a, [q.key]: v }));
    draft.setDetail(q.key, v);
    if (q.type === "yesno" && q.commonKey) {
      draft.setCommon({ [q.commonKey]: v === "yes" } as never);
    }
    if (q.type === "options" && q.options) {
      const opt = q.options.find((o) => o.v === v);
      if (opt?.common) draft.setCommon(opt.common as never);
    }
  };

  const allAnswered = questions.every((q) => answers[q.key] !== undefined);

  const onSubmit = () => {
    // count unsure
    const unsureCount = Object.values(answers).filter((v) =>
      String(v).toLowerCase().includes("unsure")
    ).length;
    nav({ to: "/assess/processing", search: { unsure: unsureCount } });
  };

  const title = type === "running" ? "วิ่ง / Cardio" : type === "weights" ? "Weight Training" : "ไม่แน่ใจ";

  return (
    <>
      <AppHeader title={title} back />
      <ProgressSteps step={4} total={5} />
      <div className="flex-1 space-y-4 px-4 pb-6">
        {questions.map((q, i) => (
          <QuestionCard key={q.key} number={i + 1} total={questions.length} question={q.q}>
            {q.type === "yesno" && (
              <>
                <OptionButton selected={answers[q.key] === "no"} onClick={() => setAns(q, "no")}>ไม่ใช่</OptionButton>
                <OptionButton selected={answers[q.key] === "yes"} onClick={() => setAns(q, "yes")}>ใช่</OptionButton>
              </>
            )}
            {q.type === "options" && q.options?.map((o) => (
              <OptionButton key={o.v} selected={answers[q.key] === o.v} onClick={() => setAns(q, o.v)}>
                {o.label}
              </OptionButton>
            ))}
            {q.type === "slider" && (
              <div>
                <input
                  type="range" min={0} max={10}
                  value={draft.common.painLevel}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    draft.setCommon({ painLevel: n });
                    setAnswers((a) => ({ ...a, [q.key]: String(n) }));
                  }}
                  className="w-full accent-[oklch(0.68_0.13_180)]"
                />
                <div className="mt-1 flex justify-between text-xs text-navy-soft">
                  <span>0 ไม่ปวด</span>
                  <span className="text-lg font-bold text-navy">{draft.common.painLevel}</span>
                  <span>10 ปวดมาก</span>
                </div>
              </div>
            )}
          </QuestionCard>
        ))}
        <Button full size="lg" disabled={!allAnswered} onClick={onSubmit}
          className={!allAnswered ? "opacity-50" : ""}>
          ดูผลการประเมิน
        </Button>
      </div>
    </>
  );
}
