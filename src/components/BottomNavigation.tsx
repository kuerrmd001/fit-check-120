import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardCheck,
  HeartPulse,
  BookOpen,
  History,
  Menu,
} from "lucide-react";

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
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-card/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = path === t.to || path.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] transition ${
                  active ? "text-primary" : "text-navy-soft"
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
