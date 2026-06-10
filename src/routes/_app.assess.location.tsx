import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { OptionButton } from "@/components/OptionButton";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/_app/assess/location")({ component: Page });

const LOCATIONS = [
  { id: "lower-back", label: "หลังล่าง", available: true },
  { id: "hip", label: "สะโพก", available: false },
  { id: "thigh", label: "ต้นขา", available: false },
  { id: "knee", label: "เข่า", available: false },
  { id: "ankle", label: "ข้อเท้า", available: false },
  { id: "shoulder", label: "ไหล่", available: false },
  { id: "neck", label: "คอ", available: false },
  { id: "other", label: "อื่น ๆ", available: false },
];

function Page() {
  const nav = useNavigate();
  return (
    <>
      <AppHeader title="ตำแหน่งที่ปวด" back />
      <ProgressSteps step={1} total={5} />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <p className="text-sm text-navy-soft">เลือกตำแหน่งที่คุณรู้สึกปวดมากที่สุด</p>
        <div className="grid grid-cols-2 gap-2.5">
          {LOCATIONS.map((l) => (
            <OptionButton
              key={l.id}
              selected={l.id === "lower-back"}
              onClick={() => l.available && nav({ to: "/assess/safety" })}
              hint={!l.available ? "เร็วๆ นี้" : undefined}
            >
              {l.label}
            </OptionButton>
          ))}
        </div>
        <Button full size="lg" onClick={() => nav({ to: "/assess/safety" })}>
          ถัดไป
        </Button>
      </div>
    </>
  );
}
