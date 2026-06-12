import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useDraft } from "@/lib/assessment/draft";
import { ArrowLeft, ChevronRight, HelpCircle, X } from "lucide-react";

export const Route = createFileRoute("/_app/assess/location")({ component: Page });

type Step = "region" | "back";
type MainRegionId = "neck" | "shoulder" | "back" | "hip" | "knee" | "ankle-foot" | "other";
type BackZoneId =
  | "neck"
  | "upper_back"
  | "mid_back"
  | "lower_back"
  | "tailbone_pelvis"
  | "lower_back_hip"
  | "unknown";

const MAIN_REGIONS: {
  id: MainRegionId;
  label: string;
  available: boolean;
  hint: string;
}[] = [
  { id: "neck", label: "คอ", available: false, hint: "กำลังพัฒนา" },
  { id: "shoulder", label: "ไหล่", available: false, hint: "กำลังพัฒนา" },
  { id: "back", label: "หลัง", available: true, hint: "เลือกได้" },
  { id: "hip", label: "สะโพก/ก้น", available: false, hint: "กำลังพัฒนา" },
  { id: "knee", label: "เข่า", available: false, hint: "กำลังพัฒนา" },
  { id: "ankle-foot", label: "ข้อเท้า/เท้า", available: false, hint: "กำลังพัฒนา" },
  { id: "other", label: "อื่น ๆ", available: false, hint: "กำลังพัฒนา" },
];

const BACK_ZONES: {
  id: BackZoneId;
  label: string;
  available: boolean;
  storageValue?: "lower_back" | "lower_back_hip" | "unknown";
  top: string;
  left: string;
  width: string;
}[] = [
  {
    id: "neck",
    label: "คอ / ต้นคอ",
    available: false,
    top: "13%",
    left: "50%",
    width: "7.4rem",
  },
  {
    id: "upper_back",
    label: "หลังส่วนบน",
    available: false,
    top: "30%",
    left: "50%",
    width: "7.8rem",
  },
  {
    id: "mid_back",
    label: "หลังกลาง",
    available: false,
    top: "47%",
    left: "50%",
    width: "7.2rem",
  },
  {
    id: "lower_back",
    label: "หลังล่าง",
    available: true,
    storageValue: "lower_back",
    top: "62%",
    left: "50%",
    width: "7.2rem",
  },
  {
    id: "tailbone_pelvis",
    label: "ก้นกบ / เชิงกราน",
    available: false,
    top: "78%",
    left: "50%",
    width: "8.6rem",
  },
  {
    id: "lower_back_hip",
    label: "หลังล่างร่วมกับสะโพก/ก้น",
    available: true,
    storageValue: "lower_back_hip",
    top: "69%",
    left: "50%",
    width: "9.6rem",
  },
  {
    id: "unknown",
    label: "ไม่แน่ใจ",
    available: true,
    storageValue: "unknown",
    top: "90%",
    left: "50%",
    width: "7rem",
  },
];

