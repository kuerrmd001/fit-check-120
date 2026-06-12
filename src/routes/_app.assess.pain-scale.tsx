import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ProgressSteps } from "@/components/ProgressSteps";
import { useDraft } from "@/lib/assessment/draft";

export const Route = createFileRoute("/_app/assess/pain-scale")({
  component: Page,
});

type PainSeverityLabel =
  | "none"
  | "mild"
  | "moderate_low"
  | "moderate_high"
  | "severe"
  | "very_severe";

const SCORES = Array.from({ length: 11 }, (_, score) => score);

function getPainMeta(score: number): {
  face: string;
  label: string;
  severity: PainSeverityLabel;
  selectedClass: string;
  softClass: string;
} {
  if (score === 0) {
    return {
      face: "😀",
      label: "ไม่ปวด",
      severity: "none",
      selectedClass: "border-primary bg-primary text-white shadow-soft",
      softClass: "border-primary/20 bg-primary-soft text-primary",
    };
  }
  if (score <= 2) {
    return {
      face: "🙂",
      label: "ปวดน้อย",
      severity: "mild",
      selectedClass: "border-primary bg-primary text-white shadow-soft",
      softClass: "border-primary/20 bg-primary-soft text-primary",
    };
  }
  if (score <= 4) {
    return {
      face: "😐",
      label: "ปวดพอรำคาญ",
      severity: "moderate_low",
      selectedClass: "border-risk-yellow bg-risk-yellow text-navy shadow-soft",
      softClass: "border-risk-yellow/30 bg-risk-yellow-soft text-navy",
    };
  }
  if (score <= 6) {
    return {
      face: "☹️",
      label: "ปวดชัดเจน",
      severity: "moderate_high",
      selectedClass: "border-risk-yellow bg-risk-yellow text-navy shadow-soft",
      softClass: "border-risk-yellow/30 bg-risk-yellow-soft text-navy",
    };
  }
  if (score <= 8) {
    return {
      face: "😣",
      label: "ปวดมาก / ต้องลดกิจกรรม",
      severity: "severe",
      selectedClass: "border-risk-red bg-risk-red text-white shadow-soft",
      softClass: "border-risk-red/25 bg-risk-red-soft text-risk-red",
    };
  }
  return {
    face: "😭",
    label: "ปวดมากที่สุด / ใช้ชีวิตลำบาก",
    severity: "very_severe",
    selectedClass: "border-risk-red bg-risk-red text-white shadow-soft",
    softClass: "border-risk-red/25 bg-risk-red-soft text-risk-red",
  };
}

function Page() {
  const nav = useNavigate();
  const draft = useDraft();
  const savedScore =
    typeof draft.details.currentPainScore === "number" ? draft.details.currentPainScore : null;
  const [selectedScore, setSelectedScore] = useState<number | null>(savedScore);
  const selectedMeta = selectedScore === null ? null : getPainMeta(selectedScore);

  const selectScore = (score: number) => {
    const meta = getPainMeta(score);
    setSelectedScore(score);
    draft.setCommon({ painLevel: score });
    draft.setDetail("currentPainScore", score);
    draft.setDetail("painSeverityLabel", meta.severity);
  };

  const continueToSafety = () => {
    if (selectedScore === null) return;
    const meta = getPainMeta(selectedScore);
    draft.setCommon({ painLevel: selectedScore });
    draft.setDetail("currentPainScore", selectedScore);
    draft.setDetail("painSeverityLabel", meta.severity);
    nav({ to: "/assess/safety" });
  };

  return (
    <>
      <AppHeader title="ระดับความปวด" subtitle="คะแนนความปวด 0-10" back />
      <ProgressSteps step={2} total={6} label="ให้คะแนนความปวด" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <section>
          <h2 className="text-xl font-bold text-navy">ตอนนี้ปวดมากแค่ไหน?</h2>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            ให้คะแนนจากความรู้สึกตอนนี้ ไม่ต้องเทียบกับคนอื่น
          </p>
        </section>

        <Card className="rounded-[28px] border-primary/15 bg-card p-4">
          <div className="rounded-[24px] bg-muted/50 px-4 py-5 text-center">
            <div className="text-5xl leading-none">{selectedMeta?.face ?? "🙂"}</div>
            <p className="mt-3 text-sm font-semibold text-navy-soft">
              {selectedScore === null ? "เลือกคะแนน 0-10" : "คะแนนที่เลือก"}
            </p>
            <div className="mt-1 text-5xl font-bold text-navy">
              {selectedScore === null ? "-" : selectedScore}
            </div>
            <p className="mt-2 text-sm font-bold text-primary">
              {selectedMeta?.label ?? "แตะคะแนนด้านล่าง"}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {SCORES.map((score) => {
              const meta = getPainMeta(score);
              const selected = selectedScore === score;
              return (
                <button
                  key={score}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectScore(score)}
                  className={`min-h-20 rounded-[22px] border px-2 py-3 text-center transition active:scale-[0.98] ${
                    selected ? meta.selectedClass : "border-border bg-card text-navy shadow-soft"
                  }`}
                >
                  <span className="block text-2xl leading-none">{meta.face}</span>
                  <span className="mt-2 block text-xl font-bold">{score}</span>
                  <span
                    className={`mt-1 block text-[0.65rem] font-semibold leading-4 ${
                      selected ? "text-current" : "text-navy-soft"
                    }`}
                  >
                    {score === 0 || score === 2 || score === 4 || score === 6 || score === 8
                      ? meta.label
                      : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedMeta && (
            <div
              className={`mt-4 rounded-[22px] border px-4 py-3 text-sm font-semibold leading-6 ${selectedMeta.softClass}`}
            >
              {selectedScore} = {selectedMeta.face} {selectedMeta.label}
            </div>
          )}
        </Card>

        <div className="rounded-[22px] border border-primary/20 bg-primary-soft px-4 py-3 text-sm leading-6 text-navy">
          คะแนนนี้ช่วยให้ Fit Check เข้าใจความรุนแรงของอาการ แต่จะไม่ใช้คะแนนปวดเพียงอย่างเดียวในการประเมินผล
        </div>

        <Card className="rounded-[26px] border-primary/15 bg-card">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Info className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-navy">ควรเลือกคะแนนอย่างไร?</h3>
              <p className="mt-2 text-sm leading-6 text-navy-soft">
                เลือกคะแนนจากอาการตอนนี้ หากอาการขึ้น ๆ ลง ๆ ให้เลือกคะแนนที่ใกล้เคียงกับความรู้สึกปัจจุบันที่สุด ถ้าอาการปวดมากจนเดินลำบากมาก หรือแย่ลงเรื่อย ๆ ให้ตอบตามจริงในขั้นตอนถัดไป
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          <Button
            full
            size="lg"
            disabled={selectedScore === null}
            onClick={continueToSafety}
            className={selectedScore === null ? "opacity-50" : ""}
          >
            ถัดไป: ตรวจอาการสำคัญ <ChevronRight className="h-4 w-4" />
          </Button>
          <Button full variant="ghost" onClick={() => nav({ to: "/assess/location" })}>
            กลับไปเลือกตำแหน่ง
          </Button>
        </div>
      </div>
    </>
  );
}
