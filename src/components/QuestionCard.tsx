import { useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import { Card } from "./Card";

export interface QuestionHelp {
  meaning: string;
  examples: string[];
  why: string;
  unsure?: string;
}

export function QuestionCard({
  number,
  total,
  question,
  help,
  children,
}: {
  number: number;
  total: number;
  question: string;
  help?: QuestionHelp;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="space-y-4 rounded-[28px] border-border/70 bg-card p-5 shadow-[0_18px_40px_-30px_oklch(0.4_0.06_210)]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
            ข้อ {number} / {total}
          </div>
          {help && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-primary transition hover:bg-primary-soft"
              aria-expanded={open}
            >
              <Info className="h-3.5 w-3.5" />
              อธิบายคำถาม
            </button>
          )}
        </div>
        <h2 className="mt-3 text-[17px] font-semibold leading-snug text-navy">{question}</h2>
      </div>
      {help && open && (
        <div className="space-y-3 rounded-3xl border border-primary/20 bg-primary-soft/55 p-4 text-sm leading-6 text-navy">
          <div>
            <p className="font-semibold">คำถามนี้หมายถึงอะไร</p>
            <p className="mt-1 text-navy-soft">{help.meaning}</p>
          </div>
          <div>
            <p className="font-semibold">ตัวอย่างคำตอบ</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-navy-soft">
              {help.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">ทำไมแอปถึงถามข้อนี้</p>
            <p className="mt-1 text-navy-soft">{help.why}</p>
          </div>
          <p className="rounded-2xl bg-card px-3 py-2 text-xs font-semibold text-navy-soft">
            {help.unsure ?? "ถ้าไม่แน่ใจควรเลือก “ไม่แน่ใจ”"}
          </p>
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </Card>
  );
}
