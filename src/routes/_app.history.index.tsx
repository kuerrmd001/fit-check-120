import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/RiskBadge";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import { ChevronRight, Filter, TrendingUp, Lightbulb, ClipboardList } from "lucide-react";
import type { AssessmentRecord, ActivityType, RiskLevel } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/")({ component: Page });

function Page() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [actFilter, setActFilter] = useState<ActivityType | "all">("all");
  useEffect(() => setList(store.getAssessments()), []);

  const filtered = list.filter((a) =>
    (riskFilter === "all" || a.risk === riskFilter) &&
    (actFilter === "all" || a.activity === actFilter)
  );

  return (
    <>
      <AppHeader title="บันทึก" subtitle={`${list.length} รายการ`} right={
        <Link to="/history/progress" className="rounded-full p-2 hover:bg-muted">
          <TrendingUp className="h-5 w-5 text-navy" />
        </Link>
      } />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <div className="flex gap-2">
          <Link to="/history/progress" className="flex-1">
            <Card className="flex items-center gap-2 py-3"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-xs font-medium">พัฒนาการ</span></Card>
          </Link>
          <Link to="/history/insights" className="flex-1">
            <Card className="flex items-center gap-2 py-3"><Lightbulb className="h-4 w-4 text-primary" /><span className="text-xs font-medium">ข้อมูลเชิงลึก</span></Card>
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 text-navy-soft shrink-0" />
          {[
            { v: "all" as const, label: "ทั้งหมด" },
            { v: "green" as const, label: "ต่ำ" },
            { v: "yellow" as const, label: "ปานกลาง" },
            { v: "red" as const, label: "สูง" },
          ].map((f) => (
            <button key={f.v} onClick={() => setRiskFilter(f.v)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${riskFilter === f.v ? "bg-primary text-white" : "bg-muted text-navy"}`}>
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
            <button key={f.v} onClick={() => setActFilter(f.v)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${actFilter === f.v ? "bg-primary text-white" : "bg-muted text-navy"}`}>
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<ClipboardList className="h-6 w-6" />} title="ยังไม่มีบันทึก"
            action={<Link to="/assess"><Button>เริ่มประเมิน</Button></Link>} />
        ) : (
          <div className="space-y-2">
            {filtered.map((a) => (
              <Link key={a.id} to="/history/$id" params={{ id: a.id }}>
                <Card className="flex items-center gap-3">
                  <div className="flex-1">
                    <RiskBadge level={a.risk} />
                    <p className="mt-1.5 text-sm font-semibold text-navy">
                      {a.activity === "running" ? "วิ่ง" : a.activity === "weights" ? "เวทเทรนนิ่ง" : "ไม่แน่ใจ"}
                      <span className="font-normal text-navy-soft"> · ปวด {a.common.painLevel}/10</span>
                    </p>
                    <p className="text-xs text-navy-soft">
                      {new Date(a.createdAt).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-navy-soft" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
