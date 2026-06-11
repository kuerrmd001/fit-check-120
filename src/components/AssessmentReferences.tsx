import { useState } from "react";
import { BookOpenCheck, X } from "lucide-react";
import { Button } from "./Button";

const REFERENCES = [
  {
    topic: "Red flag / Safety Check",
    label: "แนวทางคัดกรองสัญญาณอันตรายของอาการหลังล่าง",
  },
  {
    topic: "Pain score 0-10",
    label: "Numeric Pain Rating Scale สำหรับให้ผู้ใช้บอกระดับความปวด",
  },
  {
    topic: "Body map / pain location",
    label: "การใช้แผนภาพร่างกายเพื่อระบุตำแหน่งอาการ",
  },
  {
    topic: "Sports injury impact questions",
    label: "คำถามผลกระทบต่อกิจกรรม กีฬา และชีวิตประจำวัน",
  },
  {
    topic: "Return-to-exercise guidance",
    label: "หลักการกลับไปออกกำลังกายแบบค่อยเป็นค่อยไปและติดตามอาการ",
  },
];

export function AssessmentReferences() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full px-1 text-sm font-semibold text-primary"
      >
        <BookOpenCheck className="h-4 w-4" />
        แหล่งอ้างอิงของการประเมิน
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/35 px-4 pb-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="assessment-references-title"
        >
          <div className="w-full max-w-sm rounded-[28px] border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-primary">Fit Check</p>
                <h2 id="assessment-references-title" className="mt-1 text-lg font-bold text-navy">
                  แหล่งอ้างอิงของการประเมิน
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-navy-soft"
                aria-label="ปิด"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {REFERENCES.map((reference) => (
                <div
                  key={reference.topic}
                  className="rounded-2xl border border-border bg-muted/60 p-3"
                >
                  <p className="text-xs font-semibold text-primary">{reference.topic}</p>
                  <p className="mt-1 text-sm leading-6 text-navy-soft">{reference.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-2xl bg-primary-soft px-3 py-2 text-xs leading-5 text-navy-soft">
              ใช้เป็นกรอบข้อมูลทั่วไปในการจัดคำถาม ไม่ใช่การวินิจฉัยหรือคำแนะนำเฉพาะบุคคล
            </p>

            <Button full size="lg" className="mt-4" onClick={() => setOpen(false)}>
              เข้าใจแล้ว
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
