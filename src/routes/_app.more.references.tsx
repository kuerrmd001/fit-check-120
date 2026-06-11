import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { BookOpenCheck, FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_app/more/references")({ component: Page });

const REFS = [
  {
    group: "แนวทางการออกกำลังกาย",
    title: "American College of Sports Medicine",
    detail: "Guidelines for Exercise Testing and Prescription",
  },
  {
    group: "อาการปวดหลัง",
    title: "NICE Guideline NG59",
    detail: "Low back pain and sciatica in over 16s",
  },
  {
    group: "สัญญาณที่ควรระวัง",
    title: "Physiopedia",
    detail: "Red Flags in Low Back Pain",
  },
  {
    group: "การกลับไปทำกิจกรรม",
    title: "British Journal of Sports Medicine",
    detail: "Return to running progression guidelines",
  },
];

function Page() {
  return (
    <>
      <AppHeader title="แหล่งอ้างอิง" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">เอกสารประกอบข้อมูลในแอป</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                รวมแหล่งข้อมูลที่ใช้ช่วยจัดโครงสร้างบทความและคำแนะนำทั่วไปของ Fit Check
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {REFS.map((r) => (
            <Card key={r.title}>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary">{r.group}</p>
                  <p className="mt-1 text-sm font-bold text-navy">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-soft">{r.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/70">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-navy-soft">
              แหล่งอ้างอิงเหล่านี้ใช้สำหรับการให้ข้อมูลทั่วไป ไม่ใช่การให้คำแนะนำเฉพาะบุคคล
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
