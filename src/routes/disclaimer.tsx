import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { DISCLAIMER, PDPA } from "@/content/disclaimer";
import { store } from "@/lib/assessment/storage";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [agree, setAgree] = useState(false);
  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-navy">ข้อตกลงและความยินยอม</h1>
        <p className="mt-1 text-sm text-navy-soft">โปรดอ่านอย่างละเอียดก่อนเริ่มใช้งาน</p>

        <div className="mt-4 space-y-3">
          <AlertBox tone="info" title="ข้อจำกัดของแอป">
            {DISCLAIMER}
          </AlertBox>

          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-navy">
              การจัดการข้อมูลส่วนบุคคล (PDPA)
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-soft">
              {PDPA.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-5 w-5 accent-[oklch(0.68_0.13_180)]"
            />
            <span className="text-sm text-navy">
              ฉันได้อ่านและยินยอมข้อตกลงและการจัดเก็บข้อมูลด้านสุขภาพเพื่อการประเมิน
            </span>
          </label>
        </div>

        <div className="mt-5">
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
        </div>
      </div>
    </PhoneShell>
  );
}
