import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AlertTriangle, CalendarClock, ClipboardList, HeartPulse, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { AlertBox } from "@/components/AlertBox";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { RiskGauge } from "@/components/RiskGauge";
import { RISK_META } from "@/content/carePlans";
import { DISCLAIMER } from "@/content/disclaimer";
import { store } from "@/lib/assessment/storage";
import type { AssessmentRecord, RiskLevel } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/result/$id")({ component: Page });

const riskStyle: Record<
  RiskLevel,
  { card: string; text: string; pill: string; Icon: typeof HeartPulse }
> = {
  green: {
    card: "border-risk-green/20 bg-risk-green-soft/70",
    text: "text-risk-green",
    pill: "bg-white/80 text-risk-green",
    Icon: HeartPulse,
  },
  yellow: {
    card: "border-risk-yellow/25 bg-risk-yellow-soft/80",
    text: "text-risk-yellow",
    pill: "bg-white/80 text-risk-yellow",
    Icon: AlertTriangle,
  },
  red: {
    card: "border-risk-red/25 bg-risk-red-soft/85",
    text: "text-risk-red",
    pill: "bg-white/85 text-risk-red",
    Icon: ShieldAlert,
  },
};

const painLocationLabels: Record<string, string> = {
  "lower-back": "หลังล่าง",
  back: "หลัง",
  lower_back: "หลังล่าง",
  lower_back_hip: "หลังล่างร่วมกับสะโพก/ก้น",
  unknown: "ไม่แน่ใจ",
};

const radiationLabels: Record<string, string> = {
  none: "ไม่ร้าว",
  buttock: "ร้าวลงก้น",
  thigh: "ร้าวลงต้นขา",
  below_knee: "ร้าวลงต่ำกว่าเข่า",
  numbness_weakness: "มีชา/อ่อนแรง",
  unknown: "ไม่แน่ใจ",
};

const triggerLabels: Record<string, string> = {
  squat_leg_press: "Squat / Leg Press",
  deadlift_hinge: "Deadlift / Romanian Deadlift / Hip Hinge",
  hip_thrust_bridge: "Hip Thrust / Glute Bridge",
  row_pulling: "Row / Pulling exercise",
  overhead_press: "Overhead Press",
  core: "Core exercise เช่น plank / leg raise / sit-up",
  lunge_split_squat: "Lunge / Split squat",
  longer_run: "วิ่งนานขึ้น",
  faster_run: "วิ่งเร็วขึ้น",
  hill: "วิ่งขึ้นเนิน / ทางชัน",
  sprint_interval: "Sprint / Interval",
  treadmill: "วิ่งบนลู่",
  hard_surface: "วิ่งบนพื้นแข็ง",
  after_run: "หลังวิ่งเสร็จ",
  next_day: "วันถัดมา",
  squat: "สควอต (Squat)",
  deadlift: "เดดลิฟต์ (Deadlift)",
  rdl: "โรมาเนียนเดดลิฟต์ (Romanian Deadlift)",
  ohp: "โอเวอร์เฮดเพรส (Overhead Press)",
  bench: "เบนช์เพรส (Bench Press)",
  row: "โรว์ (Row)",
  hipthrust: "ฮิปทรัสต์ (Hip Thrust)",
  legpress: "เลกเพรส (Leg Press)",
  plank: "แพลงก์ (Plank)",
  legraise: "เลกเรส (Leg Raise)",
  situp: "ซิตอัป (Sit-up)",
  unknown: "ไม่แน่ใจ",
};

const painSeverityLabels: Record<string, string> = {
  none: "ไม่ปวด",
  mild: "ปวดน้อย",
  moderate_low: "ปวดพอรำคาญ",
  moderate_high: "ปวดชัดเจน",
  severe: "ปวดมาก / ต้องลดกิจกรรม",
  very_severe: "ปวดมากที่สุด / ใช้ชีวิตลำบาก",
};

function readString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function readNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function activityLabel(activity: AssessmentRecord["activity"]) {
  if (activity === "running") return "วิ่ง / คาร์ดิโอ";
  if (activity === "weights") return "เวทเทรนนิ่ง";
  return "ไม่แน่ใจ";
}

function getPainLocationLabel(a: AssessmentRecord) {
  const detailValue =
    readString(a.details.painSubRegion) ??
    readString(a.details.primaryPainRegion) ??
    readString(a.details.painRegion) ??
    a.painLocation;
  return painLocationLabels[detailValue] ?? "ไม่ได้ระบุ";
}

function getPainScore(a: AssessmentRecord) {
  return readNumber(a.details.currentPainScore) ?? a.common.painLevel;
}

function getPainSeverity(a: AssessmentRecord) {
  const severity = readString(a.details.painSeverityLabel);
  return severity ? (painSeverityLabels[severity] ?? "ยังไม่ชัดเจน") : "ยังไม่ชัดเจน";
}

