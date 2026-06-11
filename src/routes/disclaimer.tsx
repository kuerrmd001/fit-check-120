import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { DISCLAIMER, PDPA } from "@/content/disclaimer";
import { store } from "@/lib/assessment/storage";
import { FileText, LockKeyhole, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [agree, setAgree] = useState(false);
  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto px-5 pb-7 pt-4">
        <div className="rounded-[28px] border border-primary/15 bg-primary-soft/70 p-5 shadow-card">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-primary">ก่อนเริ่มใช้งาน</p>
          <h1 className="mt-1 text-2xl font-bold text-navy">ข้อตกลงและความยินยอม</h1>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            โปรดอ่านข้อมูลสำคัญให้ครบ เพื่อเข้าใจขอบเขตของแอปและการดูแลข้อมูลสุขภาพของคุณ
          </p>
        </div>

        <div className="mt-4 space-y-3.5">
          <AlertBox tone="warning" title="ข้อจำกัดของแอป">
            {DISCLAIMER}
          </AlertBox>

          <div className="rounded-[24px] border border-border bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy">สิ่งที่ควรรู้ก่อนใช้ Fit Check</h3>
                <p className="text-xs text-navy-soft">อ่านง่าย แต่สำคัญต่อความปลอดภัย</p>
              </div>
            </div>
            <div className="mt-3 space-y-2 text-sm leading-6 text-navy-soft">
              <p>แอปนี้ช่วยจัดข้อมูลอาการและให้คำแนะนำทั่วไปสำหรับการประเมินตนเองเบื้องต้น</p>
              <p>
                หากมีอาการรุนแรง อาการแย่ลง หรือพบสัญญาณที่ควรระวัง ควรหยุดกิจกรรมและพบผู้เชี่ยวชาญ
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-border bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy">ข้อมูลส่วนบุคคลและความยินยอม</h3>
                <p className="text-xs text-navy-soft">ถ้อยคำที่เป็นมิตรต่อ PDPA สำหรับต้นแบบแอป</p>
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-navy-soft">
              {PDPA.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start gap-3 rounded-[24px] border border-primary/20 bg-white p-4 shadow-card">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-5 w-5 accent-[oklch(0.68_0.13_180)]"
            />
            <span className="text-sm leading-6 text-navy">
              ฉันได้อ่านและยินยอมข้อตกลงและการจัดเก็บข้อมูลด้านสุขภาพเพื่อการประเมิน
            </span>
          </label>
        </div>

        <div className="mt-5 rounded-[24px] bg-white pb-1">
          <Button
            full
            size="lg"
            disabled={!agree}
            onClick={() => {
              store.setConsent(true);
              nav({ to: "/login" });
            }}
            className={!agree ? "opacity-50" : ""}
          >
            ยอมรับและไปต่อ
          </Button>
          <p className="mt-3 text-center text-xs leading-5 text-navy-soft">
            คุณสามารถใช้งานแบบผู้เยี่ยมชมและลบข้อมูลได้ภายหลัง
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}
