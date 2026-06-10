import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";

export const Route = createFileRoute("/signup")({ component: Page });

function Page() {
  const nav = useNavigate();
  const [form, setForm] = useState({ nickname: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setAuth({ mode: "user", name: form.nickname || "ผู้ใช้" });
    store.setProfile({ ...store.getProfile(), nickname: form.nickname });
    nav({ to: "/home" });
  };

  return (
    <PhoneShell>
      <AppHeader title="สมัครสมาชิก" back />
      <form onSubmit={submit} className="flex-1 space-y-3 overflow-y-auto px-5 pb-6">
        <p className="text-sm text-navy-soft">เก็บข้อมูลให้น้อยที่สุดเพื่อความเป็นส่วนตัวของคุณ</p>
        {[
          { k: "nickname", label: "ชื่อเล่น", type: "text" },
          { k: "email", label: "อีเมล", type: "email" },
          { k: "password", label: "รหัสผ่าน", type: "password" },
        ].map((f) => (
          <div key={f.k}>
            <label className="text-xs font-medium text-navy-soft">{f.label}</label>
            <input
              required
              type={f.type}
              value={form[f.k as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        ))}
        <Button type="submit" full size="lg">
          สร้างบัญชี
        </Button>
        <p className="text-center text-sm text-navy-soft">
          มีบัญชีแล้ว?{" "}
          <Link to="/login" className="font-semibold text-primary">
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </PhoneShell>
  );
}
