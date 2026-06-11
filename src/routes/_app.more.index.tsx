import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Bookmark,
  ChevronRight,
  Database,
  FileText,
  HelpCircle,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  User,
} from "lucide-react";

export const Route = createFileRoute("/_app/more/")({ component: Page });

const ACCOUNT_ITEMS = [
  {
    to: "/more/profile" as const,
    label: "โปรไฟล์",
    description: "เป้าหมาย กิจกรรมหลัก และข้อมูลพื้นฐาน",
    Icon: User,
  },
  {
    to: "/more/settings" as const,
    label: "การตั้งค่า",
    description: "การแจ้งเตือน ความเป็นส่วนตัว และบัญชี",
    Icon: Settings,
  },
  {
    to: "/more/notifications" as const,
    label: "การแจ้งเตือน",
    description: "ติดตามอาการ เตือนพักฟื้น และบทความใหม่",
    Icon: Bell,
  },
  {
    to: "/guide/saved" as const,
    label: "บทความที่บันทึก",
    description: "เก็บคำแนะนำที่อยากกลับมาอ่าน",
    Icon: Bookmark,
  },
];

const SUPPORT_ITEMS = [
  {
    to: "/more/privacy" as const,
    label: "ความเป็นส่วนตัว",
    description: "ข้อมูลสุขภาพ ความยินยอม และการลบข้อมูล",
    Icon: Shield,
  },
  {
    to: "/more/references" as const,
    label: "แหล่งอ้างอิง",
    description: "แนวทางและเอกสารที่ใช้ประกอบข้อมูล",
    Icon: FileText,
  },
  {
    to: "/more/support" as const,
    label: "ติดต่อสนับสนุน",
    description: "ส่งปัญหาการใช้งานหรือข้อเสนอแนะ",
    Icon: MessageSquare,
  },
  {
    to: "/more/faq" as const,
    label: "คำถามที่พบบ่อย",
    description: "คำตอบสั้น ๆ เกี่ยวกับ Fit Check",
    Icon: HelpCircle,
  },
];

function Page() {
  const nav = useNavigate();
  const [name, setName] = useState("ผู้ใช้");
  const [mode, setMode] = useState<"guest" | "user">("guest");
  useEffect(() => {
    const a = store.getAuth();
    if (a) {
      setMode(a.mode);
      if (a.name) setName(a.name);
    }
  }, []);

  return (
    <>
      <AppHeader title="เพิ่มเติม" />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-lg font-bold text-primary shadow-soft">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-navy">{name}</p>
              <p className="text-xs font-medium text-primary">
                {mode === "guest" ? "โหมดผู้เยี่ยมชม" : "สมาชิก Fit Check"}
              </p>
            </div>
            <Link
              to="/more/profile"
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-primary shadow-soft"
              aria-label="ไปที่โปรไฟล์"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/80 p-3">
              <Activity className="mb-2 h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-navy">โหมดสุขภาพ</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-navy-soft">
                บันทึกอาการและติดตามภาพรวม
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <Database className="mb-2 h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-navy">ข้อมูลในเครื่อง</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-navy-soft">
                จัดการได้จากเมนูส่วนตัว
              </p>
            </div>
          </div>
        </Card>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">บัญชีและการติดตาม</p>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            {ACCOUNT_ITEMS.map((it, i) => {
              const Icon = it.Icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-3 px-4 py-3.5 transition hover:bg-muted ${
                    i !== ACCOUNT_ITEMS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy">{it.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-navy-soft">
                      {it.description}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-navy-soft" />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">ข้อมูลและความช่วยเหลือ</p>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            {SUPPORT_ITEMS.map((it, i) => {
              const Icon = it.Icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-3 px-4 py-3.5 transition hover:bg-muted ${
                    i !== SUPPORT_ITEMS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy">{it.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-navy-soft">
                      {it.description}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-navy-soft" />
                </Link>
              );
            })}
          </div>
        </section>

        <Button
          full
          variant="outline"
          onClick={() => {
            store.setAuth(null);
            nav({ to: "/login" });
          }}
        >
          <LogOut className="h-4 w-4" /> ออกจากระบบ
        </Button>

        <Link to="/more/delete-account">
          <Button full variant="ghost" className="text-risk-red">
            ลบบัญชีและข้อมูลทั้งหมด
          </Button>
        </Link>

        <p className="pt-2 text-center text-xs text-navy-soft">เวอร์ชัน 1.0.0 · Fit Check</p>
      </div>
    </>
  );
}
