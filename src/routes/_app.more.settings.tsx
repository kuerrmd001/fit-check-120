import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { Bell, ChevronRight, Database, Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/more/settings")({ component: Page });

type Settings = ReturnType<typeof store.getSettings>;

function Page() {
  const [s, setS] = useState<Settings>({
    notifications: true,
    reminderHours: 24,
    analytics: false,
  });
  useEffect(() => setS(store.getSettings()), []);

  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    const n = { ...s, [k]: v };
    setS(n);
    store.setSettings(n);
  };

  return (
    <>
      <AppHeader title="การตั้งค่า" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <p className="text-base font-bold text-navy">ตั้งค่าประสบการณ์ Fit Check</p>
          <p className="mt-1 text-sm leading-relaxed text-navy-soft">
            เลือกการเตือน ติดตามข้อมูล และจัดการบัญชีในที่เดียว
          </p>
        </Card>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">การแจ้งเตือน</p>
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Bell className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">เปิดการแจ้งเตือน</p>
                  <p className="text-xs leading-relaxed text-navy-soft">
                    ใช้สำหรับติดตามอาการและเตือนพักฟื้น
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={s.notifications}
                onChange={(e) => update("notifications", e.target.checked)}
                className="h-5 w-5 shrink-0 accent-[oklch(0.68_0.13_180)]"
              />
            </div>

            <div className="rounded-2xl bg-muted/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-navy">เตือนติดตามอาการ</p>
                <p className="text-sm font-bold text-primary">{s.reminderHours} ชม.</p>
              </div>
              <input
                type="range"
                min={12}
                max={72}
                step={12}
                value={s.reminderHours}
                onChange={(e) => update("reminderHours", Number(e.target.value))}
                className="mt-3 w-full accent-[oklch(0.68_0.13_180)]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-navy-soft">
                <span>12 ชม.</span>
                <span>72 ชม.</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">ความเป็นส่วนตัวและข้อมูล</p>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <Link
              to="/more/privacy"
              className="flex items-center gap-3 border-b border-border px-4 py-3.5 transition hover:bg-muted"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Shield className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-navy">นโยบายความเป็นส่วนตัว</span>
                <span className="mt-0.5 block text-xs text-navy-soft">
                  อ่านเรื่องข้อมูลสุขภาพ ความยินยอม และสิทธิของคุณ
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-navy-soft" />
            </Link>

            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Database className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    ข้อมูลแบบไม่ระบุตัวตน
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-navy-soft">
                    ช่วยปรับปรุงแอปโดยไม่ผูกกับชื่อของคุณ
                  </span>
                </span>
              </div>
              <input
                type="checkbox"
                checked={s.analytics}
                onChange={(e) => update("analytics", e.target.checked)}
                className="h-5 w-5 shrink-0 accent-[oklch(0.68_0.13_180)]"
              />
            </div>

            <Link
              to="/more/delete-account"
              className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-risk-red-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-risk-red-soft text-risk-red">
                <Trash2 className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-risk-red">ลบบัญชีและข้อมูล</span>
                <span className="mt-0.5 block text-xs text-navy-soft">
                  จัดการข้อมูลที่เก็บอยู่ในเครื่องนี้
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-navy-soft" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
