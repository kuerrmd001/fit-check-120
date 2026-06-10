import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/progress")({ component: Page });

function Page() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  useEffect(() => setList(store.getAssessments().slice().reverse()), []);

  const W = 320, H = 140, P = 24;
  const max = 10;
  const pts = list.map((a, i) => {
    const x = list.length === 1 ? W / 2 : P + (i * (W - 2 * P)) / (list.length - 1);
    const y = H - P - (a.common.painLevel / max) * (H - 2 * P);
    return { x, y, a };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const avg = list.length ? (list.reduce((s, a) => s + a.common.painLevel, 0) / list.length).toFixed(1) : "-";

  return (
    <>
      <AppHeader title="พัฒนาการ" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <h3 className="text-sm font-semibold text-navy">แนวโน้มระดับความปวด</h3>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full">
            <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="var(--border)" />
            <line x1={P} y1={P} x2={P} y2={H-P} stroke="var(--border)" />
            {path && <path d={path} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--primary)" />
            ))}
          </svg>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Card><p className="text-xs text-navy-soft">การประเมินทั้งหมด</p><p className="mt-1 text-2xl font-bold text-navy">{list.length}</p></Card>
          <Card><p className="text-xs text-navy-soft">เฉลี่ยระดับปวด</p><p className="mt-1 text-2xl font-bold text-navy">{avg}</p></Card>
        </div>
      </div>
    </>
  );
}
