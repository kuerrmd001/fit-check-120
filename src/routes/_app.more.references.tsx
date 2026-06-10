import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";

export const Route = createFileRoute("/_app/more/references")({ component: Page });

const REFS = [
  "American College of Sports Medicine — Guidelines for Exercise Testing and Prescription",
  "NICE Guideline NG59 — Low back pain and sciatica in over 16s",
  "Physiopedia — Red Flags in Low Back Pain",
  "BJSM — Return to running progression guidelines",
];

function Page() {
  return (
    <>
      <AppHeader title="แหล่งอ้างอิง" back />
      <div className="flex-1 space-y-2 px-4 pb-6">
        {REFS.map((r, i) => (
          <Card key={i}><p className="text-sm text-navy">{r}</p></Card>
        ))}
        <p className="pt-2 text-xs text-navy-soft">
          แหล่งอ้างอิงเหล่านี้ใช้สำหรับการให้ข้อมูลทั่วไป ไม่ใช่การให้คำแนะนำเฉพาะบุคคล
        </p>
      </div>
    </>
  );
}
