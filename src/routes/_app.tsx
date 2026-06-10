import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/BottomNavigation";
import { StatusBar } from "@/components/StatusBar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-dvh bg-muted">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card pb-20">
        <StatusBar />
        <Outlet />
      </div>
      <div className="mx-auto max-w-md">
        <BottomNavigation />
      </div>
    </div>
  );
}
