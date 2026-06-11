import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { QuestionCard } from "@/components/QuestionCard";
import { OptionButton } from "@/components/OptionButton";
import { Button } from "@/components/Button";
import { useDraft } from "@/lib/assessment/draft";
import { useState } from "react";
import { Info } from "lucide-react";
import type { ActivityType } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/questions/$type")({
  component: Page,
});

const EXERCISE_HELPERS = {
  squat: {
    thai: "สควอต",
    english: "Squat",
    description: "ท่าย่อและยืนขึ้นโดยใช้ข้อสะโพก เข่า และข้อเท้าร่วมกัน มักใช้ฝึกขาและสะโพก",
  },
  deadlift: {
    thai: "เดดลิฟต์",
    english: "Deadlift",
    description: "ท่ายกน้ำหนักจากพื้นขึ้นมายืน โดยเน้นการพับสะโพกและควบคุมลำตัว",
  },
  rdl: {
    thai: "โรมาเนียนเดดลิฟต์",
    english: "Romanian Deadlift",
    description: "ท่าพับสะโพกขณะถือดัมบ์เบลหรือบาร์ โดยงอเข่าเล็กน้อยและเคลื่อนไหวช่วงสะโพก",
  },
  ohp: {
    thai: "โอเวอร์เฮดเพรส",
    english: "Overhead Press",
    description: "ท่าดันน้ำหนักจากระดับไหล่ขึ้นเหนือศีรษะ โดยใช้ไหล่ แขน และการควบคุมลำตัว",
  },
  bench: {
    thai: "เบนช์เพรส",
    english: "Bench Press",
    description: "ท่าดันน้ำหนักจากระดับอกขณะนอนบนม้านั่ง โดยใช้หน้าอก ไหล่ และแขน",
  },
  row: {
    thai: "โรว์",
    english: "Row",
    description: "ท่าดึงน้ำหนักเข้าหาลำตัวเพื่อฝึกกล้ามเนื้อหลัง ไหล่ด้านหลัง และแขน",
  },
  hipthrust: {
    thai: "ฮิปทรัสต์",
    english: "Hip Thrust",
    description: "ท่ายกสะโพกขึ้นลงโดยพิงหลังกับม้านั่งหรือพื้น มักใช้ฝึกกล้ามเนื้อสะโพก",
  },
  legpress: {
    thai: "เลกเพรส",
    english: "Leg Press",
    description: "ท่าดันแผ่นน้ำหนักด้วยขาบนเครื่องออกกำลังกาย โดยงอและเหยียดเข่าเป็นหลัก",
  },
  plank: {
    thai: "แพลงก์",
    english: "Plank",
    description: "ท่าค้างลำตัวให้เป็นแนวตรงโดยใช้แขนหรือศอกพยุงตัว เพื่อฝึกการควบคุมแกนกลาง",
  },
  legraise: {
    thai: "เลกเรส",
    english: "Leg Raise",
    description: "ท่ายกขาขึ้นลงขณะนอนหรือนั่งพิง เพื่อฝึกการควบคุมหน้าท้องและสะโพก",
  },
  situp: {
    thai: "ซิตอัป",
    english: "Sit-up",
    description:
      "ท่าลุกลำตัวจากท่านอนหงายขึ้นมานั่ง โดยใช้กล้ามเนื้อหน้าท้องและสะโพกช่วยเคลื่อนไหว",
  },
} as const;

type ExerciseHelpKey = keyof typeof EXERCISE_HELPERS;

interface Q {
  key: string;
  q: string;
  type: "options" | "slider" | "yesno";
  options?: {
    v: string;
    label: string;
    helperKey?: ExerciseHelpKey;
    common?: Partial<Record<string, number | boolean>>;
  }[];
  commonKey?:
    | "painLevel"
    | "activityImpact"
    | "dailyImpact"
    | "restResponse"
    | "loadIncrease"
    | "radiatingMild";
}

