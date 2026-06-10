import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { ChevronRight, Activity } from "lucide-react";

export const Route = createFileRoute("/_app/recover/")({ component: Page });

const ACTIVITIES = [
  { id: "stretch", title: "ยืดเหยียดหลังล่าง", duration: "5 นาที", level: "เบา" },
  { id: "core", title: "Core เบื้องต้น", duration: "8 นาที", level: "ปานกลาง" },
  { id: "mobility", title: "Mobility สะโพก", duration: "6 นาที", level: "เบา" },
  { id: "walk", title: "เดินฟื้นฟู", duration: "15 นาที", level: "เบา" },
  { id: "hipthrust", title: "Glute Activation", duration: "10 นาที", level: "ปานกลาง" },
];

function Page() {
  return (
    <>
      <AppHeader title="แผนฟื้นฟู" subtitle="กิจกรรมเบา ๆ เพื่อช่วยฟื้นตัว" />
      <div className="flex-1 space-y-3 px-4 pb-6">
        {ACTIVITIES.map((a) => (
          <Link key={a.id} to="/recover/activity/$id" params={{ id: a.id }}>
            <Card className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{a.title}</p>
                <p className="text-xs text-navy-soft">{a.duration} · ระดับ {a.level}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-navy-soft" />
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
