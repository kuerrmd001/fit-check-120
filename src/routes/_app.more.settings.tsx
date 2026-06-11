import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronRight,
  Database,
  Languages,
  Monitor,
  Moon,
  Palette,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";

export const Route = createFileRoute("/_app/more/settings")({ component: Page });

type Settings = ReturnType<typeof store.getSettings>;
type Appearance = "light" | "dark" | "system";
type Language = "th" | "en";

const APPEARANCE_KEY = "fc.appearance";
const LANGUAGE_KEY = "fc.language";

const DEFAULT_SETTINGS: Settings = {
  notifications: true,
  reminderHours: 24,
  analytics: false,
};

const APPEARANCE_OPTIONS = [
  {
    value: "light",
    label: "Light mode",
    detail: "พื้นหลังสว่าง อ่านง่าย",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark mode",
    detail: "ลดแสงจ้าในที่มืด",
    icon: Moon,
  },
  {
    value: "system",
    label: "System preference",
    detail: "ตามการตั้งค่าของอุปกรณ์",
    icon: Monitor,
  },
] as const;

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

function saveAppearance(mode: Appearance) {
  if (typeof window === "undefined") return;
  localStorage.setItem(APPEARANCE_KEY, mode);
  applyAppearance(mode);
  window.dispatchEvent(new Event("fitcheck-appearance-change"));
}

function readLanguage(): Language {
  if (typeof window === "undefined") return "th";
  return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "th";
}

function saveLanguage(language: Language) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANGUAGE_KEY, language);
}

function Page() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [appearance, setAppearance] = useState<Appearance>("light");
  const [language, setLanguage] = useState<Language>("th");

  useEffect(() => {
    setSettings(store.getSettings());
    const savedAppearance = readAppearance();
    setAppearance(savedAppearance);
    applyAppearance(savedAppearance);
    setLanguage(readLanguage());
  }, []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    store.setSettings(next);
  };

  const updateAppearance = (value: Appearance) => {
    setAppearance(value);
    saveAppearance(value);
  };

  const updateLanguage = (value: Language) => {
    setLanguage(value);
    saveLanguage(value);
  };

  return (
    <>
      <AppHeader title="การตั้งค่า" subtitle="ปรับประสบการณ์ใช้งานและความเป็นส่วนตัว" back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <p className="text-base font-bold text-navy">ตั้งค่าประสบการณ์ Fit Check</p>
          <p className="mt-1 text-sm leading-6 text-navy-soft">
            เลือกรูปแบบหน้าจอ ภาษา การแจ้งเตือน และการจัดการข้อมูลในที่เดียว
          </p>
        </Card>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">การแสดงผล</p>
          <Card className="space-y-3 rounded-[28px]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Palette className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Appearance</p>
                <p className="mt-0.5 text-xs leading-5 text-navy-soft">
                  ค่าเริ่มต้นคือ Light mode และจะบันทึกไว้ในเครื่องนี้
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              {APPEARANCE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const active = appearance === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateAppearance(option.value)}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-primary/30 bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card text-navy hover:border-primary/30"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span
                        className={`block text-xs ${active ? "text-primary-foreground/80" : "text-navy-soft"}`}
                      >
                        {option.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">ภาษา</p>
          <Card className="space-y-3 rounded-[28px]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Languages className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">เลือกภาษา</p>
                <p className="mt-0.5 text-xs leading-5 text-navy-soft">
                  ภาษาไทยยังเป็นภาษาหลักของเนื้อหาสุขภาพและการประเมิน
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "th" as const, label: "ไทย" },
                { value: "en" as const, label: "English" },
              ].map((option) => {
                const active = language === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateLanguage(option.value)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "border-primary/30 bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card text-navy hover:border-primary/30"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {language === "en" && (
              <div className="rounded-2xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm font-semibold text-navy">
                English version coming soon
              </div>
            )}
          </Card>
        </section>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">การแจ้งเตือน</p>
          <Card className="space-y-4 rounded-[28px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Bell className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">เปิดการแจ้งเตือน</p>
                  <p className="text-xs leading-5 text-navy-soft">
                    ใช้สำหรับติดตามอาการและเตือนพักฟื้นตามเวลาที่เลือก
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(event) => update("notifications", event.target.checked)}
                className="h-5 w-5 shrink-0 accent-[oklch(0.68_0.13_180)]"
              />
            </div>

            <div className="rounded-2xl bg-muted/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-navy">เตือนติดตามอาการ</p>
                <p className="text-sm font-bold text-primary">{settings.reminderHours} ชม.</p>
              </div>
              <input
                type="range"
                min={12}
                max={72}
                step={12}
                value={settings.reminderHours}
                onChange={(event) => update("reminderHours", Number(event.target.value))}
                className="mt-3 w-full accent-[oklch(0.68_0.13_180)]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-navy-soft">
                <span>12 ชม.</span>
                <span>72 ชม.</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold text-navy-soft">ความเป็นส่วนตัวและข้อมูล</p>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <Link
              to="/more/privacy"
              className="flex items-center gap-3 border-b border-border px-4 py-3.5 transition hover:bg-muted"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Shield className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-navy">นโยบายความเป็นส่วนตัว</span>
                <span className="mt-0.5 block text-xs leading-5 text-navy-soft">
                  อ่านเรื่องข้อมูลสุขภาพ ความยินยอม และสิทธิของคุณ
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-navy-soft" />
            </Link>

            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Database className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    ข้อมูลแบบไม่ระบุตัวตน
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-navy-soft">
                    ช่วยปรับปรุงแอปโดยไม่ผูกกับชื่อของคุณ
                  </span>
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={(event) => update("analytics", event.target.checked)}
                className="h-5 w-5 shrink-0 accent-[oklch(0.68_0.13_180)]"
              />
            </div>

            <Link
              to="/more/delete-account"
              className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-risk-red-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-risk-red-soft text-risk-red">
                <Trash2 className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-risk-red">ลบบัญชีและข้อมูล</span>
                <span className="mt-0.5 block text-xs leading-5 text-navy-soft">
                  จัดการข้อมูลที่เก็บอยู่ในเครื่องนี้
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-navy-soft" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
