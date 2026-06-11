import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { StatusBar } from "@/components/StatusBar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const APPEARANCE_KEY = "fc.appearance";

type Appearance = "light" | "dark" | "system";

function readAppearance(): Appearance {
  if (typeof window === "undefined") return "light";
  const value = localStorage.getItem(APPEARANCE_KEY);
  return value === "dark" || value === "system" ? value : "light";
}

function applyAppearance(mode: Appearance) {
  if (typeof window === "undefined") return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle(
    "dark",
    mode === "dark" || (mode === "system" && prefersDark),
  );
  document.documentElement.dataset.appearance = mode;
}

function AppLayout() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncAppearance = () => applyAppearance(readAppearance());

    syncAppearance();
    media.addEventListener("change", syncAppearance);
    window.addEventListener("storage", syncAppearance);
    window.addEventListener("fitcheck-appearance-change", syncAppearance);

    return () => {
      media.removeEventListener("change", syncAppearance);
      window.removeEventListener("storage", syncAppearance);
      window.removeEventListener("fitcheck-appearance-change", syncAppearance);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-muted">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background pb-24 shadow-[0_0_40px_-28px_oklch(0.35_0.06_220_/_0.35)]">
        <StatusBar />
        <Outlet />
      </div>
      <div className="mx-auto max-w-md">
        <BottomNavigation />
      </div>
    </div>
  );
}
