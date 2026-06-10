import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}

export function AppHeader({ title, subtitle, back, right }: Props) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-2 px-4 py-3">
      {back && (
        <button
          onClick={() => router.history.back()}
          className="rounded-full p-1.5 text-navy hover:bg-muted"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div className="flex-1">
        <h1 className="text-base font-semibold text-navy">{title}</h1>
        {subtitle && (
          <p className="text-xs text-navy-soft">{subtitle}</p>
        )}
      </div>
      {right}
    </header>
  );
}
