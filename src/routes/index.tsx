import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Activity } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { store, seedIfEmpty } from "@/lib/assessment/storage";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    seedIfEmpty();
    const t = setTimeout(() => {
      if (!store.getConsent()) nav({ to: "/disclaimer" });
      else if (!store.getAuth()) nav({ to: "/login" });
      else nav({ to: "/home" });
    }, 1200);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-white shadow-card">
          <Activity className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-navy">Fit Check</h1>
          <p className="mt-1 text-sm text-navy-soft">
            ประเมินอาการปวดหลังเบื้องต้น
          </p>
        </div>
        <div className="mt-6 h-1 w-24 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse bg-primary" />
        </div>
      </div>
    </PhoneShell>
  );
}