function getRadiationLabel(a: AssessmentRecord) {
  const radiation = readString(a.details.radiation);
  return radiation ? (radiationLabels[radiation] ?? "ยังไม่ชัดเจน") : "ไม่ได้ระบุ";
}

function getRadiationNote(a: AssessmentRecord) {
  const radiation = readString(a.details.radiation);
  if (radiation === "none") return "ยังไม่ได้ระบุอาการร้าวชัดเจน";
  if (radiation === "buttock" || radiation === "thigh" || radiation === "below_knee") {
    return "มีอาการร้าวร่วมด้วย ควรติดตามอาการอย่างระมัดระวัง";
  }
  if (radiation === "numbness_weakness" || radiation === "unknown") {
    return "ควรตอบคำถามด้านความปลอดภัยตามจริง และพบผู้เชี่ยวชาญหากอาการชัดเจนหรือแย่ลง";
  }
  return "ข้อมูลอาการร้าวยังไม่ครบ";
}

function getPrimaryTriggerLabel(a: AssessmentRecord) {
  const trigger = readString(a.details.primaryTrigger) ?? readString(a.details.exercise);
  if (!trigger) return undefined;
  return triggerLabels[trigger] ?? trigger;
}

function getTriggerSentence(a: AssessmentRecord) {
  const primaryTrigger = getPrimaryTriggerLabel(a);
  if (a.activity === "weights") {
    return primaryTrigger
      ? `อาการอาจสัมพันธ์กับ Weight Training โดยท่าที่กระตุ้นอาการมากที่สุดคือ ${primaryTrigger}`
      : "อาการอาจสัมพันธ์กับ Weight Training แต่ยังไม่ได้ระบุท่าที่กระตุ้นอาการชัดเจน";
  }
  if (a.activity === "running") {
    return primaryTrigger
      ? `อาการอาจสัมพันธ์กับการวิ่ง โดยสถานการณ์ที่ทำให้อาการชัดที่สุดคือ ${primaryTrigger}`
      : "อาการอาจสัมพันธ์กับการวิ่ง แต่ยังไม่ได้ระบุสถานการณ์ที่กระตุ้นอาการชัดเจน";
  }
  return "กิจกรรมที่เกี่ยวข้องยังไม่ชัดเจน จึงควรใช้ผลนี้เป็นแนวทางเบื้องต้นและติดตามอาการต่อ";
}

function riskSummary(level: RiskLevel) {
  if (level === "green") {
    return "จากคำตอบของคุณ ยังไม่พบสัญญาณที่ควรระวังชัดเจน อาการปวดอยู่ในระดับน้อยหรือยังไม่กระทบกิจกรรมมากนัก สามารถดูแลเบื้องต้น ลดความหนักชั่วคราว และสังเกตอาการได้ หากอาการปวดเพิ่มขึ้นหรือมีอาการใหม่ ควรประเมินซ้ำหรือพบผู้เชี่ยวชาญ";
  }
  if (level === "yellow") {
    return "จากคำตอบของคุณ อาการอยู่ในระดับที่ควรพักหรือปรับกิจกรรมชั่วคราว โดยเฉพาะกิจกรรมหรือท่าที่กระตุ้นอาการมากที่สุด ควรลด load / ลดความหนัก / หลีกเลี่ยงสิ่งที่กระตุ้นอาการ และติดตามอาการใน 24–48 ชั่วโมง หากอาการแย่ลงหรือมีอาการร้าว ชา หรืออ่อนแรง ควรพบผู้เชี่ยวชาญ";
  }
  return "คำตอบของคุณมีอาการที่ควรได้รับการประเมินจากผู้เชี่ยวชาญ Fit Check ไม่สามารถประเมินแทนแพทย์ได้ กรุณาหยุดออกกำลังกายและติดต่อแพทย์ นักกายภาพบำบัด หรือหน่วยบริการสุขภาพตามความเหมาะสม";
}

function impactLabel(value: 0 | 1 | 2 | 3) {
  if (value === 0) return "ยังไม่กระทบมาก";
  if (value === 1) return "กระทบเล็กน้อย";
  if (value === 2) return "กระทบปานกลาง";
  return "กระทบมาก";
}

