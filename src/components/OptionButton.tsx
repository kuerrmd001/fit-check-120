import type { ReactNode } from "react";

interface Props {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  hint?: string;
  tone?: "default" | "danger";
}

export function OptionButton({
  selected,
  onClick,
  children,
  hint,
  tone = "default",
}: Props) {
  const base = selected
    ? tone === "danger"
      ? "border-risk-red bg-risk-red-soft text-risk-red"
      : "border-primary bg-primary-soft text-navy"
    : "border-border bg-card text-navy hover:bg-muted";
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-medium transition ${base}`}
    >
      <div>{children}</div>
      {hint && <div className="mt-0.5 text-xs font-normal text-navy-soft">{hint}</div>}
    </button>
  );
}
