import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Card } from "@/components/Card";
import { useDraft } from "@/lib/assessment/draft";
import { computeRisk, newAssessment } from "@/lib/assessment/scoring";
import { store } from "@/lib/assessment/storage";
import { Activity } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/_app/assess/processing")({
  validateSearch: (s) => z.object({ unsure: z.coerce.number().default(0) }).parse(s),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const draft = useDraft();
  const { unsure } = Route.useSearch();

  useEffect(() => {
    const t = setTimeout(() => {
      const { risk, score } = computeRisk(draft.safety, draft.common, unsure);
      const record = newAssessment({
        painLocation: "lower-back",
        activity: draft.activity ?? "unsure",
        safety: draft.safety,
        details: draft.details,
        common: draft.common,
        risk,
        score,
      });
      store.saveAssessment(record);
      nav({ to: "/assess/result/$id", params: { id: record.id }, replace: true });
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader title="กำลังประมวลผล" />
      <ProgressSteps step={5} total={5} label="กำลังสรุปผล" />
      <div className="flex flex-1 items-center px-4 pb-6">
        <Card className="w-full rounded-[30px] border-primary/15 bg-white p-8 text-center shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-primary-soft text-primary">
            <Activity className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-navy">กำลังวิเคราะห์คำตอบของคุณ...</h2>
          <p className="mt-1 text-sm text-navy-soft">โปรดรอสักครู่</p>
        </Card>
      </div>
    </>
  );
}
