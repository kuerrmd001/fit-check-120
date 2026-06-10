import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useState } from "react";

export const Route = createFileRoute("/_app/more/support")({ component: Page });

function Page() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <AppHeader title="ติดต่อสนับสนุน" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <p className="text-sm text-navy">อีเมล: support@fitcheck.app</p>
          <p className="text-sm text-navy-soft">ตอบกลับภายใน 1-2 วันทำการ</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-navy">ส่งข้อความหาเรา</p>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4}
            placeholder="บอกเล่าปัญหาหรือข้อเสนอแนะ..."
            className="mt-2 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
          <Button full className="mt-3" onClick={() => { setSent(true); setMsg(""); }}>
            ส่งข้อความ
          </Button>
          {sent && <p className="mt-2 text-center text-xs text-risk-green">ส่งเรียบร้อยแล้ว (ตัวอย่าง)</p>}
        </Card>
      </div>
    </>
  );
}
