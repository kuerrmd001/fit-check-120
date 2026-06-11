import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { Activity, Flag, LockKeyhole, Mail, UserRound } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: Page });

function Page() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    goal: "กลับไปออกกำลังกายอย่างระมัดระวัง",
    level: "เริ่มต้น",
  });

  const inputClass =
    "min-w-0 flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-navy-soft/50";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setAuth({ mode: "user", name: form.nickname || "ผู้ใช้" });
    store.setProfile({
      ...store.getProfile(),
      nickname: form.nickname,
      goal: form.goal,
      activityLevel: form.level,
    });
    nav({ to: "/home" });
  };

  return (
    <PhoneShell>
      <AppHeader title="สมัครสมาชิก" subtitle="เริ่มต้นใช้งาน Fit Check" back />
      <form onSubmit={submit} className="flex-1 space-y-4 overflow-y-auto px-5 pb-7">
        <Card className="rounded-[28px] border-primary/15 bg-primary-soft/70">
          <p className="text-xs font-semibold text-primary">เริ่มต้นใช้งาน</p>
          <h1 className="mt-1 text-xl font-bold text-navy">ตั้งค่าโปรไฟล์เบื้องต้น</h1>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            ใช้ข้อมูลเท่าที่จำเป็น เพื่อช่วยให้หน้าประเมินและแผนฟื้นฟูอ่านง่ายขึ้นสำหรับคุณ
          </p>
        </Card>

        <Card className="rounded-[28px]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">ข้อมูลบัญชี</h2>
              <p className="text-xs text-navy-soft">สำหรับบันทึกประวัติในต้นแบบนี้</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-navy-soft">ชื่อเล่น</label>
              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
                <UserRound className="h-4 w-4 text-primary" />
                <input
                  required
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  className={inputClass}
                  placeholder="เช่น แพรว"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-navy-soft">อีเมล</label>
              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
                <Mail className="h-4 w-4 text-primary" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-navy-soft">รหัสผ่าน</label>
              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 focus-within:border-primary">
                <LockKeyhole className="h-4 w-4 text-primary" />
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">เป้าหมายของคุณ</h2>
              <p className="text-xs text-navy-soft">เลือกเพื่อให้หน้าหลักอ่านเข้ากับบริบทมากขึ้น</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              "กลับไปออกกำลังกายอย่างระมัดระวัง",
              "ติดตามอาการปวดหลังส่วนล่าง",
              "ดูแผนฟื้นฟูเบื้องต้น",
            ].map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setForm({ ...form, goal })}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition ${
                  form.goal === goal
                    ? "border-primary/30 bg-primary-soft text-navy"
                    : "border-border bg-card text-navy-soft"
                }`}
              >
                <Activity className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-medium">{goal}</span>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-navy-soft">ระดับกิจกรรมตอนนี้</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["เริ่มต้น", "สม่ำเสมอ", "เข้มข้น"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm({ ...form, level })}
                  className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold transition ${
                    form.level === level
                      ? "border-primary/30 bg-primary text-white"
                      : "border-border bg-card text-navy"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Button type="submit" full size="lg">
          สร้างบัญชีและเริ่มใช้งาน
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
