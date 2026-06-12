import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, ChevronLeft, HeartPulse } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { AlertBox } from "@/components/AlertBox";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  getActivityLabel,
  getPainScore,
  getPrimaryTriggerLabel,
  getRiskColorLabel,
} from "@/lib/assessment/historySummary";
import { store } from "@/lib/assessment/storage";
import type {
  AssessmentRecord,
  DailyFunctionTrend,
  FollowupTrend,
  ReturnedToExercise,
  SymptomTrend,
} from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/followup/$id")({ component: Page });

const symptomOptions: {
  value: SymptomTrend;
  label: string;
  hint: string;
  tone?: "default" | "warning";
}[] = [
  { value: "better", label: "ดีขึ้น", hint: "อาการลดลงหรือขยับตัวได้สบายขึ้น" },
  { value: "same", label: "เท่าเดิม", hint: "อาการใกล้เคียงกับครั้งก่อน" },
  {
    value: "slightly_worse",
    label: "แย่ลงเล็กน้อย",
    hint: "ปวดเพิ่มขึ้นเล็กน้อย",
    tone: "warning",
  },
  {
    value: "much_worse",
    label: "แย่ลงมาก",
    hint: "ปวดมากขึ้นชัดเจนหรือรบกวนกิจกรรมมากขึ้น",
    tone: "warning",
  },
];

const returnedOptions: {
  value: ReturnedToExercise;
  label: string;
  hint: string;
  tone?: "default" | "warning";
}[] = [
  { value: "no", label: "ยัง", hint: "ยังไม่ได้กลับไปออกกำลังกาย" },
  { value: "light", label: "กลับไปแบบเบา ๆ", hint: "ลดความหนักหรือระยะเวลา" },
  { value: "same_as_before", label: "กลับไปเท่าเดิม", hint: "ทำใกล้เคียงก่อนมีอาการ" },
  {
    value: "pain_returned",
    label: "กลับไปแล้วปวดซ้ำ",
    hint: "อาการกลับมาชัดหลังทำกิจกรรม",
    tone: "warning",
  },
];

const dailyOptions: {
  value: DailyFunctionTrend;
  label: string;
  hint: string;
  tone?: "default" | "warning";
}[] = [
  { value: "improved", label: "ลดลง", hint: "รบกวนชีวิตประจำวันน้อยลง" },
  { value: "same", label: "เท่าเดิม", hint: "ยังรบกวนใกล้เคียงเดิม" },
  { value: "worse", label: "แย่ลง", hint: "รบกวนมากขึ้นหรือทำกิจวัตรยากขึ้น", tone: "warning" },
];

