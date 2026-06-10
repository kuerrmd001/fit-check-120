import type { RiskLevel } from "@/lib/assessment/types";

const map: Record<RiskLevel, { label: string; bg: string; text: string }> = {
  green: {
    label: "ต่ำ",
    bg: "bg-risk-green-soft",
    text: "text-risk-green",
  },
  yellow: {
    label: "ปานกลาง",
    bg: "bg-risk-yellow-soft",
    text: "text-risk-yellow",
  },
  red: { label: "สูง", bg: "bg-risk-red-soft", text: "text-risk-red" },
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const m = map[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${m.bg} ${m.text}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      ความเสี่ยง{m.label}
    </span>
  );
}
