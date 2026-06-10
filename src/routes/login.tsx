import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { Activity } from "lucide-react";

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
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-card">
            <Activity className="h-8 w-8" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-navy">ยินดีต้อนรับสู่ Fit Check</h1>
          <p className="text-sm text-navy-soft">เข้าสู่ระบบเพื่อบันทึกประวัติของคุณ</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-navy-soft">อีเมล</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-soft">รหัสผ่าน</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-primary">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <Button type="submit" full size="lg">
            เข้าสู่ระบบ
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-navy-soft">
          <div className="h-px flex-1 bg-border" />
          หรือ
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          full
          variant="outline"
          onClick={() => {
            store.setAuth({ mode: "guest" });
            nav({ to: "/home" });
          }}
        >
          ใช้งานแบบ Guest
        </Button>

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