function ChoiceButton({
  selected,
  onClick,
  label,
  hint,
  tone = "default",
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint: string;
  tone?: "default" | "warning";
}) {
  const active =
    tone === "warning"
      ? "border-risk-yellow/60 bg-risk-yellow-soft text-navy"
      : "border-primary/70 bg-primary-soft text-navy";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-[24px] border px-4 py-4 text-left text-sm font-semibold transition active:scale-[0.99] ${
        selected
          ? active
          : "border-border/80 bg-card text-navy hover:border-primary/40 hover:bg-primary-soft/30"
      }`}
    >
      <span className="min-w-0">
        <span className="block leading-snug">{label}</span>
        <span className="mt-1 block text-xs font-normal leading-relaxed text-navy-soft">
          {hint}
        </span>
      </span>
      {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />}
    </button>
  );
}

function ScaleGrid({
  value,
  onChange,
  label,
}: {
  value: number | undefined;
  onChange: (value: number) => void;
  label: (value: number) => string;
}) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {Array.from({ length: 11 }, (_, score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          aria-pressed={value === score}
          className={`min-h-[64px] rounded-[22px] border px-2 py-3 text-center transition active:scale-[0.99] ${
            value === score
              ? "border-primary/70 bg-primary text-primary-foreground shadow-soft"
              : "border-border bg-card text-navy hover:border-primary/40 hover:bg-primary-soft/30"
          }`}
        >
          <span className="block text-lg font-bold">{score}</span>
          <span className="mt-1 block text-[10px] font-semibold leading-tight">{label(score)}</span>
        </button>
      ))}
    </div>
  );
}

function QuestionShell({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <Card className="space-y-4 rounded-[28px] border-border/70 bg-card p-5 shadow-[0_18px_40px_-30px_oklch(0.4_0.06_210)]">
      <div>
        <div className="inline-flex rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
          ข้อ {number} / 5
        </div>
        <h2 className="mt-3 text-[17px] font-semibold leading-snug text-navy">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-navy-soft">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}

function scoreLabel(score: number) {
  if (score === 0) return "ไม่ปวด";
  if (score <= 2) return "น้อย";
  if (score <= 4) return "รำคาญ";
  if (score <= 6) return "ชัดเจน";
  if (score <= 8) return "มาก";
  return "มากที่สุด";
}

function confidenceLabel(score: number) {
  if (score <= 2) return "ไม่มั่นใจ";
  if (score <= 4) return "น้อย";
  if (score <= 6) return "ปานกลาง";
  if (score <= 8) return "ค่อนข้างมั่นใจ";
  return "มั่นใจมาก";
}

function toLegacyTrend(symptomTrend: SymptomTrend): FollowupTrend {
  if (symptomTrend === "better") return "better";
  if (symptomTrend === "same") return "same";
  return "worse";
}

function getPainChange(current: number, previous: number) {
  if (current < previous) return "down" as const;
  if (current > previous) return "up" as const;
  return "same" as const;
}

function getFollowupCopy(symptomTrend?: SymptomTrend, returnedToExercise?: ReturnedToExercise) {
  if (symptomTrend === "much_worse" || returnedToExercise === "pain_returned") {
    return "อาการแย่ลงจากครั้งก่อน ควรหยุดกิจกรรมที่กระตุ้นอาการ และพบผู้เชี่ยวชาญหากอาการรุนแรงขึ้น มีอาการร้าว ชา อ่อนแรง หรือไม่แน่ใจ";
  }
  if (symptomTrend === "slightly_worse") {
    return "อาการแย่ลงเล็กน้อย ควรลดหรือหยุดกิจกรรมที่กระตุ้นอาการชั่วคราว และประเมินซ้ำ หากอาการยังแย่ลงควรพบผู้เชี่ยวชาญ";
  }
  if (symptomTrend === "same") {
    return "อาการยังใกล้เคียงเดิม ควรพักหรือปรับกิจกรรมต่อ และติดตามอาการอีกครั้ง หากไม่ดีขึ้นหรือรบกวนชีวิตประจำวัน ควรพบผู้เชี่ยวชาญ";
  }
  return "อาการมีแนวโน้มดีขึ้น สามารถค่อย ๆ เพิ่มกิจกรรมอย่างระมัดระวังได้ โดยหลีกเลี่ยงการเพิ่มความหนักเร็วเกินไป";
}

function Page() {
  const { id } = useParams({ from: "/_app/assess/followup/$id" });
  const nav = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentRecord | undefined>();
  const [step, setStep] = useState(0);
  const [painScore, setPainScore] = useState<number | undefined>();
  const [symptomTrend, setSymptomTrend] = useState<SymptomTrend | undefined>();
  const [returnedToExercise, setReturnedToExercise] = useState<ReturnedToExercise | undefined>();
  const [dailyFunctionTrend, setDailyFunctionTrend] = useState<DailyFunctionTrend | undefined>();
  const [confidenceScore, setConfidenceScore] = useState<number | undefined>();

  useEffect(() => setAssessment(store.getAssessment(id)), [id]);

  if (!assessment) {
    return (
      <>
        <AppHeader title="ติดตามอาการ" back />
        <div className="flex-1 px-4 pb-6">
          <Card className="rounded-[28px] border-border/70 bg-card p-5 text-sm leading-relaxed text-navy-soft shadow-soft">
            ไม่พบข้อมูลการประเมินเดิม กรุณากลับไปที่ประวัติแล้วเลือกผลประเมินที่ต้องการติดตาม
          </Card>
        </div>
      </>
    );
  }

  const previousPainScore = getPainScore(assessment);
  const canContinue =
    (step === 0 && painScore !== undefined) ||
    (step === 1 && symptomTrend !== undefined) ||
    (step === 2 && returnedToExercise !== undefined) ||
    (step === 3 && dailyFunctionTrend !== undefined) ||
    (step === 4 && confidenceScore !== undefined);
  const progressPercent = `${((step + 1) / 5) * 100}%`;
  const shouldShowCaution =
    symptomTrend === "much_worse" ||
    returnedToExercise === "pain_returned" ||
    dailyFunctionTrend === "worse";

  const submit = () => {
    if (
      painScore === undefined ||
      symptomTrend === undefined ||
      returnedToExercise === undefined ||
      dailyFunctionTrend === undefined ||
      confidenceScore === undefined
    ) {
      return;
    }

    const completedAt = new Date().toISOString();
    store.addFollowup(id, {
      id: crypto.randomUUID(),
      createdAt: completedAt,
      trend: toLegacyTrend(symptomTrend),
      painChange: getPainChange(painScore, previousPainScore),
      dailyOk: dailyFunctionTrend !== "worse",
      followedPlan: returnedToExercise !== "pain_returned",
      newSymptoms: symptomTrend === "much_worse" || returnedToExercise === "pain_returned",
      followUpCompleted: true,
      followUpPainScore: painScore,
      symptomTrend,
      returnedToExercise,
      dailyFunctionTrend,
      confidenceScore,
      followUpCompletedAt: completedAt,
    });
    nav({ to: "/history/$id", params: { id }, replace: true });
  };

  const goNext = () => {
    if (!canContinue) return;
    if (step < 4) {
      setStep((value) => value + 1);
      return;
    }
    submit();
  };

  const goBack = () => {
    if (step > 0) {
      setStep((value) => value - 1);
      return;
    }
    nav({ to: "/assess/result/$id", params: { id } });
  };

  return (
    <>
      <AppHeader title="ติดตามอาการ" back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[20px] bg-card/85 text-primary">
            <CalendarClock className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold leading-tight text-navy">
            ติดตามอาการอีกครั้งใน 24–48 ชั่วโมง
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            การติดตามอาการช่วยดูว่าอาการดีขึ้น เท่าเดิม หรือแย่ลงหลังพักหรือปรับกิจกรรม
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-[18px] bg-card/85 p-3">
              <p className="text-navy-soft">ครั้งก่อน</p>
              <p className="mt-1 font-bold text-navy">Pain {previousPainScore}/10</p>
            </div>
            <div className="rounded-[18px] bg-card/85 p-3">
              <p className="text-navy-soft">ผลเดิม</p>
              <p className="mt-1 font-bold text-navy">{getRiskColorLabel(assessment.risk)}</p>
            </div>
            <div className="rounded-[18px] bg-card/85 p-3">
              <p className="text-navy-soft">กิจกรรม</p>
              <p className="mt-1 font-bold text-navy">{getActivityLabel(assessment.activity)}</p>
            </div>
            <div className="rounded-[18px] bg-card/85 p-3">
              <p className="text-navy-soft">Trigger หลัก</p>
              <p className="mt-1 font-bold text-navy">{getPrimaryTriggerLabel(assessment)}</p>
            </div>
          </div>
        </Card>

        <div className="rounded-full bg-muted p-1">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: progressPercent }}
          />
        </div>

        {step === 0 && (
          <QuestionShell
            number={1}
            title="ตอนนี้ปวดประมาณเท่าไหร่?"
            subtitle="เลือกคะแนนจาก 0–10 ตามความรู้สึกตอนนี้"
          >
            <ScaleGrid value={painScore} onChange={setPainScore} label={scoreLabel} />
          </QuestionShell>
        )}

        {step === 1 && (
          <QuestionShell
            number={2}
            title="เมื่อเทียบกับครั้งก่อน อาการเป็นอย่างไร?"
            subtitle="เลือกคำตอบที่ใกล้เคียงที่สุด"
          >
            <div className="space-y-3">
              {symptomOptions.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={symptomTrend === option.value}
                  onClick={() => setSymptomTrend(option.value)}
                  label={option.label}
                  hint={option.hint}
                  tone={option.tone}
                />
              ))}
            </div>
          </QuestionShell>
        )}

        {step === 2 && (
          <QuestionShell number={3} title="กลับไปออกกำลังกายแล้วหรือยัง?">
            <div className="space-y-3">
              {returnedOptions.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={returnedToExercise === option.value}
                  onClick={() => setReturnedToExercise(option.value)}
                  label={option.label}
                  hint={option.hint}
                  tone={option.tone}
                />
              ))}
            </div>
          </QuestionShell>
        )}

        {step === 3 && (
          <QuestionShell
            number={4}
            title="ตอนนี้อาการกระทบชีวิตประจำวันลดลงไหม?"
            subtitle="ดูจากการเดิน นั่ง ทำงาน หรือทำกิจวัตรทั่วไป"
          >
            <div className="space-y-3">
              {dailyOptions.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={dailyFunctionTrend === option.value}
                  onClick={() => setDailyFunctionTrend(option.value)}
                  label={option.label}
                  hint={option.hint}
                  tone={option.tone}
                />
              ))}
            </div>
          </QuestionShell>
        )}

        {step === 4 && (
          <QuestionShell
            number={5}
            title="มั่นใจแค่ไหนว่าจะกลับไปออกกำลังกายแบบไม่ฝืน?"
            subtitle="คะแนนนี้ช่วยเตือนให้ค่อย ๆ เพิ่มกิจกรรมอย่างระมัดระวัง"
          >
            <ScaleGrid
              value={confidenceScore}
              onChange={setConfidenceScore}
              label={confidenceLabel}
            />
          </QuestionShell>
        )}

        {step === 4 && confidenceScore !== undefined && symptomTrend && (
          <AlertBox tone={shouldShowCaution ? "warning" : "success"} title="สรุปการติดตาม">
            {getFollowupCopy(symptomTrend, returnedToExercise)}
          </AlertBox>
        )}

        <Card className="rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
          <div className="flex items-start gap-3">
            <HeartPulse className="mt-0.5 h-5 w-5 text-primary" />
            <p className="text-sm leading-relaxed text-navy-soft">
              หากมีอาการรุนแรงขึ้น มีอาการร้าว ชา อ่อนแรง หรือไม่แน่ใจ
              ควรหยุดออกกำลังกายและพบผู้เชี่ยวชาญ
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button full variant="outline" onClick={goBack}>
            <ChevronLeft className="h-4 w-4" />
            ย้อนกลับ
          </Button>
          <Button
            full
            size="lg"
            onClick={goNext}
            disabled={!canContinue}
            className={!canContinue ? "opacity-50" : ""}
          >
            {step === 4 ? "บันทึกการติดตาม" : "ถัดไป"}
          </Button>
        </div>
      </div>
    </>
  );
}
