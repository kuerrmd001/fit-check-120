import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

export function PhoneShell({ children, gray }: { children: ReactNode; gray?: boolean }) {
  return (
    <div className={`min-h-dvh ${gray ? "bg-muted" : "bg-card"}`}>
      <div className="mx-auto max-w-md min-h-dvh bg-card flex flex-col">
        <StatusBar />
        {children}
      </div>
    </div>
  );
}
