import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ClipboardList, Filter, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { RiskBadge } from "@/components/RiskBadge";
import {
  getActivityLabel,
  getFollowupStatus,
  getPainLocationLabel,
  getPainScore,
  getPrimaryTriggerLabel,
  getRadiationLabel,
  getRiskColorLabel,
} from "@/lib/assessment/historySummary";
import { store } from "@/lib/assessment/storage";
import type { ActivityType, AssessmentRecord, RiskLevel } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/")({ component: Page });

const riskFilters: { v: RiskLevel | "all"; label: string; active: string }[] = [
  { v: "all", label: "ทั้งหมด", active: "bg-primary text-white" },
  { v: "green", label: "ต่ำ", active: "bg-risk-green text-white" },
  { v: "yellow", label: "ปานกลาง", active: "bg-risk-yellow text-white" },
  { v: "red", label: "สูง", active: "bg-risk-red text-white" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Page() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [actFilter, setActFilter] = useState<ActivityType | "all">("all");
  useEffect(() => setList(store.getAssessments()), []);

  const filtered = list.filter(
    (a) =>
      (riskFilter === "all" || a.risk === riskFilter) &&
      (actFilter === "all" || a.activity === actFilter),
  );
  const latest = list[0];
  const redCount = list.filter((a) => a.risk === "red").length;
  const yellowCount = list.filter((a) => a.risk === "yellow").length;

  return (
    <>
      <AppHeader
        title="บันทึก"
        subtitle={`${list.length} รายการ`}
        right={
          <Link to="/history/progress" className="rounded-full p-2 hover:bg-muted">
            <TrendingUp className="h-5 w-5 text-navy" />
          </Link>
        }
      />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <p className="text-xs font-semibold text-primary">สรุปบันทึกอาการ</p>
          <h2 className="mt-1 text-xl font-bold text-navy">{list.length} การประเมิน</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[20px] bg-card/85 p-3">
              <p className="text-xs text-navy-soft">ล่าสุด</p>
              <p className="mt-1 text-sm font-bold text-navy">
                {latest ? `Pain ${getPainScore(latest)}/10` : "-"}
              </p>
            </div>
            <div className="rounded-[20px] bg-card/85 p-3">
              <p className="text-xs text-navy-soft">เหลือง</p>
              <p className="mt-1 text-sm font-bold text-risk-yellow">{yellowCount}</p>
            </div>
            <div className="rounded-[20px] bg-card/85 p-3">
              <p className="text-xs text-navy-soft">แดง</p>
              <p className="mt-1 text-sm font-bold text-risk-red">{redCount}</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Link to="/history/progress" className="flex-1">
            <Card className="flex items-center gap-2 rounded-[24px] border-border/70 bg-card py-3.5 shadow-soft">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">พัฒนาการ</span>
            </Card>
          </Link>
          <Link to="/history/insights" className="flex-1">
            <Card className="flex items-center gap-2 rounded-[24px] border-border/70 bg-card py-3.5 shadow-soft">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">ข้อมูลเชิงลึก</span>
            </Card>
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 shrink-0 text-navy-soft" />
          {riskFilters.map((f) => (
            <button
              key={f.v}
              onClick={() => setRiskFilter(f.v)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                riskFilter === f.v ? f.active : "bg-muted text-navy"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { v: "all" as const, label: "ทุกกิจกรรม" },
            { v: "running" as const, label: "วิ่ง" },
            { v: "weights" as const, label: "เวท" },
            { v: "unsure" as const, label: "ไม่แน่ใจ" },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setActFilter(f.v)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                actFilter === f.v ? "bg-primary text-white" : "bg-muted text-navy"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="h-6 w-6" />}
            title="ยังไม่มีบันทึก"
            action={
              <Link to="/assess">
                <Button>เริ่มประเมิน</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-2.5">
            {filtered.map((a) => (
              <Link key={a.id} to="/history/$id" params={{ id: a.id }}>
                <Card className="flex items-start gap-3 rounded-[26px] border-border/70 bg-card p-4 shadow-soft">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <RiskBadge level={a.risk} />
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-navy-soft">
                        ผลประเมิน: {getRiskColorLabel(a.risk)}
                      </span>
                    </div>
                    <p className="mt-3 text-base font-semibold text-navy">
                      {getPainLocationLabel(a)} • {getActivityLabel(a.activity)}
                    </p>
                    <p className="mt-1 text-sm font-medium text-navy-soft">
                      Pain {getPainScore(a)}/10 • Trigger: {getPrimaryTriggerLabel(a)}
                    </p>
                    <p className="mt-1 text-xs text-navy-soft">อาการร้าว: {getRadiationLabel(a)}</p>
                    <p className="mt-1 text-xs font-semibold text-primary">
                      {getFollowupStatus(a)}
                    </p>
                    <p className="mt-2 text-xs text-navy-soft">{formatDate(a.createdAt)}</p>
                  </div>
                  <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-navy-soft" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
