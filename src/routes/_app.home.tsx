import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/RiskBadge";
import { store } from "@/lib/assessment/storage";
import {
  Activity,
  Bell,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  Info,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/home")({ component: Home });

function activityLabel(activity: AssessmentRecord["activity"]) {
  if (activity === "running") return "วิ่ง";
  if (activity === "weights") return "เวทเทรนนิง";
  return "ไม่แน่ใจ";
}

const RISK_EXPLANATIONS = [
  {
    label: "เขียว",
    title: "ติดตามต่อ",
    desc: "อาการดูไม่เข้ากับสัญญาณที่ควรระวัง แต่ยังควรสังเกตอาการ",
    className: "border-risk-green/25 bg-risk-green-soft text-risk-green",
  },
  {
    label: "เหลือง",
    title: "ลดความหนัก",
    desc: "ควรพัก ลดกิจกรรมที่กระตุ้น และติดตามอาการใน 24-48 ชั่วโมง",
    className: "border-risk-yellow/30 bg-risk-yellow-soft text-risk-yellow",
  },
  {
    label: "แดง",
    title: "พบผู้เชี่ยวชาญ",
    desc: "มีคำตอบที่ควรได้รับการประเมินเพิ่มเติมจากผู้เชี่ยวชาญ",
    className: "border-risk-red/25 bg-risk-red-soft text-risk-red",
  },
];

function Home() {
  const [list, setList] = useState<AssessmentRecord[]>([]);
  const [name, setName] = useState("ผู้ใช้");
  const [infoOpen, setInfoOpen] = useState(false);
  useEffect(() => {
    setList(store.getAssessments());
    const a = store.getAuth();
    if (a?.name) setName(a.name);
  }, []);
  const latest = list[0];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-7 pt-1">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-primary">Fit Check</p>
          <h1 className="text-2xl font-bold text-navy">สวัสดี {name}</h1>
          <p className="mt-1 text-sm text-navy-soft">
            วันนี้ลองเช็กอาการและแนวทางขยับเบา ๆ ของคุณกัน
          </p>
        </div>
        <Link
          to="/more/notifications"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-navy shadow-soft hover:bg-muted"
          aria-label="การแจ้งเตือน"
        >
          <Bell className="h-5 w-5" />
        </Link>
      </header>

      <Card className="relative overflow-hidden rounded-[30px] border-primary/20 bg-primary p-5 text-white">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
        <div className="relative">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold opacity-90">เริ่มประเมินอาการบาดเจ็บ</p>
          <h2 className="mt-1 text-2xl font-bold leading-tight">ประเมินอาการบาดเจ็บเบื้องต้น</h2>
          <p className="mt-2 text-sm leading-6 opacity-90">
            เครื่องมือคัดกรองเบื้องต้นจากการออกกำลังกาย
            เวอร์ชันต้นแบบนี้ประเมินอาการปวดหลังล่างได้ละเอียดก่อน
          </p>
          <div className="mt-4 grid gap-2">
            <Link
              to="/assess"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-primary shadow-soft"
            >
              เริ่มประเมินอาการ <ChevronRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/12 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              <Info className="h-4 w-4" />
              Fit Check ใช้ทำอะไร?
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 opacity-85">
            Fit Check ไม่ใช่การวินิจฉัยหรือการรักษาแทนแพทย์
          </p>
        </div>
      </Card>

      <section className="mt-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">สรุประดับผลประเมิน</h3>
        <div className="grid gap-2">
          {RISK_EXPLANATIONS.map((item) => (
            <div
              key={item.label}
              className={`rounded-[22px] border p-3 shadow-soft ${item.className}`}
            >
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-bold">
                  {item.label}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-navy-soft">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { label: "ประเมิน", value: `${list.length}`, icon: ClipboardCheck },
          { label: "ติดตาม", value: latest ? "24-48 ชม." : "เริ่มได้", icon: CalendarClock },
          { label: "ขยับ", value: "เบา ๆ", icon: HeartPulse },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-[22px] border border-border bg-white p-3 shadow-soft"
            >
              <Icon className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[11px] text-navy-soft">{item.label}</p>
              <p className="text-sm font-bold text-navy">{item.value}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="mb-2 text-sm font-semibold text-navy">การประเมินล่าสุด</h3>
          <Link to="/history" className="text-xs font-semibold text-primary">
            ดูทั้งหมด
          </Link>
        </div>

        {latest ? (
          <Link to="/history/$id" params={{ id: latest.id }}>
            <Card className="rounded-[26px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <RiskBadge level={latest.risk} />
                  <h4 className="mt-3 text-base font-bold text-navy">
                    อาการล่าสุดจาก {activityLabel(latest.activity)}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-navy-soft">
                    {new Date(latest.createdAt).toLocaleDateString("th-TH")} · คะแนน {latest.score}
                  </p>
                </div>
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-navy-soft" />
              </div>
            </Card>
          </Link>
        ) : (
          <Card className="rounded-[26px] border-dashed bg-muted/35">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-navy">ยังไม่มีประวัติการประเมิน</h4>
                <p className="mt-1 text-xs leading-5 text-navy-soft">
                  เริ่มประเมินครั้งแรกเพื่อดูสรุปความเสี่ยงและแผนติดตามอาการ
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>

      <section className="mt-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">ติดตามอาการ</h3>
        <Card className="rounded-[26px] border-risk-yellow/25 bg-risk-yellow-soft/70">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-risk-yellow shadow-soft">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-navy">
                {latest ? "อย่าลืมติดตามอาการหลังประเมิน" : "เมื่อมีผลประเมินแล้ว ให้ติดตามอาการ"}
              </h4>
              <p className="mt-1 text-xs leading-5 text-navy-soft">
                ใช้การติดตามใน 24-48 ชั่วโมงเพื่อดูว่าอาการดีขึ้น เท่าเดิม หรือแย่ลง
              </p>
              {latest && (
                <Link
                  to="/assess/followup/$id"
                  params={{ id: latest.id }}
                  className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-navy shadow-soft"
                >
                  ไปติดตามอาการ <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </Card>
      </section>

      <h3 className="mt-5 mb-2 text-sm font-semibold text-navy">ทางลัด</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            to: "/recover" as const,
            icon: HeartPulse,
            label: "ขยับเบา ๆ",
            desc: "กิจกรรมเบา ๆ",
          },
          { to: "/guide" as const, icon: BookOpen, label: "คู่มือ", desc: "อ่านคำแนะนำ" },
          {
            to: "/history/progress" as const,
            icon: TrendingUp,
            label: "พัฒนาการ",
            desc: "ดูแนวโน้ม",
          },
          {
            to: "/more" as const,
            icon: ShieldCheck,
            label: "ข้อมูลของฉัน",
            desc: "ตั้งค่าและความเป็นส่วนตัว",
          },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to}>
              <Card className="min-h-32 rounded-[26px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-3 block text-sm font-semibold text-navy">{t.label}</span>
                <span className="mt-1 block text-xs text-navy-soft">{t.desc}</span>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-[24px] bg-primary-soft px-4 py-3 text-xs leading-5 text-navy">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>Fit Check ให้ข้อมูลทั่วไปเท่านั้น ไม่ใช่การวินิจฉัยหรือการรักษาแทนแพทย์</span>
      </div>

      {infoOpen && <FitCheckInfoModal onClose={() => setInfoOpen(false)} />}
    </div>
  );
}

function FitCheckInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/35 px-4 pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fit-check-info-title"
    >
      <div className="w-full max-w-sm rounded-[28px] border border-border bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">Fit Check</p>
            <h2 id="fit-check-info-title" className="mt-1 text-lg font-bold text-navy">
              Fit Check ใช้ทำอะไร?
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
          Fit Check ไม่ได้ใช้แทนแพทย์ แต่ช่วยประเมินอาการเบื้องต้นจากคำตอบของคุณ
          เพื่อช่วยให้ตัดสินใจได้ว่าอาการควรดูแลเบื้องต้น พักและติดตาม หรือควรพบผู้เชี่ยวชาญ
          หากมีอาการรุนแรงหรือไม่แน่ใจ ควรติดต่อแพทย์หรือนักกายภาพบำบัด
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-soft"
        >
          เข้าใจแล้ว
        </button>
      </div>
    </div>
  );
}
