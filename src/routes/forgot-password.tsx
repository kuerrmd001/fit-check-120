import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { Mail, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: Page });

function Page() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PhoneShell>
      <AppHeader title="ลืมรหัสผ่าน" back />
      <form onSubmit={submit} className="flex-1 space-y-4 px-5 pb-7">
        <div className="rounded-[28px] border border-primary/15 bg-primary-soft/70 p-5 shadow-card">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-navy">รีเซ็ตรหัสผ่าน</h1>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์รีเซ็ตให้คุณในรูปแบบตัวอย่างของต้นแบบนี้
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-4 shadow-card">
          <label className="text-xs font-medium text-navy-soft">อีเมล</label>
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
            <Mail className="h-4 w-4 text-primary" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent text-sm text-navy outline-none"
            />
          </div>
        </div>

        {sent && (
          <AlertBox tone="success" title="ส่งลิงก์แล้ว">
            กรุณาตรวจสอบอีเมล {email || "ของคุณ"} สำหรับขั้นตอนรีเซ็ตรหัสผ่าน (ตัวอย่างเท่านั้น)
          </AlertBox>
        )}

        <div className="flex items-start gap-2 rounded-2xl bg-primary-soft px-3.5 py-3 text-xs leading-5 text-navy">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>ลิงก์รีเซ็ตควรส่งเฉพาะไปยังอีเมลของคุณ และไม่ควรแชร์รหัสผ่านกับผู้อื่น</span>
        </div>

        <Button type="submit" full size="lg">
          ส่งลิงก์รีเซ็ต
        </Button>
        <Button type="button" full variant="ghost" onClick={() => nav({ to: "/login" })}>
          กลับไปหน้าเข้าสู่ระบบ
        </Button>
      </form>
    </PhoneShell>
  );
}
