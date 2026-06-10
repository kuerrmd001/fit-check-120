import type { RiskLevel } from "@/lib/assessment/types";

const colorByLevel: Record<RiskLevel, string> = {
  green: "var(--risk-green)",
  yellow: "var(--risk-yellow)",
  red: "var(--risk-red)",
};

export function RiskGauge({
  level,
  score,
}: {
  level: RiskLevel;
  score: number;
}) {
  const pct = level === "green" ? 25 : level === "yellow" ? 60 : 92;
  const stroke = colorByLevel[level];
  const R = 70;
  const C = 2 * Math.PI * R;
  const dash = (pct / 100) * C;

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="14"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke={stroke}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-navy">{score}</span>
        <span className="text-xs text-navy-soft">คะแนนรวม</span>
      </div>
    </div>
  );
}
