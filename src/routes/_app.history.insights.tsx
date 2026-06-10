import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { AlertBox } from "@/components/AlertBox";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/insights")({ component: Page });

function Page() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  useEffect(() => setList(store.getAssessments()), []);

  const loadHits = list.filter((a) => a.common.loadIncrease).length;
  const triggers = list.reduce<Record<string, number>>((acc, a) => {
    acc[a.activity] = (acc[a.activity] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <AppHeader title="ข้อมูลเชิงลึก" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <h3 className="text-sm font-semibold text-navy">รูปแบบที่พบบ่อย</h3>
          <p className="mt-1 text-sm text-navy-soft">
            {loadHits >= 2 ? "การเพิ่มภาระเร็วเกินไปอาจเป็นปัจจัยร่วม" : "ยังไม่พบรูปแบบชัดเจน"}
          </p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-navy">กิจกรรมที่เกี่ยวข้อง</h3>
          <ul className="mt-2 space-y-1 text-sm text-navy-soft">
            <li>วิ่ง: {triggers.running ?? 0} ครั้ง</li>
            <li>เวทเทรนนิ่ง: {triggers.weights ?? 0} ครั้ง</li>
            <li>ไม่แน่ใจ: {triggers.unsure ?? 0} ครั้ง</li>
          </ul>
        </Card>
        <AlertBox tone="info">
          ข้อมูลเชิงลึกนี้เป็นเพียงการสรุปจากบันทึก ไม่ใช่การวินิจฉัยทางการแพทย์
        </AlertBox>
      </div>
    </>
  );
}
