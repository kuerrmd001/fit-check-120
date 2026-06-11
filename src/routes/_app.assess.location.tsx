import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const Route = createFileRoute("/_app/assess/location")({ component: Page });

type LocationId = "lower-back" | "hip" | "knee" | "ankle" | "shoulder" | "neck";

const LOCATIONS: { id: LocationId; label: string; available: boolean }[] = [
  { id: "lower-back", label: "หลังล่าง", available: true },
  { id: "hip", label: "สะโพก", available: false },
  { id: "knee", label: "เข่า", available: false },
  { id: "ankle", label: "ข้อเท้า", available: false },
  { id: "shoulder", label: "ไหล่", available: false },
  { id: "neck", label: "คอ", available: false },
];

const MAP_MARKERS: {
  id: LocationId;
  label: string;
  side: "front" | "back";
  top: string;
  left: string;
}[] = [
  { id: "neck", label: "คอ", side: "front", top: "17%", left: "50%" },
  { id: "shoulder", label: "ไหล่", side: "front", top: "28%", left: "30%" },
  { id: "hip", label: "สะโพก", side: "front", top: "54%", left: "50%" },
  { id: "knee", label: "เข่า", side: "front", top: "73%", left: "39%" },
  { id: "ankle", label: "ข้อเท้า", side: "front", top: "91%", left: "62%" },
  { id: "lower-back", label: "หลังล่าง", side: "back", top: "47%", left: "50%" },
  { id: "hip", label: "สะโพก", side: "back", top: "57%", left: "50%" },
];

