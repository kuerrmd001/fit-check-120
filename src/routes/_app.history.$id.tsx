import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { RiskBadge } from "@/components/RiskBadge";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/history/$id" });
  const [a, setA] = useState<AssessmentRecord | undefined>();
  useEffect(() => setA(store.getAssessment(id)), [id]);
  if (!a) return null;

  return (
    <>
      <AppHeader title="รายละเอียดการประเมิน" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <RiskBadge level={a.risk} />
          <p className="mt-2 text-sm text-navy-soft">
            {new Date(a.createdAt).toLocaleString("th-TH", { dateStyle: "long", timeStyle: "short" })}
          </p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-navy">ข้อมูลการประเมิน</h3>
          <ul className="mt-2 space-y-1 text-sm text-navy-soft">
            <li>ตำแหน่ง: หลังล่าง</li>
            <li>กิจกรรม: {a.activity === "running" ? "วิ่ง" : a.activity === "weights" ? "เวทเทรนนิ่ง" : "ไม่แน่ใจ"}</li>
            <li>ระดับปวด: {a.common.painLevel}/10</li>
            <li>กระทบกิจกรรม: {a.common.activityImpact}</li>
            <li>กระทบชีวิตประจำวัน: {a.common.dailyImpact}</li>
            <li>คะแนนรวม: {a.score}</li>
          </ul>
        </Card>
        {a.followups.length > 0 && (
          <Card>
            <h3 className="text-sm font-semibold text-navy">การติดตามอาการ</h3>
            <div className="mt-2 space-y-2">
              {a.followups.map((f) => (
                <div key={f.id} className="rounded-xl bg-muted p-2.5 text-xs text-navy">
                  <p className="font-semibold">{f.trend === "better" ? "ดีขึ้น" : f.trend === "same" ? "เท่าเดิม" : "แย่ลง"}</p>
                  <p className="text-navy-soft">{new Date(f.createdAt).toLocaleString("th-TH")}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
        <Link to="/assess/care-plan/$id" params={{ id: a.id }}>
          <Button full>ดูแผนดูแลตัวเอง</Button>
        </Link>
        <Link to="/assess/followup/$id" params={{ id: a.id }}>
          <Button full variant="outline">บันทึกติดตามอาการ</Button>
        </Link>
      </div>
    </>
  );
}