function Page() {
  const nav = useNavigate();
  const setDetail = useDraft((state) => state.setDetail);
  const [step, setStep] = useState<Step>("region");
  const [selectedRegion, setSelectedRegion] = useState<MainRegionId | null>(null);
  const [selectedBackZone, setSelectedBackZone] = useState<BackZoneId | null>(null);
  const [hasMultipleLocations, setHasMultipleLocations] = useState(false);
  const [comingSoonRegion, setComingSoonRegion] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const selectedZone = BACK_ZONES.find((zone) => zone.id === selectedBackZone);

  const chooseRegion = (region: (typeof MAIN_REGIONS)[number]) => {
    setSelectedRegion(region.id);
    setNotice(null);
    if (region.available) {
      setStep("back");
      return;
    }
    setComingSoonRegion(region.label);
  };

  const chooseBackZone = (zone: (typeof BACK_ZONES)[number]) => {
    setSelectedBackZone(zone.id);
    if (zone.available) {
      setNotice(null);
      return;
    }
    setNotice("ตำแหน่งนี้กำลังพัฒนา เวอร์ชันนี้ประเมินละเอียดเฉพาะอาการปวดหลังล่างก่อน");
  };

  const continueFlow = () => {
    if (!selectedZone) {
      setNotice("กรุณาเลือกตำแหน่งอาการหลักก่อน");
      return;
    }
    if (!selectedZone.available || !selectedZone.storageValue) {
      setNotice("ตำแหน่งนี้กำลังพัฒนา เวอร์ชันนี้ยังไม่ไปต่อในแบบประเมินเต็ม");
      return;
    }

    setDetail("painRegion", "back");
    setDetail("painSubRegion", selectedZone.storageValue);
    setDetail("primaryPainRegion", selectedZone.storageValue);
    setDetail("multiplePainRegions", hasMultipleLocations);
    nav({ to: "/assess/pain-scale" });
  };

  return (
    <>
      <AppHeader title="ตำแหน่งที่มีอาการ" back />
      <ProgressSteps step={1} total={6} label="เลือกตำแหน่งที่มีอาการ" />
      {step === "region" ? (
        <RegionStep selectedRegion={selectedRegion} onSelect={chooseRegion} />
      ) : (
        <BackStep
          selectedZone={selectedBackZone}
          hasMultipleLocations={hasMultipleLocations}
          notice={notice}
          onBack={() => {
            setStep("region");
            setNotice(null);
          }}
          onSelect={chooseBackZone}
          onToggleMultiple={() => setHasMultipleLocations((value) => !value)}
          onContinue={continueFlow}
        />
      )}
      {comingSoonRegion && (
        <ComingSoonModal region={comingSoonRegion} onClose={() => setComingSoonRegion(null)} />
      )}
    </>
  );
}

