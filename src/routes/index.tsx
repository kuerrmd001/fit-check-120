import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Activity, HeartPulse, ShieldCheck } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { store, seedIfEmpty } from "@/lib/assessment/storage";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    seedIfEmpty();
    const t = setTimeout(() => {
      if (!store.getConsent()) nav({ to: "/disclaimer" });
      else if (!store.getAuth()) nav({ to: "/login" });
      else nav({ to: "/home" });
    }, 1200);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-8 text-center">
        <div />

        <div className="mx-auto flex w-full max-w-xs flex-col items-center">
          <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[32px] bg-primary text-white shadow-[0_22px_50px_-26px_oklch(0.4_0.12_190)]">
            <Activity className="h-11 w-11" />
            <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-risk-green-soft text-risk-green">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Fit Check
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">ประเมินก่อนกลับไปขยับ</h1>
          <p className="mt-3 text-sm leading-7 text-navy-soft">
            ช่วยประเมินอาการปวดหลังส่วนล่างเบื้องต้น และวางแผนกลับไปออกกำลังกายอย่างระมัดระวัง
          </p>

          <div className="mt-6 grid w-full gap-2 text-left">
            {[
              "คัดกรองสัญญาณที่ควรระวังก่อน",
              "ดูระดับความเสี่ยงแบบเข้าใจง่าย",
              "ติดตามอาการและแผนฟื้นฟูเบื้องต้น",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-soft"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-navy">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mx-auto h-1.5 w-28 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
          <p className="mt-3 text-xs text-navy-soft">
            Fit Check ให้ข้อมูลทั่วไป ไม่ใช่การวินิจฉัยทางการแพทย์
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}
