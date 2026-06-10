import type { ReactNode } from "react";
import { Card } from "./Card";

export function QuestionCard({
  number,
  total,
  question,
  children,
}: {
  number: number;
  total: number;
  question: string;
  children: ReactNode;
}) {
  return (
    <Card className="space-y-4">
      <div>
        <div className="text-xs font-semibold text-primary">
          ข้อ {number} / {total}
        </div>
        <h2 className="mt-1 text-base font-semibold leading-snug text-navy">
          {question}
        </h2>
      </div>
      <div className="space-y-2.5">{children}</div>
    </Card>
  );
}
