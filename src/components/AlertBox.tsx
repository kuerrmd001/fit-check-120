import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  tone: "danger" | "warning" | "info" | "success";
  title?: string;
  children: ReactNode;
}

export function AlertBox({ tone, title, children }: Props) {
  const map = {
    danger: {
      bg: "bg-risk-red-soft border-risk-red/30",
      text: "text-risk-red",
      Icon: AlertTriangle,
    },
    warning: {
      bg: "bg-risk-yellow-soft border-risk-yellow/30",
      text: "text-risk-yellow",
      Icon: AlertTriangle,
    },
    info: { bg: "bg-primary-soft border-primary/20", text: "text-primary", Icon: Info },
    success: {
      bg: "bg-risk-green-soft border-risk-green/30",
      text: "text-risk-green",
      Icon: CheckCircle2,
    },
  }[tone];
  const Icon = map.Icon;
  return (
    <div className={`flex gap-3 rounded-2xl border p-3.5 ${map.bg}`}>
      <Icon className={`h-5 w-5 shrink-0 ${map.text}`} />
      <div className="flex-1 text-sm text-navy">
        {title && <div className={`mb-0.5 font-semibold ${map.text}`}>{title}</div>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
