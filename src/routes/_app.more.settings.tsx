import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/more/settings")({ component: Page });

function Page() {
  const [s, setS] = useState({ notifications: true, reminderHours: 24, analytics: false });
  useEffect(() => setS(store.getSettings()), []);
  const update = (k: string, v: unknown) => {
    const n = { ...s, [k]: v };
    setS(n); store.setSettings(n);
  };
  return (
    <>
      <AppHeader title="การตั้งค่า" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card className="flex items-center justify-between">
          <span className="text-sm text-navy">การแจ้งเตือน</span>
          <input type="checkbox" checked={s.notifications} onChange={(e) => update("notifications", e.target.checked)} className="h-5 w-5 accent-[oklch(0.68_0.13_180)]" />
        </Card>
        <Card>
          <p className="text-sm text-navy">เตือนติดตามอาการหลัง (ชั่วโมง)</p>
          <input type="range" min={12} max={72} step={12} value={s.reminderHours}
            onChange={(e) => update("reminderHours", Number(e.target.value))}
            className="mt-2 w-full accent-[oklch(0.68_0.13_180)]" />
          <p className="mt-1 text-center text-sm font-semibold text-primary">{s.reminderHours} ชั่วโมง</p>
        </Card>
        <Card className="flex items-center justify-between">
          <span className="text-sm text-navy">แบ่งปันข้อมูลแบบไม่ระบุตัวตน</span>
          <input type="checkbox" checked={s.analytics} onChange={(e) => update("analytics", e.target.checked)} className="h-5 w-5 accent-[oklch(0.68_0.13_180)]" />
        </Card>
      </div>
    </>
  );
}
