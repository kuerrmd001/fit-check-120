import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";
import {
  User, Settings, Shield, FileText, MessageSquare, HelpCircle, Bell, Bookmark, LogOut, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/_app/more/")({ component: Page });

const ITEMS = [
  { to: "/more/profile" as const, label: "โปรไฟล์", Icon: User },
  { to: "/more/settings" as const, label: "การตั้งค่า", Icon: Settings },
  { to: "/more/notifications" as const, label: "การแจ้งเตือน", Icon: Bell },
  { to: "/guide/saved" as const, label: "บทความที่บันทึก", Icon: Bookmark },
  { to: "/more/privacy" as const, label: "นโยบายความเป็นส่วนตัว", Icon: Shield },
  { to: "/more/references" as const, label: "แหล่งอ้างอิง", Icon: FileText },
  { to: "/more/support" as const, label: "ติดต่อสนับสนุน", Icon: MessageSquare },
  { to: "/more/faq" as const, label: "คำถามที่พบบ่อย", Icon: HelpCircle },
];

function Page() {
  const nav = useNavigate();
  const [name, setName] = useState("ผู้ใช้");
  const [mode, setMode] = useState<"guest"|"user">("guest");
  useEffect(() => {
    const a = store.getAuth();
    if (a) { setMode(a.mode); if (a.name) setName(a.name); }
  }, []);

  return (
    <>
      <AppHeader title="เพิ่มเติม" />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary text-base font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-navy">{name}</p>
            <p className="text-xs text-navy-soft">{mode === "guest" ? "Guest Mode" : "สมาชิก"}</p>
          </div>
        </Card>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {ITEMS.map((it, i) => {
            const Icon = it.Icon;
            return (
              <Link key={it.to} to={it.to}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${i !== ITEMS.length - 1 ? "border-b border-border" : ""}`}>
                <Icon className="h-4 w-4 text-primary" />
                <span className="flex-1 text-sm text-navy">{it.label}</span>
                <ChevronRight className="h-4 w-4 text-navy-soft" />
              </Link>
            );
          })}
        </div>

        <Button full variant="outline" onClick={() => {
          store.setAuth(null);
          nav({ to: "/login" });
        }}>
          <LogOut className="h-4 w-4" /> ออกจากระบบ
        </Button>

        <Link to="/more/delete-account">
          <Button full variant="ghost" className="text-risk-red">ลบบัญชีและข้อมูลทั้งหมด</Button>
        </Link>

        <p className="pt-2 text-center text-xs text-navy-soft">เวอร์ชัน 1.0.0 · Fit Check</p>
      </div>
    </>
  );
}
