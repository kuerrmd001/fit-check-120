import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/RiskBadge";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { Bell, ClipboardCheck, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/home")({ component: Home });

function Home() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  const [name, setName] = useState("ผู้ใช้");
  useEffect(() => {
    setList(store.getAssessments());
    const a = store.getAuth();
    if (a?.name) setName(a.name);
  }, []);
  const latest = list[0];

  return (
    <div className="flex-1 px-4 pb-6 pt-1">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-navy-soft">สวัสดี</p>
          <h1 className="text-lg font-bold text-navy">{name} 👋</h1>
        </div>
        <Link to="/more/notifications" className="rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5 text-navy" />
        </Link>
      </header>

      <Card className="bg-gradient-to-br from-primary to-[oklch(0.55_0.14_180)] text-white">
        <p className="text-xs opacity-90">เริ่มประเมินอาการเบื้องต้น</p>
        <h2 className="mt-1 text-lg font-bold">เช็คอาการปวดหลังของคุณวันนี้</h2>
        <p className="mt-1 text-xs opacity-90">ใช้เวลาประมาณ 2-3 นาที</p>
        <Link to="/assess" className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
          เริ่มประเมิน <ChevronRight className="h-4 w-4" />
        </Link>
      </Card>

      {latest && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-navy">การประเมินล่าสุด</h3>
          <Link to="/history/$id" params={{ id: latest.id }}>
            <Card className="flex items-center justify-between">
              <div>
                <RiskBadge level={latest.risk} />
                <p className="mt-2 text-xs text-navy-soft">
                  {new Date(latest.createdAt).toLocaleDateString("th-TH")} ·
                  {" "}{latest.activity === "running" ? "วิ่ง" : latest.activity === "weights" ? "เวท" : "ไม่แน่ใจ"}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-navy-soft" />
            </Card>
          </Link>
        </div>
      )}

      <h3 className="mt-5 mb-2 text-sm font-semibold text-navy">ทางลัด</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { to: "/assess" as const, icon: ClipboardCheck, label: "ประเมินใหม่" },
          { to: "/history/progress" as const, icon: TrendingUp, label: "ดูพัฒนาการ" },
          { to: "/guide" as const, icon: BookOpen, label: "คู่มือ" },
          { to: "/recover" as const, icon: TrendingUp, label: "แผนฟื้นฟู" },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to}>
              <Card className="flex flex-col items-start gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-navy">{t.label}</span>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl bg-primary-soft p-4 text-xs text-navy">
        ⚠️ Fit Check ให้ข้อมูลทั่วไปเท่านั้น ไม่ใช่การวินิจฉัยทางการแพทย์
      </div>
    </div>
  );
}