function Page() {
  const { id } = useParams({ from: "/_app/assess/result/$id" });
  const [a, setA] = useState<AssessmentRecord | undefined>();
  useEffect(() => setA(store.getAssessment(id)), [id]);
  if (!a) return null;

  const meta = RISK_META[a.risk];
  const style = riskStyle[a.risk];
  const Icon = style.Icon;
  const tone = a.risk === "green" ? "success" : a.risk === "yellow" ? "warning" : "danger";
  const painScore = getPainScore(a);
  const painLocation = getPainLocationLabel(a);
  const radiationLabel = getRadiationLabel(a);

  return (
    <>
      <AppHeader title="ผลการประเมิน" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card
          className={`rounded-[30px] p-5 text-center shadow-[0_22px_54px_-36px_oklch(0.35_0.08_210)] ${style.card}`}
        >
          <div
            className={`mx-auto mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${style.pill}`}
          >
            <Icon className="h-4 w-4" />
            ผลสรุประดับความเสี่ยง
          </div>
          <RiskGauge level={a.risk} score={a.score} />
          <h2 className={`mt-3 text-2xl font-bold ${style.text}`}>{meta.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy">{meta.tone}</p>
        </Card>

        <AlertBox tone={tone} title={a.risk === "green" ? "คำแนะนำเบื้องต้น" : "ข้อควรระวัง"}>
          {riskSummary(a.risk)}
        </AlertBox>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-navy">สรุปจากคำตอบของคุณ</h3>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-navy-soft">
            <p>
              จากคำตอบของคุณ ตำแหน่งที่ปวดคือ{" "}
              <span className="font-semibold text-navy">{painLocation}</span> ระดับปวดประมาณ{" "}
              <span className="font-semibold text-navy">{painScore}/10</span>{" "}
              <span className="font-semibold text-navy">({getPainSeverity(a)})</span>
            </p>
            <p>
              อาการร้าว: <span className="font-semibold text-navy">{radiationLabel}</span> —{" "}
              {getRadiationNote(a)}
            </p>
            <p>
              กิจกรรมที่เกี่ยวข้อง:{" "}
              <span className="font-semibold text-navy">{activityLabel(a.activity)}</span>
            </p>
            <p>{getTriggerSentence(a)}</p>
            <p>
              ผลกระทบต่อกิจกรรม: {impactLabel(a.common.activityImpact)} และผลกระทบต่อชีวิตประจำวัน:{" "}
              {impactLabel(a.common.dailyImpact)}
            </p>
            <p className="rounded-[20px] bg-muted/70 px-4 py-3 text-xs font-semibold text-navy-soft">
              ผลนี้ไม่ใช่การวินิจฉัยโรค และควรใช้เป็นแนวทางเบื้องต้นร่วมกับการสังเกตอาการของตัวเอง
            </p>
          </div>
        </Card>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold text-navy">ข้อมูลการประเมิน</h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5 text-sm">
            <div className="rounded-[20px] bg-muted/70 p-3">
              <p className="text-xs text-navy-soft">ตำแหน่ง</p>
              <p className="mt-1 font-semibold text-navy">{painLocation}</p>
            </div>
            <div className="rounded-[20px] bg-muted/70 p-3">
              <p className="text-xs text-navy-soft">กิจกรรม</p>
              <p className="mt-1 font-semibold text-navy">{activityLabel(a.activity)}</p>
            </div>
            <div className="rounded-[20px] bg-muted/70 p-3">
              <p className="text-xs text-navy-soft">ระดับปวด</p>
              <p className="mt-1 font-semibold text-navy">{painScore}/10</p>
            </div>
            <div className="rounded-[20px] bg-muted/70 p-3">
              <p className="text-xs text-navy-soft">คะแนนรวม</p>
              <p className="mt-1 font-semibold text-navy">{a.score}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <CalendarClock className={`mt-0.5 h-5 w-5 ${style.text}`} />
            <div>
              <h3 className="text-sm font-semibold text-navy">ขั้นตอนถัดไป</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                {a.risk === "red"
                  ? "ให้ความสำคัญกับการประเมินจากผู้เชี่ยวชาญ และหลีกเลี่ยงการฝืนกิจกรรมที่กระตุ้นอาการ"
                  : "ใช้คำแนะนำเบื้องต้นร่วมกับการพัก/ปรับกิจกรรม และติดตามอาการใน 24–48 ชั่วโมง"}
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Link to="/assess/care-plan/$id" params={{ id: a.id }}>
            <Button full size="lg" variant={a.risk === "red" ? "danger" : "primary"}>
              {a.risk === "red" ? "ดูอาการที่ควรพบผู้เชี่ยวชาญ" : "ดูคำแนะนำการดูแลเบื้องต้น"}
            </Button>
          </Link>
          {a.risk !== "red" && (
            <Link to="/assess/followup/$id" params={{ id: a.id }}>
              <Button full variant="outline">
                ตั้งเตือนติดตามอาการ 24–48 ชั่วโมง
              </Button>
            </Link>
          )}
          <Card className="rounded-[22px] border-primary/15 bg-primary-soft/50 p-4 text-sm font-semibold text-navy">
            บันทึกผลประเมินแล้วในประวัติ
          </Card>
          {a.risk === "red" && (
            <Card className="rounded-[22px] border-risk-red/25 bg-risk-red-soft/70 p-4 text-sm leading-6 text-navy">
              หากอาการรุนแรงขึ้น มีชา/อ่อนแรงชัดเจน หรือควบคุมการขับถ่ายผิดปกติ ควรติดต่อแพทย์
              นักกายภาพบำบัด หรือหน่วยบริการสุขภาพตามความเหมาะสม
            </Card>
          )}
          <Link to="/home">
            <Button full variant="ghost">
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>

        <p className="text-xs text-navy-soft">{DISCLAIMER}</p>
      </div>
    </>
  );
}
