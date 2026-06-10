import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { CARE_PLANS } from "@/content/carePlans";
import { DISCLAIMER } from "@/content/disclaimer";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/assess/care-plan/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/assess/care-plan/$id" });
  const [a, setA] = useState<AssessmentRecord | undefined>();
  useEffect(() => setA(store.getAssessment(id)), [id]);
  if (!a) return null;
  const plan = CARE_PLANS[a.risk];

  return (
    <>
      <AppHeader title="แผนดูแลตัวเอง" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card>
          <h2 className="text-base font-bold text-navy">{plan.title}</h2>
          <p className="mt-1 text-sm text-navy-soft">{plan.intro}</p>
        </Card>

        <div className="space-y-2">
          {plan.items.map((item, i) => (
            <Card key={i} className="flex items-start gap-3 py-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-navy">{item.title}</p>
                <p className="text-xs text-navy-soft">{item.detail}</p>
              </div>
            </Card>
          ))}
        </div>

        <AlertBox tone="warning" title="สัญญาณที่ควรระวัง">
          <ul className="list-disc pl-4">
            {plan.warnings.map((w, i) => (<li key={i}>{w}</li>))}
          </ul>
        </AlertBox>

        <Link to="/assess/followup/$id" params={{ id: a.id }}>
          <Button full size="lg">ตั้งการติดตามอาการ 24-48 ชม.</Button>
        </Link>

        <p className="text-xs text-navy-soft">{DISCLAIMER}</p>
      </div>
    </>
  );
}
