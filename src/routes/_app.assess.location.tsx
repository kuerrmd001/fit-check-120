import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { HelpCircle, X } from "lucide-react";

export const Route = createFileRoute("/_app/assess/location")({ component: Page });

type LocationId = "lower-back" | "hip" | "knee" | "ankle" | "shoulder" | "neck";

const LOCATIONS: {
  id: LocationId;
  label: string;
  side: "front" | "back";
  top: string;
  left: string;
  available: boolean;
  hint: string;
}[] = [
  {
    id: "neck",
    label: "คอ",
    side: "front",
    top: "16%",
    left: "50%",
    available: false,
    hint: "เร็ว ๆ นี้",
  },
  {
    id: "shoulder",
    label: "ไหล่",
    side: "front",
    top: "30%",
    left: "32%",
    available: false,
    hint: "เร็ว ๆ นี้",
  },
  {
    id: "hip",
    label: "สะโพก",
    side: "front",
    top: "55%",
    left: "50%",
    available: false,
    hint: "เร็ว ๆ นี้",
  },
  {
    id: "knee",
    label: "เข่า",
    side: "front",
    top: "74%",
    left: "38%",
    available: false,
    hint: "เร็ว ๆ นี้",
  },
  {
    id: "ankle",
    label: "ข้อเท้า",
    side: "front",
    top: "91%",
    left: "62%",
    available: false,
    hint: "เร็ว ๆ นี้",
  },
  {
    id: "lower-back",
    label: "หลังล่าง",
    side: "back",
    top: "47%",
    left: "50%",
    available: true,
    hint: "เปิดใช้เต็ม",
  },
];

