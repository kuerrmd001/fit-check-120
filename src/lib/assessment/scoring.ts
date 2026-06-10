import type {
  AssessmentRecord,
  CommonAnswers,
  RiskLevel,
  SafetyAnswers,
} from "./types";

export function painPoints(pain: number): number {
  if (pain <= 2) return 0;
  if (pain <= 4) return 1;
  if (pain <= 6) return 2;
  return 3;
}

export function hasRedFlag(s: SafetyAnswers): boolean {
  // Any "yes" on serious items, or "unsure" on saddle/bladder/trauma => red flag
  if (s.saddle !== "no") return true;
  if (s.bladder !== "no") return true;
  if (s.trauma === "yes") return true;
  if (s.severe === "yes") return true;
  if (s.radiating === "yes") return true;
  // unsure on radiating/trauma/severe -> caution but not auto red unless combined
  const unsureCount = [s.radiating, s.trauma, s.severe].filter(
    (v) => v === "unsure",
  ).length;
  return unsureCount >= 2;
}

export function computeRisk(
  safety: SafetyAnswers,
  common: CommonAnswers,
  unsureCount: number,
): { risk: RiskLevel; score: number } {
  if (hasRedFlag(safety)) return { risk: "red", score: 99 };

  let score = 0;
  score += painPoints(common.painLevel);
  score += common.activityImpact;
  score += common.dailyImpact;
  score += common.restResponse;
  if (common.loadIncrease) score += 1;
  if (common.radiatingMild) score += 2;

  // Many "unsure" answers should prevent classifying as green
  const blockGreen = unsureCount >= 3;

  let risk: RiskLevel;
  if (score >= 8 || common.painLevel >= 8) risk = "red";
  else if (score >= 4 || blockGreen) risk = "yellow";
  else risk = "green";

  return { risk, score };
}

export function newAssessment(
  partial: Omit<AssessmentRecord, "id" | "createdAt" | "followups">,
): AssessmentRecord {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    followups: [],
    ...partial,
  };
}
