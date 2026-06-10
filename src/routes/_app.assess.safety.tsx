import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Button } from "@/components/Button";
import { QuestionCard } from "@/components/QuestionCard";
import { OptionButton } from "@/components/OptionButton";
import { useDraft } from "@/lib/assessment/draft";
import { hasRedFlag } from "@/lib/assessment/scoring";
import type { SafetyAnswer, SafetyAnswers } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/safety")({ component: Page });

const QUESTIONS: { key: keyof SafetyAnswers; q: string }[] = [
  { key: "radiating", q: "คุณมีอาการชา อ่อนแรง เสียวซ่าน หรือปวดร้าวลงขาชัดเจนหรือไม่?" },
  { key: "saddle", q: "คุณมีอาการชาบริเวณก้นกบ ขาหนีบ อวัยวะเพศ หรือทวารหนักหรือไม่?" },
  { key: "bladder", q: "คุณมีปัญหาในการควบคุมการขับถ่ายปัสสาวะหรืออุจจาระแบบใหม่หรือไม่?" },
  { key: "trauma", q: "อาการปวดเริ่มหลังเกิดอุบัติเหตุรุนแรง หกล้ม หรือถูกกระแทกอย่างแรงหรือไม่?" },
  { key: "severe", q: "อาการปวดรุนแรงมาก แย่ลงเรื่อย ๆ หรือทำให้เดินลำบากมากหรือไม่?" },
];

const OPTIONS: { v: SafetyAnswer; label: string; tone?: "danger" }[] = [
  { v: "no", label: "ไม่มี" },
  { v: "unsure", label: "ไม่แน่ใจ" },
  { v: "yes", label: "มี", tone: "danger" },
];

function Page() {
  const nav = useNavigate();
  const { safety, setSafety } = useDraft();

  const onNext = () => {
    if (hasRedFlag(safety)) nav({ to: "/assess/red-flag" });
    else nav({ to: "/assess/activity" });
  };

  return (
    <>
      <AppHeader title="ตรวจสัญญาณอันตราย" back />
      <ProgressSteps step={2} total={5} />
      <div className="flex-1 space-y-4 px-4 pb-6">
        {QUESTIONS.map((q, i) => (
          <QuestionCard key={q.key} number={i + 1} total={QUESTIONS.length} question={q.q}>
            {OPTIONS.map((o) => (
              <OptionButton
                key={o.v}
                selected={safety[q.key] === o.v}
                onClick={() => setSafety({ [q.key]: o.v })}
                tone={o.tone}
              >
                {o.label}
              </OptionButton>
            ))}
          </QuestionCard>
        ))}
        <Button full size="lg" onClick={onNext}>
          ถัดไป
        </Button>
      </div>
    </>
  );
}
