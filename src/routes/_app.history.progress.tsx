import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ClipboardList,
  ShieldAlert,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import {
  getMostCommonPrimaryTrigger,
  getPainScore,
  getRiskColorLabel,
} from "@/lib/assessment/historySummary";
import { store } from "@/lib/assessment/storage";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/progress")({ component: Page });

function Page() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  useEffect(() => setList(store.getAssessments().slice().reverse()), []);

  const W = 320,
    H = 140,
    P = 24;
  const max = 10;
  const pts = list.map((a, i) => {
    const x = list.length === 1 ? W / 2 : P + (i * (W - 2 * P)) / (list.length - 1);
    const y = H - P - (getPainScore(a) / max) * (H - 2 * P);
    return { x, y, a };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const avg = list.length
    ? (list.reduce((s, a) => s + getPainScore(a), 0) / list.length).toFixed(1)
    : "-";
  const firstPain = list[0] ? getPainScore(list[0]) : undefined;
  const latestPain = list[list.length - 1] ? getPainScore(list[list.length - 1]) : undefined;
  const painDiff =
    typeof firstPain === "number" && typeof latestPain === "number" ? latestPain - firstPain : 0;
  const trendLabel =
    list.length < 2
      ? "ยังต้องมีบันทึกเพิ่ม"
      : painDiff < 0
        ? "Pain score ลดลง"
        : painDiff > 0
          ? "Pain score เพิ่มขึ้น"
          : "Pain score คงที่";
  const TrendIcon = painDiff <= 0 ? TrendingDown : TrendingUp;
  const mostCommonTrigger = getMostCommonPrimaryTrigger(list);
  const riskTrend =
    list.length < 2
      ? "ยังต้องมีบันทึกเพิ่ม"
      : `${getRiskColorLabel(list[0].risk)} → ${getRiskColorLabel(list[list.length - 1].risk)}`;

  return (
    <>
      <AppHeader title="พัฒนาการ" back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-card/85 text-primary">
              <TrendIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">สรุปแนวโน้ม</p>
              <h2 className="text-xl font-bold text-navy">{trendLabel}</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-navy-soft">
            ดูจาก Pain score ที่บันทึกไว้ในแต่ละครั้ง เพื่อช่วยสังเกตการเปลี่ยนแปลงของอาการ
          </p>
        </Card>

        {list.length === 0 ? (
          <EmptyState icon={<ClipboardList className="h-6 w-6" />} title="ยังไม่มีข้อมูลพัฒนาการ" />
        ) : (
          <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-navy">แนวโน้ม Pain score</h3>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full">
              <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="var(--border)" />
              <line x1={P} y1={P} x2={P} y2={H - P} stroke="var(--border)" />
              {path && (
                <path
                  d={path}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="var(--primary)" />
              ))}
            </svg>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
            <p className="text-xs text-navy-soft">การประเมินทั้งหมด</p>
            <p className="mt-1 text-2xl font-bold text-navy">{list.length}</p>
          </Card>
          <Card className="rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
            <p className="text-xs text-navy-soft">เฉลี่ย Pain score</p>
            <p className="mt-1 text-2xl font-bold text-navy">{avg}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Card className="rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <Target className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-navy-soft">Primary trigger ที่พบบ่อย</p>
                <p className="mt-1 text-base font-bold text-navy">{mostCommonTrigger}</p>
              </div>
            </div>
          </Card>
          <Card className="rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-navy-soft">แนวโน้มระดับความเสี่ยง</p>
                <p className="mt-1 text-base font-bold text-navy">{riskTrend}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <Activity className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-navy">อ่านแนวโน้มอย่างไร</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                หาก Pain score เพิ่มขึ้น ระดับความเสี่ยงสูงขึ้น หรือมีอาการใหม่
                ควรลดกิจกรรมที่กระตุ้นและพิจารณาพบผู้เชี่ยวชาญ
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
