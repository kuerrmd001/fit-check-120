import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useDraft } from "@/lib/assessment/draft";
import { computeRisk, newAssessment } from "@/lib/assessment/scoring";
import { store } from "@/lib/assessment/storage";
import { Activity } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/_app/assess/processing")({
  validateSearch: (s) => z.object({ unsure: z.number().default(0) }).parse(s),
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
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-6 text-center">
        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-primary-soft text-primary">
          <Activity className="h-8 w-8" />
        </div>
        <h2 className="text-base font-semibold text-navy">กำลังวิเคราะห์คำตอบของคุณ...</h2>
        <p className="text-sm text-navy-soft">โปรดรอสักครู่</p>
      </div>
    </>
  );
}
