import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { RiskGauge } from "@/components/RiskGauge";
import { RISK_META } from "@/content/carePlans";
import { DISCLAIMER } from "@/content/disclaimer";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/result/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/assess/result/$id" });
  const [a, setA] = useState<AssessmentRecord | undefined>();
  useEffect(() => setA(store.getAssessment(id)), [id]);
  if (!a) return null;

  const meta = RISK_META[a.risk];
  const tone = a.risk === "green" ? "success" : a.risk === "yellow" ? "warning" : "danger";

  return (
    <>
      <AppHeader title="ผลการประเมิน" />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="text-center">
          <RiskGauge level={a.risk} score={a.score} />
          <h2 className={`mt-3 text-xl font-bold ${
            a.risk === "green" ? "text-risk-green" : a.risk === "yellow" ? "text-risk-yellow" : "text-risk-red"
          }`}>{meta.title}</h2>
          <p className="mt-1 text-sm text-navy-soft">{meta.tone}</p>
        </Card>

        <AlertBox tone={tone}>{meta.description}</AlertBox>

        <Card>
          <h3 className="text-sm font-semibold text-navy">ข้อมูลการประเมิน</h3>
          <ul className="mt-2 space-y-1 text-sm text-navy-soft">
            <li>ตำแหน่ง: หลังล่าง</li>
            <li>กิจกรรม: {a.activity === "running" ? "วิ่ง" : a.activity === "weights" ? "เวทเทรนนิ่ง" : "ไม่แน่ใจ"}</li>
            <li>ระดับปวด: {a.common.painLevel}/10</li>
            <li>คะแนนรวม: {a.score}</li>
          </ul>
        </Card>

        <Link to="/assess/care-plan/$id" params={{ id: a.id }}>
          <Button full size="lg">ดูแผนดูแลตัวเอง</Button>
        </Link>
        <Link to="/assess/followup/$id" params={{ id: a.id }}>
          <Button full variant="outline">บันทึกการติดตามอาการ</Button>
        </Link>
        <Link to="/home">
          <Button full variant="ghost">กลับหน้าหลัก</Button>
        </Link>

        <p className="text-xs text-navy-soft">{DISCLAIMER}</p>
      </div>
    </>
  );
}
