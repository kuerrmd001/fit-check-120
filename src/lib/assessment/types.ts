export type SafetyAnswer = "no" | "unsure" | "yes";
export type RiskLevel = "green" | "yellow" | "red";
export type ActivityType = "running" | "weights" | "unsure";
export type FollowupTrend = "better" | "same" | "worse";
export type AssessmentDetailValue = string | number | boolean | string[];

export interface SafetyAnswers {
  radiating: SafetyAnswer;
  saddle: SafetyAnswer;
  bladder: SafetyAnswer;
  trauma: SafetyAnswer;
  severe: SafetyAnswer;
}

export interface CommonAnswers {
  painLevel: number; // 0-10
  activityImpact: 0 | 1 | 2 | 3;
  dailyImpact: 0 | 1 | 2 | 3;
  restResponse: 0 | 1 | 2 | 3;
  loadIncrease: boolean;
  radiatingMild: boolean;
}

export interface AssessmentRecord {
  id: string;
  createdAt: string;
  painLocation: "lower-back";
  activity: ActivityType;
  safety: SafetyAnswers;
  details: Record<string, AssessmentDetailValue>;
  common: CommonAnswers;
  risk: RiskLevel;
  score: number;
  followups: FollowupRecord[];
}

export interface FollowupRecord {
  id: string;
  createdAt: string;
  trend: FollowupTrend;
  painChange: "down" | "same" | "up";
  dailyOk: boolean;
  followedPlan: boolean;
  newSymptoms: boolean;
  notes?: string;
}