function Page() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<LocationId>("lower-back");
  const [notice, setNotice] = useState<string | null>(null);

  const chooseLocation = (id: LocationId) => {
    const location = LOCATIONS.find((item) => item.id === id);
    if (location?.available) {
      setSelected(id);
      setNotice(null);
      return;
    }
    setNotice(`${location?.label ?? "ตำแหน่งนี้"} จะเพิ่มในอนาคต`);
  };

  const continueFlow = () => {
    if (selected === "lower-back") {
      nav({ to: "/assess/safety" });
      return;
    }
    setNotice("เวอร์ชันต้นแบบนี้เปิดใช้เต็มสำหรับอาการหลังล่างก่อน");
  };

  return (
    <>
      <AppHeader title="ตำแหน่งที่มีอาการ" back />
      <ProgressSteps step={1} total={5} label="เลือกตำแหน่งที่มีอาการ" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <section>
          <h2 className="text-xl font-bold text-navy">แตะตำแหน่งที่มีอาการ</h2>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            เวอร์ชันต้นแบบนี้ประเมินอาการหลังล่างได้เต็มรูปแบบก่อน ตำแหน่งอื่นจะเพิ่มในอนาคต
          </p>
        </section>

        <Card className="space-y-1 rounded-[24px] border-primary/15 bg-primary-soft/60 shadow-none">
          <p className="text-sm font-bold text-navy">เลือกอาการหลัก 1 ตำแหน่งก่อน</p>
          <p className="text-sm leading-6 text-navy-soft">
            หากมีตำแหน่งอื่นร่วมด้วย สามารถบันทึกเป็นข้อมูลเพิ่มเติมได้ในอนาคต
          </p>
          <p className="text-sm leading-6 text-navy-soft">
            ผลประเมินรอบนี้จะอิงจากอาการหลักที่เลือก
          </p>
        </Card>

        <Card className="rounded-[28px] bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            <BodyPanel
              title="ด้านหน้า"
              side="front"
              selected={selected}
              onSelect={chooseLocation}
            />
            <BodyPanel title="ด้านหลัง" side="back" selected={selected} onSelect={chooseLocation} />
          </div>
        </Card>

        {notice && (
          <div className="rounded-[22px] border border-primary/20 bg-primary-soft px-4 py-3 text-sm leading-6 text-navy">
            {notice}
          </div>
        )}

        <Card className="rounded-[26px] bg-white">
          <h3 className="text-sm font-semibold text-navy">รายการตำแหน่งสำหรับการเข้าถึง</h3>
          <div className="mt-3 grid gap-2">
            {LOCATIONS.map((location) => {
              const active = selected === location.id && location.available;
              return (
                <button
                  key={location.id}
                  type="button"
                  aria-pressed={active}
                  aria-disabled={!location.available}
                  onClick={() => chooseLocation(location.id)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-primary/30 bg-primary text-white shadow-soft"
                      : location.available
                        ? "border-border bg-card text-navy hover:border-primary/30"
                        : "border-dashed border-border bg-muted/50 text-navy-soft"
                  }`}
                >
                  <span className="font-medium">{location.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      active
                        ? "bg-white/18 text-white"
                        : location.available
                          ? "bg-primary-soft text-primary"
                          : "bg-white text-navy-soft"
                    }`}
                  >
                    {location.available ? "เลือกอยู่" : "เร็ว ๆ นี้"}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Button full size="lg" onClick={continueFlow}>
          ถัดไป: ตรวจสัญญาณอันตราย
        </Button>
      </div>
    </>
  );
}

function BodyPanel({
  title,
  side,
  selected,
  onSelect,
}: {
  title: string;
  side: "front" | "back";
  selected: LocationId;
  onSelect: (id: LocationId) => void;
}) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-3">
      <p className="mb-2 text-center text-xs font-semibold text-navy-soft">{title}</p>
      <div className="relative mx-auto h-72 max-w-40">
        <BodyShape side={side} selected={selected} />
        {MAP_MARKERS.filter((marker) => marker.side === side).map((marker) => {
          const location = LOCATIONS.find((item) => item.id === marker.id);
          const active = selected === marker.id && location?.available;
          return (
            <button
              key={`${side}-${marker.id}`}
              type="button"
              aria-label={`${marker.label}${location?.available ? "" : " เร็ว ๆ นี้"}`}
              aria-pressed={active}
              aria-disabled={!location?.available}
              onClick={() => onSelect(marker.id)}
              style={{ top: marker.top, left: marker.left }}
              className={`absolute min-w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold shadow-soft transition ${
                active
                  ? "border-primary bg-primary text-white ring-4 ring-primary/15"
                  : location?.available
                    ? "border-primary/30 bg-white text-primary"
                    : "border-border bg-white/90 text-navy-soft"
              }`}
            >
              {marker.label}
              {!location?.available && <span className="block text-[10px]">เร็ว ๆ นี้</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BodyShape({ side, selected }: { side: "front" | "back"; selected: LocationId }) {
  return (
    <svg
      viewBox="0 0 160 280"
      role="img"
      aria-label={side === "front" ? "แผนภาพร่างกายด้านหน้า" : "แผนภาพร่างกายด้านหลัง"}
      className="h-full w-full"
    >
      <circle cx="80" cy="28" r="18" fill="#e8f6f2" stroke="#c9ded8" strokeWidth="3" />
      <path
        d="M59 54 C65 47 95 47 101 54 L110 119 C112 136 103 149 96 160 L92 245 C92 255 86 262 80 262 C74 262 68 255 68 245 L64 160 C57 149 48 136 50 119 Z"
        fill="#eef8f5"
        stroke="#c9ded8"
        strokeWidth="3"
      />
      <path
        d="M53 65 C38 83 29 111 25 140"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M107 65 C122 83 131 111 135 140"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M68 158 C58 186 52 221 49 256"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="13"
      />
      <path
        d="M92 158 C102 186 108 221 111 256"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="13"
      />
      {side === "back" && (
        <rect
          x="58"
          y="111"
          width="44"
          height="38"
          rx="16"
          fill={selected === "lower-back" ? "#0fb5a8" : "#d9eee9"}
          opacity={selected === "lower-back" ? "0.34" : "0.22"}
        />
      )}
      {side === "front" && (
        <path
          d="M60 112 C68 119 92 119 100 112"
          fill="none"
          stroke="#d9eee9"
          strokeLinecap="round"
          strokeWidth="8"
        />
      )}
    </svg>
  );
}
