import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { Activity, ArrowRight, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setAuth({ mode: "user", name: email.split("@")[0] || "ผู้ใช้" });
    nav({ to: "/home" });
  };

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto px-5 pb-7 pt-5">
        <div className="mb-5 rounded-[28px] border border-primary/15 bg-primary-soft/70 p-5 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-primary text-white shadow-card">
            <Activity className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-navy">ยินดีต้อนรับกลับมา</h1>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            เข้าสู่ระบบเพื่อบันทึกประวัติการประเมิน แผนฟื้นฟู และการติดตามอาการของคุณ
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[28px] border border-border bg-white p-4 shadow-card"
        >
          <div className="mb-3">
            <h2 className="text-base font-semibold text-navy">เข้าสู่ระบบ</h2>
            <p className="text-xs text-navy-soft">ใช้บัญชีตัวอย่างสำหรับต้นแบบนี้ได้เลย</p>
          </div>
          <div>
            <label className="text-xs font-medium text-navy-soft">อีเมล</label>
            <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
              <Mail className="h-4 w-4 text-primary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-navy outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-navy-soft">รหัสผ่าน</label>
            <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
              <LockKeyhole className="h-4 w-4 text-primary" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-navy outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <Link to="/forgot-password" className="text-xs font-semibold text-primary">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <Button type="submit" full size="lg" className="mt-4">
            เข้าสู่ระบบ <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-navy-soft">
          <div className="h-px flex-1 bg-border" />
          หรือ
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-[28px] border border-border bg-white p-4 shadow-card">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-navy">โหมดผู้เยี่ยมชม</h2>
              <p className="mt-1 text-xs leading-5 text-navy-soft">
                ทดลองใช้งานได้ทันที เหมาะสำหรับดูขั้นตอนประเมินและแผนฟื้นฟูเบื้องต้น
              </p>
            </div>
          </div>
          <Button
            full
            variant="outline"
            className="mt-4"
            onClick={() => {
              store.setAuth({ mode: "guest" });
              nav({ to: "/home" });
            }}
          >
            ใช้งานแบบผู้เยี่ยมชม
          </Button>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-soft px-3.5 py-3 text-xs leading-5 text-navy">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>ข้อมูลสุขภาพของคุณใช้เพื่อการประเมินและติดตามอาการในแอปนี้เท่านั้น</span>
        </div>

        <p className="mt-5 text-center text-sm text-navy-soft">
          ยังไม่มีบัญชี?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </PhoneShell>
  );
}