function RegionStep({
  selectedRegion,
  onSelect,
}: {
  selectedRegion: MainRegionId | null;
  onSelect: (region: (typeof MAIN_REGIONS)[number]) => void;
}) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
      <section>
        <h2 className="text-xl font-bold text-navy">วันนี้คุณเจ็บบริเวณไหน?</h2>
        <p className="mt-2 text-sm leading-6 text-navy-soft">
          เลือกบริเวณที่รู้สึกปวดหรือรบกวนการออกกำลังกายมากที่สุด
        </p>
      </section>

      <Card className="rounded-[28px] border-primary/15 bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-navy">เลือกบริเวณหลัก</p>
            <p className="mt-0.5 text-xs leading-5 text-navy-soft">
              เวอร์ชันนี้เปิดใช้ละเอียดสำหรับอาการหลังล่างก่อน
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            หลัง
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {MAIN_REGIONS.map((region) => {
            const active = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(region)}
                className={`min-h-24 rounded-[22px] border px-3 py-3 text-left transition active:scale-[0.99] ${
                  active
                    ? region.available
                      ? "border-primary/30 bg-primary text-white shadow-soft"
                      : "border-primary/30 bg-primary-soft text-navy"
                    : region.available
                      ? "border-primary/25 bg-card text-navy shadow-soft"
                      : "border-dashed border-border bg-muted/45 text-navy-soft"
                }`}
              >
                <span className="block text-base font-bold">{region.label}</span>
                <span
                  className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    active && region.available
                      ? "bg-white/18 text-white"
                      : region.available
                        ? "bg-primary-soft text-primary"
                        : "bg-card text-navy-soft"
                  }`}
                >
                  {region.hint}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="rounded-[22px] border border-primary/20 bg-primary-soft px-4 py-3 text-sm leading-6 text-navy">
        <div className="flex gap-2">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            หากมีหลายจุด ให้เริ่มจากตำแหน่งที่รบกวนการออกกำลังกายหรือชีวิตประจำวันมากที่สุดก่อน
          </span>
        </div>
      </div>
    </div>
  );
}

function BackStep({
  selectedZone,
  hasMultipleLocations,
  notice,
  onBack,
  onSelect,
  onToggleMultiple,
  onContinue,
}: {
  selectedZone: BackZoneId | null;
  hasMultipleLocations: boolean;
  notice: string | null;
  onBack: () => void;
  onSelect: (zone: (typeof BACK_ZONES)[number]) => void;
  onToggleMultiple: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-semibold text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับไปเลือกบริเวณหลัก
      </button>

      <section>
        <h2 className="text-xl font-bold text-navy">ปวดหลังบริเวณไหนมากที่สุด?</h2>
        <p className="mt-2 text-sm leading-6 text-navy-soft">
          แตะตำแหน่งที่ปวดมากที่สุด หากปวดหลายจุด
          ให้เลือกจุดที่รบกวนการออกกำลังกายหรือชีวิตประจำวันมากที่สุดก่อน
        </p>
      </section>

      <Card className="rounded-[28px] border-primary/15 bg-card p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-navy">แผนที่อาการปวดหลัง</p>
            <p className="mt-0.5 text-xs leading-5 text-navy-soft">
              ตำแหน่งที่เลือกได้จะไปต่อยังการให้คะแนนความปวด
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            ต้องเลือก 1 จุด
          </span>
        </div>
        <BackPainMap selectedZone={selectedZone} onSelect={onSelect} />
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
          {BACK_ZONES.map((zone) => (
            <BackZoneButton
              key={zone.id}
              zone={zone}
              active={selectedZone === zone.id}
              onSelect={() => onSelect(zone)}
            />
          ))}
        </div>
      </Card>

      <button
        type="button"
        onClick={onToggleMultiple}
        className={`flex w-full items-start gap-3 rounded-[22px] border px-4 py-3 text-left text-sm transition ${
          hasMultipleLocations
            ? "border-primary/30 bg-primary-soft text-navy"
            : "border-border bg-card text-navy-soft"
        }`}
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
            hasMultipleLocations ? "border-primary bg-primary text-white" : "border-border bg-card"
          }`}
          aria-hidden="true"
        >
          {hasMultipleLocations ? "✓" : ""}
        </span>
        <span>
          <span className="block font-semibold text-navy">มีหลายตำแหน่งร่วมด้วย</span>
          <span className="mt-1 block leading-5">
            ใช้เป็นข้อมูลประกอบเท่านั้น ผลประเมินรอบนี้จะอิงจากตำแหน่งหลักที่เลือก
          </span>
        </span>
      </button>

      <Button full size="lg" onClick={onContinue}>
        ไปให้คะแนนความปวด <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function BackPainMap({
  selectedZone,
  onSelect,
}: {
  selectedZone: BackZoneId | null;
  onSelect: (zone: (typeof BACK_ZONES)[number]) => void;
}) {
  return (
    <div className="rounded-[24px] border border-border bg-muted/40 p-3">
      <div className="relative mx-auto h-[30rem] max-w-64">
        <BackShape selectedZone={selectedZone} />
        {BACK_ZONES.map((zone) => (
          <button
            key={zone.id}
            type="button"
            aria-pressed={selectedZone === zone.id}
            aria-label={`${zone.label}${zone.available ? " เลือกได้" : " กำลังพัฒนา"}`}
            onClick={() => onSelect(zone)}
            style={{ top: zone.top, left: zone.left, width: zone.width }}
            className={`absolute min-h-12 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-center text-xs font-bold shadow-soft transition active:scale-[0.98] ${
              selectedZone === zone.id
                ? zone.available
                  ? "border-primary bg-primary text-white ring-4 ring-primary/20"
                  : "border-primary/30 bg-primary-soft text-navy ring-4 ring-primary/10"
                : zone.available
                  ? "border-primary/40 bg-card text-primary"
                  : "border-dashed border-border bg-card/95 text-navy-soft"
            }`}
          >
            <span className="block leading-4">{zone.label}</span>
            <span className={selectedZone === zone.id && zone.available ? "text-white/80" : ""}>
              {zone.available ? "เลือกได้" : "กำลังพัฒนา"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackZoneButton({
  zone,
  active,
  onSelect,
}: {
  zone: (typeof BACK_ZONES)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
        active
          ? zone.available
            ? "border-primary/30 bg-primary text-white shadow-soft"
            : "border-primary/30 bg-primary-soft text-navy"
          : zone.available
            ? "border-border bg-card text-navy hover:border-primary/30"
            : "border-dashed border-border bg-muted/50 text-navy-soft"
      }`}
    >
      <span className="font-medium">{zone.label}</span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
          active && zone.available
            ? "bg-white/18 text-white"
            : zone.available
              ? "bg-primary-soft text-primary"
              : "bg-card text-navy-soft"
        }`}
      >
        {zone.available ? "เลือกได้" : "กำลังพัฒนา"}
      </span>
    </button>
  );
}

function BackShape({ selectedZone }: { selectedZone: BackZoneId | null }) {
  const isActive = (id: BackZoneId) => selectedZone === id;

  return (
    <svg
      viewBox="0 0 180 360"
      role="img"
      aria-label="แผนภาพร่างกายด้านหลัง"
      className="h-full w-full"
    >
      <circle cx="90" cy="34" r="20" fill="#e8f6f2" stroke="#c9ded8" strokeWidth="3" />
      <path
        d="M66 66 C74 58 106 58 114 66 L126 160 C128 181 116 198 108 212 L104 307 C104 319 97 327 90 327 C83 327 76 319 76 307 L72 212 C64 198 52 181 54 160 Z"
        fill="#eef8f5"
        stroke="#c9ded8"
        strokeWidth="3"
      />
      <path
        d="M60 78 C43 100 34 136 30 174"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="13"
      />
      <path
        d="M120 78 C137 100 146 136 150 174"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="13"
      />
      <path
        d="M77 210 C66 240 60 284 57 330"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <path
        d="M103 210 C114 240 120 284 123 330"
        fill="none"
        stroke="#c9ded8"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <rect
        x="66"
        y="79"
        width="48"
        height="48"
        rx="18"
        fill={isActive("upper_back") ? "#0fb5a8" : "#d9eee9"}
        opacity={isActive("upper_back") ? "0.34" : "0.18"}
      />
      <rect
        x="65"
        y="127"
        width="50"
        height="50"
        rx="18"
        fill={isActive("mid_back") ? "#0fb5a8" : "#d9eee9"}
        opacity={isActive("mid_back") ? "0.34" : "0.18"}
      />
      <rect
        x="62"
        y="174"
        width="56"
        height="54"
        rx="20"
        fill={isActive("lower_back") || isActive("lower_back_hip") ? "#0fb5a8" : "#d9eee9"}
        opacity={isActive("lower_back") || isActive("lower_back_hip") ? "0.42" : "0.22"}
      />
      <path
        d="M70 199 C78 205 102 205 110 199"
        fill="none"
        stroke={isActive("lower_back") || isActive("lower_back_hip") ? "#0fb5a8" : "#c9ded8"}
        strokeLinecap="round"
        strokeWidth="7"
        opacity="0.82"
      />
      <ellipse
        cx="90"
        cy="245"
        rx="32"
        ry="26"
        fill={isActive("tailbone_pelvis") || isActive("lower_back_hip") ? "#0fb5a8" : "#d9eee9"}
        opacity={isActive("tailbone_pelvis") || isActive("lower_back_hip") ? "0.3" : "0.16"}
      />
    </svg>
  );
}

function ComingSoonModal({ region, onClose }: { region: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/35 px-4 pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      <div className="w-full max-w-sm rounded-[28px] border border-border bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">{region}</p>
            <h2 id="coming-soon-title" className="mt-1 text-lg font-bold text-navy">
              กำลังพัฒนา
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
          เวอร์ชันนี้ประเมินละเอียดเฉพาะอาการปวดหลังล่างก่อน หากมีอาการรุนแรงหรือไม่แน่ใจ
          ควรพบผู้เชี่ยวชาญ
        </p>
        <Button full size="lg" className="mt-5" onClick={onClose}>
          เข้าใจแล้ว
        </Button>
      </div>
    </div>
  );
}
