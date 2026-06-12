import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ProgressSteps } from "@/components/ProgressSteps";
import { useDraft } from "@/lib/assessment/draft";

export const Route = createFileRoute("/_app/assess/radiation")({
  component: Page,
});

type RadiationAnswer = "none" | "buttock" | "thigh" | "below_knee" | "numbness_weakness" | "unknown";

const OPTIONS: {
  value: RadiationAnswer;
  label: string;
  detail: string;
  tone?: "caution";
}[] = [
  {
    value: "none",
    label: "ไม่ร้าว",
    detail: "อาการอยู่บริเวณหลังเป็นหลัก ไม่รู้สึกต่อเนื่องไปบริเวณอื่น",
  },
  {
    value: "buttock",
    label: "ร้าวลงก้น",
    detail: "รู้สึกปวดหรือเสียวต่อเนื่องจากหลังไปบริเวณก้น",
  },
  {
    value: "thigh",
    label: "ร้าวลงต้นขา",
    detail: "รู้สึกปวดหรือเสียวต่อเนื่องจากหลังไปบริเวณต้นขา",
  },
  {
    value: "below_knee",
    label: "ร้าวลงต่ำกว่าเข่า",
    detail: "รู้สึกปวดหรือเสียวต่อเนื่องจากหลังลงไปต่ำกว่าเข่า",
  },
  {
    value: "numbness_weakness",
    label: "มีชา/อ่อนแรง",
    detail: "มีอาการชาผิดปกติ ขาอ่อนแรง หรือความรู้สึกลดลงผิดปกติ",
    tone: "caution",
  },
  {
    value: "unknown",
    label: "ไม่แน่ใจ",
    detail: "ยังแยกอาการไม่ชัด หรือไม่แน่ใจว่าอาการร้าวหรือไม่",
    tone: "caution",
  },
];

function readSavedRadiation(value: string | number | boolean | undefined): RadiationAnswer | null {
  return OPTIONS.some((option) => option.value === value) ? (value as RadiationAnswer) : null;
}

function Page() {
  const nav = useNavigate();
  const draft = useDraft();
  const [selected, setSelected] = useState<RadiationAnswer | null>(
    readSavedRadiation(draft.details.radiation),
  );
  const selectedOption = OPTIONS.find((option) => option.value === selected);
  const shouldShowCaution = selected === "numbness_weakness" || selected === "unknown";

  const selectAnswer = (value: RadiationAnswer) => {
    setSelected(value);
    draft.setDetail("radiation", value);
  };

  const continueToSafety = () => {
    if (!selected) return;
    draft.setDetail("radiation", selected);
    nav({ to: "/assess/safety" });
  };

  return (
    <>
      <AppHeader title="อาการร้าว" subtitle="ดูอาการร้าว ชา หรืออ่อนแรง" back />
      <ProgressSteps step={3} total={6} label="อาการร้าว" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <section>
          <h2 className="text-xl font-bold text-navy">อาการร้าวไปที่อื่นไหม?</h2>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            เลือกคำตอบที่ใกล้เคียงกับอาการของคุณมากที่สุด หากไม่แน่ใจให้เลือก ‘ไม่แน่ใจ’
          </p>
        </section>

        <Card className="rounded-[28px] border-primary/15 bg-card p-4">
          <div className="space-y-2.5">
            {OPTIONS.map((option) => {
              const active = selected === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectAnswer(option.value)}
                  className={`w-full rounded-[24px] border px-4 py-4 text-left transition active:scale-[0.99] ${
                    active
                      ? option.tone === "caution"
                        ? "border-risk-yellow bg-risk-yellow-soft text-navy ring-4 ring-risk-yellow/15"
                        : "border-primary bg-primary text-white shadow-soft"
                      : "border-border bg-card text-navy shadow-soft"
                  }`}
                >
                  <span className="block text-base font-bold">{option.label}</span>
                  <span
                    className={`mt-1 block text-sm leading-6 ${
                      active && option.tone !== "caution" ? "text-white/85" : "text-navy-soft"
                    }`}
                  >
                    {option.detail}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <div className="mt-4 rounded-[22px] border border-primary/20 bg-primary-soft px-4 py-3 text-sm font-semibold leading-6 text-navy">
              คำตอบที่เลือก: {selectedOption.label}
            </div>
          )}
        </Card>

        {shouldShowCaution && (
          <div className="rounded-[22px] border border-risk-yellow/35 bg-risk-yellow-soft px-4 py-3 text-sm leading-6 text-navy">
            คำตอบนี้อาจต้องตรวจต่อในขั้นตอนถัดไป กรุณาตอบคำถามด้านความปลอดภัยตามจริง
          </div>
        )}

        <Card className="rounded-[26px] border-primary/15 bg-card">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Info className="h-4 w-4" />
            </span>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-navy">“ร้าว” หมายถึงอะไร?</h3>
                <p className="mt-1 text-sm leading-6 text-navy-soft">
                  หมายถึงอาการปวดหรือเสียวที่รู้สึกต่อเนื่องจากหลังไปยังบริเวณอื่น เช่น ก้นหรือต้นขา
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy">“ชา/อ่อนแรง” หมายถึงอะไร?</h3>
                <p className="mt-1 text-sm leading-6 text-navy-soft">
                  หมายถึงรู้สึกชาผิดปกติ ขาไม่มีแรง เดินแล้วขาอ่อน ยกปลายเท้าลำบาก
                  หรือความรู้สึกลดลงผิดปกติ
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          <Button
            full
            size="lg"
            disabled={selected === null}
            onClick={continueToSafety}
            className={selected === null ? "opacity-50" : ""}
          >
            ถัดไป: ตรวจอาการสำคัญ <ChevronRight className="h-4 w-4" />
          </Button>
          <Button full variant="ghost" onClick={() => nav({ to: "/assess/pain-scale" })}>
            กลับไปให้คะแนนความปวด
          </Button>
        </div>
      </div>
    </>
  );
}
