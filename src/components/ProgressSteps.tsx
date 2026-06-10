interface Props {
  step: number;
  total: number;
  label?: string;
}

export function ProgressSteps({ step, total, label }: Props) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="px-4 pt-2 pb-3">
      <div className="mb-1.5 flex justify-between text-xs text-navy-soft">
        <span>{label ?? `ขั้นตอน ${step} จาก ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
