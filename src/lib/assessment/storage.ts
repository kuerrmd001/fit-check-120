import type { AssessmentRecord, FollowupRecord } from "./types";

const KEYS = {
  assessments: "fc.assessments",
  consent: "fc.consent",
  auth: "fc.auth",
  profile: "fc.profile",
  settings: "fc.settings",
  saved: "fc.saved",
  notifications: "fc.notifications",
  draft: "fc.draft",
};

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

export const store = {
  getAssessments: (): AssessmentRecord[] => read(KEYS.assessments, []),
  saveAssessment: (a: AssessmentRecord) => {
    const list = store.getAssessments();
    list.unshift(a);
    write(KEYS.assessments, list);
  },
  getAssessment: (id: string) => store.getAssessments().find((a) => a.id === id),
  deleteAssessment: (id: string) => {
    const list = store.getAssessments().filter((a) => a.id !== id);
    write(KEYS.assessments, list);
  },
  addFollowup: (assessmentId: string, f: FollowupRecord) => {
    const list = store.getAssessments();
    const a = list.find((x) => x.id === assessmentId);
    if (a) {
      a.followups.unshift(f);
      write(KEYS.assessments, list);
    }
  },
  deleteAll: () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },

  getConsent: () => read<boolean>(KEYS.consent, false),
  setConsent: (v: boolean) => write(KEYS.consent, v),

  getAuth: () => read<{ mode: "guest" | "user"; name?: string } | null>(KEYS.auth, null),
  setAuth: (v: { mode: "guest" | "user"; name?: string } | null) => write(KEYS.auth, v),

  getProfile: () =>
    read(KEYS.profile, {
      nickname: "ผู้ใช้",
      age: 21,
      sex: "ไม่ระบุ",
      sport: "วิ่ง",
    }),
  setProfile: (v: unknown) => write(KEYS.profile, v),

  getSettings: () =>
    read(KEYS.settings, {
      notifications: true,
      reminderHours: 24,
      analytics: false,
    }),
  setSettings: (v: unknown) => write(KEYS.settings, v),

  getSaved: (): string[] => read(KEYS.saved, []),
  toggleSaved: (id: string) => {
    const s = new Set(store.getSaved());
    if (s.has(id)) s.delete(id);
    else s.add(id);
    write(KEYS.saved, Array.from(s));
  },
};

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (store.getAssessments().length === 0) {
    const sample: AssessmentRecord[] = [
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        painLocation: "lower-back",
        activity: "running",
        safety: {
          radiating: "no",
          saddle: "no",
          bladder: "no",
          trauma: "no",
          severe: "no",
        },
        details: { onset: "หลังเพิ่มระยะวิ่ง" },
        common: {
          painLevel: 4,
          activityImpact: 1,
          dailyImpact: 1,
          restResponse: 0,
          loadIncrease: true,
          radiatingMild: false,
        },
        risk: "yellow",
        score: 5,
        followups: [],
      },
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        painLocation: "lower-back",
        activity: "weights",
        safety: {
          radiating: "no",
          saddle: "no",
          bladder: "no",
          trauma: "no",
          severe: "no",
        },
        details: { exercise: "Deadlift" },
        common: {
          painLevel: 2,
          activityImpact: 0,
          dailyImpact: 0,
          restResponse: 0,
          loadIncrease: false,
          radiatingMild: false,
        },
        risk: "green",
        score: 0,
        followups: [],
      },
    ];
    sample.forEach(store.saveAssessment);
  }
}
