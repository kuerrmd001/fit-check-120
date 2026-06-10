import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/more/profile")({ component: Page });

function Page() {
  const [p, setP] = useState({ nickname: "", age: 21, sex: "ไม่ระบุ", sport: "วิ่ง" });
  useEffect(() => setP(store.getProfile()), []);
  return (
    <>
      <AppHeader title="โปรไฟล์" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        {[
          { k: "nickname", label: "ชื่อเล่น", type: "text" },
          { k: "age", label: "อายุ", type: "number" },
          { k: "sex", label: "เพศ", type: "text" },
          { k: "sport", label: "กิจกรรมหลัก", type: "text" },
        ].map((f) => (
          <div key={f.k}>
            <label className="text-xs font-medium text-navy-soft">{f.label}</label>
            <input
              type={f.type}
              value={(p as never)[f.k]}
              onChange={(e) => setP({ ...p, [f.k]: f.type === "number" ? Number(e.target.value) : e.target.value })}
              className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        ))}
        <Button full size="lg" onClick={() => { store.setProfile(p); alert("บันทึกแล้ว"); }}>บันทึก</Button>
      </div>
    </>
  );
}
