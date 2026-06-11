import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, HeartPulse, BookOpen, History, Menu } from "lucide-react";

const TABS = [
  { to: "/assess", label: "ประเมิน", icon: ClipboardCheck },
  { to: "/recover", label: "ฟื้นฟู", icon: HeartPulse },
  { to: "/guide", label: "คู่มือ", icon: BookOpen },
  { to: "/history", label: "บันทึก", icon: History },
  { to: "/more", label: "เพิ่มเติม", icon: Menu },
] as const;

export function BottomNavigation() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-3 pb-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <ul className="pointer-events-auto grid grid-cols-5 rounded-[28px] border border-border/70 bg-card/95 p-1.5 shadow-[0_20px_48px_-28px_oklch(0.35_0.06_220_/_0.35)] backdrop-blur">
        {TABS.map((t) => {
          const active = path === t.to || path.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[22px] px-1 text-[11px] transition ${
                  active ? "bg-primary-soft text-primary" : "text-navy-soft hover:bg-muted/70"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className={active ? "font-semibold" : ""}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
