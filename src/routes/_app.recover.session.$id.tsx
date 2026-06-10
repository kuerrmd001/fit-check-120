import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/recover/session/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/recover/session/$id" });
  const nav = useNavigate();
  const [sec, setSec] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [running]);

  return (
    <>
      <AppHeader title="เซสชัน" back />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pb-6">
        <Card className="w-full text-center">
          <p className="text-xs text-navy-soft">เวลาที่ผ่านไป</p>
          <p className="mt-2 text-5xl font-bold text-primary">
            {String(Math.floor(sec / 60)).padStart(2, "0")}:{String(sec % 60).padStart(2, "0")}
          </p>
        </Card>
        <div className="w-full space-y-2">
          <Button full size="lg" variant={running ? "outline" : "primary"} onClick={() => setRunning((r) => !r)}>
            {running ? "หยุดชั่วคราว" : "ดำเนินต่อ"}
          </Button>
          <Button full size="lg" onClick={() => nav({ to: "/recover/summary/$id", params: { id } })}>
            จบเซสชัน
          </Button>
        </div>
      </div>
    </>
  );
}
