import type { ActivityType, AssessmentRecord, FollowupRecord, RiskLevel } from "./types";

const painLocationLabels: Record<string, string> = {
  "lower-back": "หลังล่าง",
  back: "หลัง",
  lower_back: "หลังล่าง",
  lower_back_hip: "หลังล่างร่วมกับสะโพก/ก้น",
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

const riskColorLabels: Record<RiskLevel, string> = {
  green: "เขียว",
  yellow: "เหลือง",
  red: "แดง",
};

const riskLevelLabels: Record<RiskLevel, string> = {
  green: "ต่ำ",
  yellow: "ปานกลาง",
  red: "สูง",
};

const followupTrendLabels = {
  better: "ดีขึ้น",
  same: "เท่าเดิม",
  slightly_worse: "แย่ลงเล็กน้อย",
  much_worse: "แย่ลงมาก",
} as const;

const returnedToExerciseLabels = {
  no: "ยัง",
  light: "กลับไปแบบเบา ๆ",
  same_as_before: "กลับไปเท่าเดิม",
  pain_returned: "กลับไปแล้วปวดซ้ำ",
} as const;

const dailyFunctionTrendLabels = {
  improved: "ลดลง",
  same: "เท่าเดิม",
  worse: "แย่ลง",
} as const;

function readString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function readNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readStringArray(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : undefined;
}

export function getActivityLabel(activity: ActivityType) {
  if (activity === "running") return "วิ่ง / คาร์ดิโอ";
  if (activity === "weights") return "Weight Training";
  return "ไม่แน่ใจ";
}

export function getPainLocationLabel(a: AssessmentRecord) {
  const detailValue =
    readString(a.details.painSubRegion) ??
    readString(a.details.primaryPainRegion) ??
    readString(a.details.painRegion) ??
    a.painLocation;
  return painLocationLabels[detailValue] ?? "ไม่ได้ระบุ";
}

export function getPainScore(a: AssessmentRecord) {
  return readNumber(a.details.currentPainScore) ?? a.common.painLevel;
}

export function getPainSeverityLabel(a: AssessmentRecord) {
  const severity = readString(a.details.painSeverityLabel);
  return severity ? (painSeverityLabels[severity] ?? "ยังไม่ชัดเจน") : "ยังไม่ชัดเจน";
}

export function getRadiationLabel(a: AssessmentRecord) {
  const radiation = readString(a.details.radiation);
  return radiation ? (radiationLabels[radiation] ?? "ยังไม่ชัดเจน") : "ไม่ได้ระบุ";
}

export function getPrimaryTriggerLabel(a: AssessmentRecord) {
  const trigger = readString(a.details.primaryTrigger) ?? readString(a.details.exercise);
  if (!trigger) return "ยังไม่ชัดเจน";
  return triggerLabels[trigger] ?? trigger;
}

export function getTriggerLabels(a: AssessmentRecord) {
  const triggers = readStringArray(a.details.triggers);
  if (triggers?.length) return triggers.map((trigger) => triggerLabels[trigger] ?? trigger);

  const legacyExercise = readString(a.details.exercise);
  if (legacyExercise) return [triggerLabels[legacyExercise] ?? legacyExercise];

  return [];
}

export function getRiskColorLabel(level: RiskLevel) {
  return riskColorLabels[level];
}

export function getRiskLevelLabel(level: RiskLevel) {
  return riskLevelLabels[level];
}

export function getFollowupStatus(a: AssessmentRecord) {
  const latest = a.followups[0];
  if (!latest) return "รอติดตามอาการ";
  const trend = getFollowupTrendLabel(latest);
  if (trend === "ดีขึ้น") return "ติดตามแล้ว: ดีขึ้น";
  if (trend === "เท่าเดิม") return "ติดตามแล้ว: เท่าเดิม";
  return "ติดตามแล้ว: แย่ลง";
}

export function getFollowupTrendLabel(f: FollowupRecord) {
  if (f.symptomTrend) return followupTrendLabels[f.symptomTrend];
  if (f.trend === "better") return "ดีขึ้น";
  if (f.trend === "same") return "เท่าเดิม";
  return "แย่ลง";
}

export function getReturnedToExerciseLabel(f: FollowupRecord) {
  return f.returnedToExercise ? returnedToExerciseLabels[f.returnedToExercise] : "ไม่ได้ระบุ";
}

export function getDailyFunctionTrendLabel(f: FollowupRecord) {
  return f.dailyFunctionTrend ? dailyFunctionTrendLabels[f.dailyFunctionTrend] : "ไม่ได้ระบุ";
}

export function getFollowupResultCopy(f: FollowupRecord) {
  if (f.symptomTrend === "much_worse" || f.returnedToExercise === "pain_returned") {
    return "อาการแย่ลงจากครั้งก่อน ควรหยุดกิจกรรมที่กระตุ้นอาการ และพบผู้เชี่ยวชาญหากอาการรุนแรงขึ้น มีอาการร้าว ชา อ่อนแรง หรือไม่แน่ใจ";
  }
  if (f.symptomTrend === "slightly_worse" || f.trend === "worse") {
    return "อาการแย่ลงเล็กน้อย ควรลดหรือหยุดกิจกรรมที่กระตุ้นอาการชั่วคราว และประเมินซ้ำ หากอาการยังแย่ลงควรพบผู้เชี่ยวชาญ";
  }
  if (f.symptomTrend === "same" || f.trend === "same") {
    return "อาการยังใกล้เคียงเดิม ควรพักหรือปรับกิจกรรมต่อ และติดตามอาการอีกครั้ง หากไม่ดีขึ้นหรือรบกวนชีวิตประจำวัน ควรพบผู้เชี่ยวชาญ";
  }
  return "อาการมีแนวโน้มดีขึ้น สามารถค่อย ๆ เพิ่มกิจกรรมอย่างระมัดระวังได้ โดยหลีกเลี่ยงการเพิ่มความหนักเร็วเกินไป";
}

export function getMostCommonPrimaryTrigger(list: AssessmentRecord[]) {
  const counts = new Map<string, number>();
  list.forEach((a) => {
    const label = getPrimaryTriggerLabel(a);
    if (label === "ยังไม่ชัดเจน" || label === "ไม่แน่ใจ") return;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  });

  let best = "";
  let bestCount = 0;
  counts.forEach((count, label) => {
    if (count > bestCount) {
      best = label;
      bestCount = count;
    }
  });

  return best || "ยังไม่ชัดเจน";
}
