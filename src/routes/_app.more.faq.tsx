import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/more/faq")({ component: Page });

const FAQS = [
  {
    q: "Fit Check วินิจฉัยโรคให้ฉันได้หรือไม่?",
    a: "ไม่ได้ Fit Check เป็นเพียงเครื่องมือช่วยประเมินเบื้องต้นจากคำตอบของคุณ",
  },
  {
    q: "ข้อมูลของฉันถูกเก็บที่ไหน?",
    a: "เก็บไว้ในเครื่องของคุณเท่านั้น (Local Storage) จนกว่าคุณจะลบ",
  },
  { q: "ฉันใช้แบบไม่สมัครได้ไหม?", a: "ได้ ใช้โหมด Guest ได้เลย" },
  {
    q: "ควรพบแพทย์เมื่อใด?",
    a: "หากพบสัญญาณอันตราย เช่น ชาก้นกบ อ่อนแรงขา หรืออาการแย่ลงเรื่อย ๆ",
  },
];

function Page() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <AppHeader title="คำถามที่พบบ่อย" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">คำตอบสั้น ๆ ก่อนเริ่มใช้งาน</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                รวมคำถามหลักเกี่ยวกับการประเมิน ข้อมูล และการใช้งาน Fit Check
              </p>
            </div>
          </div>
        </Card>

        {FAQS.map((f, i) => (
          <Card key={i} className="transition hover:border-primary/30">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm font-bold leading-relaxed text-navy">{f.q}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-navy-soft transition ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <p className="mt-3 rounded-2xl bg-muted/70 p-3 text-sm leading-relaxed text-navy-soft">
                {f.a}
              </p>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