function Page() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<LocationId>("lower-back");
  const [notice, setNotice] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const chooseLocation = (id: LocationId) => {
    const location = LOCATIONS.find((item) => item.id === id);
    setSelected(id);
    if (location?.available) {
      setNotice(null);
      nav({ to: "/assess/safety" });
      return;
    }
    setNotice(
      `${location?.label ?? "ตำแหน่งนี้"} ยังไม่เปิดใช้ในเวอร์ชันต้นแบบนี้ เราจะเพิ่มพื้นที่นี้ในอนาคต`,
    );
  };

  const continueFlow = () => {
    if (selected === "lower-back") {
      nav({ to: "/assess/safety" });
      return;
    }
    const location = LOCATIONS.find((item) => item.id === selected);
    setNotice(`${location?.label ?? "ตำแหน่งนี้"} ยังไม่เปิดใช้ในเวอร์ชันต้นแบบนี้`);
  };

  return (
    <>
      <AppHeader title="ตำแหน่งที่มีอาการ" back />
      <ProgressSteps step={1} total={5} label="เลือกตำแหน่งที่มีอาการ" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <section>
          <h2 className="text-xl font-bold text-navy">แตะตำแหน่งที่มีอาการมากที่สุด</h2>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            เลือกอาการหลัก 1 ตำแหน่งก่อน เพื่อให้ผลประเมินชัดเจนขึ้น
            เวอร์ชันต้นแบบนี้ประเมินอาการหลังล่างได้เต็มรูปแบบก่อน
          </p>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-2 text-sm font-semibold text-primary"
          >
            <HelpCircle className="h-4 w-4" />
            เลือกตำแหน่งอย่างไร?
          </button>
        </section>

        <Card className="rounded-[28px] border-primary/15 bg-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-navy">แผนที่ตำแหน่งอาการ</p>
              <p className="mt-0.5 text-xs text-navy-soft">แตะป้ายขนาดใหญ่บนร่างกาย</p>
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              หลังล่างพร้อมใช้
            </span>
          </div>
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

        <Card className="rounded-[26px] bg-card">
          <h3 className="text-sm font-semibold text-navy">รายการตำแหน่งสำหรับการเข้าถึง</h3>
          <p className="mt-1 text-xs leading-5 text-navy-soft">
            รายการนี้ตรงกับพื้นที่บนแผนที่ด้านบน
          </p>
          <div className="mt-3 grid gap-2">
            {LOCATIONS.map((location) => {
              const active = selected === location.id;
              return (
                <button
                  key={location.id}
                  type="button"
                  aria-pressed={active}
                  aria-disabled={!location.available}
                  onClick={() => chooseLocation(location.id)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? location.available
                        ? "border-primary/30 bg-primary text-white shadow-soft"
                        : "border-primary/30 bg-primary-soft text-navy"
                      : location.available
                        ? "border-border bg-card text-navy hover:border-primary/30"
                        : "border-dashed border-border bg-muted/50 text-navy-soft"
                  }`}
                >
                  <span className="font-medium">{location.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      active
                        ? location.available
                          ? "bg-white/18 text-white"
                          : "bg-card text-primary"
                        : location.available
                          ? "bg-primary-soft text-primary"
                          : "bg-card text-navy-soft"
                    }`}
                  >
                    {active && location.available ? "พร้อมไปต่อ" : location.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Button full size="lg" onClick={continueFlow}>
          {selected === "lower-back" ? "ถัดไป: ตรวจสัญญาณอันตราย" : "ตำแหน่งนี้ยังไม่เปิดใช้"}
        </Button>
      </div>
      {helpOpen && <LocationHelpSheet onClose={() => setHelpOpen(false)} />}
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
  const panelLocations = LOCATIONS.filter((location) => location.side === side);

  return (
    <div className="rounded-[24px] border border-border bg-muted/40 p-3">
      <p className="mb-2 text-center text-xs font-semibold text-navy-soft">{title}</p>
      <div className="relative mx-auto h-80 max-w-48">
        <BodyShape side={side} selected={selected} />
        {panelLocations.map((location) => {
          const active = selected === location.id;
          return (
            <button
              key={`${side}-${location.id}`}
              type="button"
              aria-label={`${location.label}${location.available ? " เปิดใช้เต็ม" : " เร็ว ๆ นี้"}`}
              aria-pressed={active}
              onClick={() => onSelect(location.id)}
              style={{ top: location.top, left: location.left }}
              className={`absolute min-h-12 min-w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-center text-xs font-bold shadow-soft transition active:scale-[0.98] ${
                active
                  ? location.available
                    ? "border-primary bg-primary text-white ring-4 ring-primary/20"
                    : "border-primary/30 bg-primary-soft text-navy ring-4 ring-primary/10"
                  : location.available
                    ? "border-primary/40 bg-card text-primary"
                    : "border-dashed border-border bg-card/95 text-navy-soft"
              }`}
            >
              <span className="block">{location.label}</span>
              <span className={active && location.available ? "text-white/80" : "text-[10px]"}>
                {location.hint}
              </span>
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
        <>
          <rect
            x="54"
            y="102"
            width="52"
            height="54"
            rx="20"
            fill={selected === "lower-back" ? "#0fb5a8" : "#d9eee9"}
            opacity={selected === "lower-back" ? "0.42" : "0.24"}
          />
          <path
            d="M62 121 C70 127 90 127 98 121"
            fill="none"
            stroke={selected === "lower-back" ? "#0fb5a8" : "#c9ded8"}
            strokeLinecap="round"
            strokeWidth="7"
            opacity="0.8"
          />
        </>
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

function LocationHelpSheet({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/35 px-4 pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-help-title"
    >
      <div className="w-full max-w-sm rounded-[28px] border border-border bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">คำแนะนำ</p>
            <h2 id="location-help-title" className="mt-1 text-lg font-bold text-navy">
              เลือกตำแหน่งอย่างไร?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-navy-soft"
            aria-label="ปิด"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-navy-soft">
          เลือกบริเวณที่มีอาการเด่นที่สุดในตอนนี้ หากปวดหลายจุด
          ให้เลือกจุดที่รบกวนการออกกำลังกายหรือชีวิตประจำวันมากที่สุดก่อน
        </p>
        <Button full size="lg" className="mt-5" onClick={onClose}>
          เข้าใจแล้ว
        </Button>
      </div>
    </div>
  );
}
