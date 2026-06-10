import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/more/faq")({ component: Page });

const FAQS = [
  { q: "Fit Check วินิจฉัยโรคให้ฉันได้หรือไม่?", a: "ไม่ได้ Fit Check เป็นเพียงเครื่องมือช่วยประเมินเบื้องต้นจากคำตอบของคุณ" },
  { q: "ข้อมูลของฉันถูกเก็บที่ไหน?", a: "เก็บไว้ในเครื่องของคุณเท่านั้น (Local Storage) จนกว่าคุณจะลบ" },
  { q: "ฉันใช้แบบไม่สมัครได้ไหม?", a: "ได้ ใช้โหมด Guest ได้เลย" },
  { q: "ควรพบแพทย์เมื่อใด?", a: "หากพบสัญญาณอันตราย เช่น ชาก้นกบ อ่อนแรงขา หรืออาการแย่ลงเรื่อย ๆ" },
];

function Page() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <AppHeader title="คำถามที่พบบ่อย" back />
      <div className="flex-1 space-y-2 px-4 pb-6">
        {FAQS.map((f, i) => (
          <Card key={i}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between text-left">
              <span className="text-sm font-semibold text-navy">{f.q}</span>
              <ChevronDown className={`h-4 w-4 text-navy-soft transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="mt-2 text-sm text-navy-soft">{f.a}</p>}
          </Card>
        ))}
      </div>
    </>
  );
}