const RUNNING: Q[] = [
  {
    key: "onset",
    q: "อาการปวดเริ่มขึ้นเมื่อใด?",
    type: "options",
    options: [
      { v: "today", label: "วันนี้" },
      { v: "week", label: "ภายใน 1 สัปดาห์" },
      { v: "2weeks", label: "1-2 สัปดาห์" },
      { v: "month", label: "มากกว่า 1 เดือน" },
    ],
  },
  {
    key: "loadInc",
    q: "ใน 1-2 สัปดาห์ที่ผ่านมา คุณเพิ่มระยะ ความเร็ว ความถี่ ทางชัน หรือความเข้มข้นหรือไม่?",
    type: "yesno",
    commonKey: "loadIncrease",
  },
  {
    key: "duringRun",
    q: "ขณะวิ่ง อาการปวดเป็นอย่างไร?",
    type: "options",
    options: [
      { v: "warmup", label: "ปวดตอนเริ่ม แล้วดีขึ้น", common: { activityImpact: 1 } },
      { v: "during", label: "ปวดมากขึ้นเรื่อย ๆ", common: { activityImpact: 2 } },
      { v: "stop", label: "ปวดจนต้องหยุด", common: { activityImpact: 3 } },
    ],
  },
  {
    key: "afterRun",
    q: "หลังวิ่งหรือพัก 24-48 ชม. อาการเป็นอย่างไร?",
    type: "options",
    options: [
      { v: "better", label: "ดีขึ้น", common: { restResponse: 0 } },
      { v: "same", label: "เท่าเดิม", common: { restResponse: 1 } },
      { v: "worse", label: "แย่ลงเล็กน้อย", common: { restResponse: 2 } },
      { v: "muchworse", label: "แย่ลงมาก", common: { restResponse: 3 } },
    ],
  },
  {
    key: "dailyLife",
    q: "อาการกระทบชีวิตประจำวันหรือไม่?",
    type: "options",
    options: [
      { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
      { v: "mild", label: "กระทบเล็กน้อย", common: { dailyImpact: 1 } },
      { v: "much", label: "เดิน/ก้ม/ยืนลำบาก", common: { dailyImpact: 2 } },
      { v: "severe", label: "ใช้ชีวิตปกติไม่ได้", common: { dailyImpact: 3 } },
    ],
  },
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  {
    key: "radiatingMild",
    q: "มีอาการปวดร้าว ชา หรืออ่อนแรงเล็กน้อยหรือไม่?",
    type: "yesno",
    commonKey: "radiatingMild",
  },
];

const WEIGHTS: Q[] = [
  {
    key: "exercise",
    q: "ท่าใดกระตุ้นอาการมากที่สุด?",
    type: "options",
    options: [
      { v: "squat", label: "สควอต (Squat)", helperKey: "squat" },
      { v: "deadlift", label: "เดดลิฟต์ (Deadlift)", helperKey: "deadlift" },
      { v: "rdl", label: "โรมาเนียนเดดลิฟต์ (Romanian Deadlift)", helperKey: "rdl" },
      { v: "ohp", label: "โอเวอร์เฮดเพรส (Overhead Press)", helperKey: "ohp" },
      { v: "bench", label: "เบนช์เพรส (Bench Press)", helperKey: "bench" },
      { v: "row", label: "โรว์ (Row)", helperKey: "row" },
      { v: "hipthrust", label: "ฮิปทรัสต์ (Hip Thrust)", helperKey: "hipthrust" },
      { v: "legpress", label: "เลกเพรส (Leg Press)", helperKey: "legpress" },
      { v: "plank", label: "แพลงก์ (Plank)", helperKey: "plank" },
      { v: "legraise", label: "เลกเรส (Leg Raise)", helperKey: "legraise" },
      { v: "situp", label: "ซิตอัป (Sit-up)", helperKey: "situp" },
      { v: "core", label: "ท่าแกนกลางลำตัวอื่น ๆ" },
      { v: "other", label: "อื่น ๆ / ไม่แน่ใจ" },
    ],
  },
  {
    key: "when",
    q: "อาการปวดเกิดขึ้นเมื่อใด?",
    type: "options",
    options: [
      { v: "during", label: "ระหว่างเล่น", common: { activityImpact: 2 } },
      { v: "after", label: "หลังเล่นทันที", common: { activityImpact: 1 } },
      { v: "nextday", label: "วันถัดมา", common: { activityImpact: 1 } },
      { v: "always", label: "ปวดต่อเนื่อง", common: { activityImpact: 3 } },
    ],
  },
  {
    key: "loadInc",
    q: "1-2 สัปดาห์ที่ผ่านมา เพิ่มน้ำหนัก เซ็ต เร็พ วันฝึก หรือลองท่าใหม่หรือไม่?",
    type: "yesno",
    commonKey: "loadIncrease",
  },
  { key: "formBreak", q: "ฟอร์มหลุดหรือเสียการควบคุมแกนกลางหรือไม่?", type: "yesno" },
  { key: "stopped", q: "ต้องหยุดเล่นกลางคันหรือไม่?", type: "yesno" },
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  {
    key: "radiatingMild",
    q: "มีอาการปวดร้าว ชา หรืออ่อนแรงเล็กน้อยหรือไม่?",
    type: "yesno",
    commonKey: "radiatingMild",
  },
  {
    key: "dailyLife",
    q: "อาการกระทบชีวิตประจำวันหรือไม่?",
    type: "options",
    options: [
      { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
      { v: "mild", label: "กระทบเล็กน้อย", common: { dailyImpact: 1 } },
      { v: "much", label: "เดิน/ก้ม/ยืนลำบาก", common: { dailyImpact: 2 } },
      { v: "severe", label: "ใช้ชีวิตปกติไม่ได้", common: { dailyImpact: 3 } },
    ],
  },
];

const UNSURE: Q[] = [
  {
    key: "cause",
    q: "คุณคิดว่าอะไรเป็นสาเหตุของอาการ?",
    type: "options",
    options: [
      { v: "unknown", label: "ไม่แน่ใจ" },
      { v: "lifestyle", label: "นั่งนาน/ท่าทาง" },
      { v: "exercise", label: "การออกกำลังกาย" },
      { v: "lift", label: "ยกของหนัก" },
    ],
  },
  {
    key: "when",
    q: "อาการปวดเกิดบ่อยเมื่อใด?",
    type: "options",
    options: [
      { v: "morning", label: "ตื่นนอน" },
      { v: "sit", label: "นั่งนาน" },
      { v: "move", label: "ขณะเคลื่อนไหว" },
      { v: "unsure2", label: "ไม่แน่ใจ" },
    ],
  },
  {
    key: "feel",
    q: "ลักษณะอาการปวดเป็นอย่างไร?",
    type: "options",
    options: [
      { v: "dull", label: "ปวดตื้อ" },
      { v: "sharp", label: "ปวดแปลบ" },
      { v: "stiff", label: "ตึง" },
      { v: "unsure3", label: "ไม่แน่ใจ" },
    ],
  },
  {
    key: "dailyLife",
    q: "กระทบชีวิตประจำวันหรือออกกำลังกายแค่ไหน?",
    type: "options",
    options: [
      { v: "none", label: "ไม่กระทบ", common: { dailyImpact: 0 } },
      { v: "mild", label: "เล็กน้อย", common: { dailyImpact: 1 } },
      { v: "much", label: "ปานกลาง", common: { dailyImpact: 2 } },
      { v: "severe", label: "มาก", common: { dailyImpact: 3 } },
    ],
  },
  { key: "painLevel", q: "ระดับความปวดตอนนี้ (0-10)", type: "slider", commonKey: "painLevel" },
  {
    key: "afterRest",
    q: "ดีขึ้นหลังพักหรือไม่?",
    type: "options",
    options: [
      { v: "better", label: "ดีขึ้น", common: { restResponse: 0 } },
      { v: "same", label: "เท่าเดิม", common: { restResponse: 1 } },
      { v: "worse", label: "แย่ลง", common: { restResponse: 2 } },
    ],
  },
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
  const [exerciseHelp, setExerciseHelp] = useState<ExerciseHelpKey | null>(null);

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
    const unsureCount = Object.values(answers).filter((v) =>
      String(v).toLowerCase().includes("unsure"),
    ).length;
    nav({ to: "/assess/processing", search: { unsure: unsureCount } });
  };

  const title =
    type === "running" ? "วิ่ง / Cardio" : type === "weights" ? "Weight Training" : "ไม่แน่ใจ";

  return (
    <>
      <AppHeader title={title} back />
      <ProgressSteps step={4} total={5} />
      <div className="flex-1 space-y-4 px-4 pb-6">
        {questions.map((q, i) => (
          <QuestionCard key={q.key} number={i + 1} total={questions.length} question={q.q}>
            {q.type === "yesno" && (
              <>
                <OptionButton selected={answers[q.key] === "no"} onClick={() => setAns(q, "no")}>
                  ไม่ใช่
                </OptionButton>
                <OptionButton selected={answers[q.key] === "yes"} onClick={() => setAns(q, "yes")}>
                  ใช่
                </OptionButton>
              </>
            )}
            {q.type === "options" &&
              q.options?.map((o) => (
                <div
                  key={o.v}
                  className={o.helperKey ? "grid grid-cols-[minmax(0,1fr)_auto] gap-2" : ""}
                >
                  <OptionButton selected={answers[q.key] === o.v} onClick={() => setAns(q, o.v)}>
                    {o.label}
                  </OptionButton>
                  {o.helperKey && (
                    <button
                      type="button"
                      onClick={() => setExerciseHelp(o.helperKey ?? null)}
                      className="flex h-full min-h-14 w-12 items-center justify-center rounded-[22px] border border-primary/20 bg-primary-soft text-primary transition hover:bg-primary-soft/70"
                      aria-label={`ดูคำอธิบาย ${o.label}`}
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            {q.type === "slider" && (
              <div>
                <input
                  type="range"
                  min={0}
                  max={10}
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
        <Button
          full
          size="lg"
          disabled={!allAnswered}
          onClick={onSubmit}
          className={!allAnswered ? "opacity-50" : ""}
        >
          ดูผลการประเมิน
        </Button>
      </div>

      {exerciseHelp && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/35 px-4 pb-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-[28px] bg-white p-5 shadow-card">
            <p className="text-xs font-semibold text-primary">คำอธิบายท่าออกกำลังกาย</p>
            <h2 className="mt-2 text-xl font-bold text-navy">
              {EXERCISE_HELPERS[exerciseHelp].thai}
            </h2>
            <p className="mt-1 text-sm font-semibold text-navy-soft">
              {EXERCISE_HELPERS[exerciseHelp].english}
            </p>
            <p className="mt-3 text-sm leading-6 text-navy-soft">
              {EXERCISE_HELPERS[exerciseHelp].description}
            </p>
            <Button full size="lg" className="mt-5" onClick={() => setExerciseHelp(null)}>
              เข้าใจแล้ว
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
