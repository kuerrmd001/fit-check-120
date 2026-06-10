import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";

export const Route = createFileRoute("/forgot-password")({ component: Page });

function Page() {
  const nav = useNavigate();
  const [sent, setSent] = useState(false);
  return (
    <PhoneShell>
      <AppHeader title="ลืมรหัสผ่าน" back />
      <div className="flex-1 space-y-3 px-5 pb-6">
        <p className="text-sm text-navy-soft">กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์รีเซ็ตให้คุณ</p>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
        />
        {sent && (
          <AlertBox tone="success" title="ส่งลิงก์แล้ว">
            กรุณาตรวจสอบอีเมลของคุณ (ตัวอย่างเท่านั้น)
          </AlertBox>
        )}
        <Button full size="lg" onClick={() => setSent(true)}>
          ส่งลิงก์รีเซ็ต
        </Button>
        <Button full variant="ghost" onClick={() => nav({ to: "/login" })}>
          กลับไปหน้าเข้าสู่ระบบ
        </Button>
      </div>
    </PhoneShell>
  );
}
