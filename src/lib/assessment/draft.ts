import { create } from "zustand";
import type {
  ActivityType,
  CommonAnswers,
  SafetyAnswers,
} from "@/lib/assessment/types";

interface DraftState {
  painLocation: "lower-back" | null;
  safety: SafetyAnswers;
  activity: ActivityType | null;
  details: Record<string, string | number | boolean>;
  common: CommonAnswers;
  setSafety: (s: Partial<SafetyAnswers>) => void;
  setActivity: (a: ActivityType) => void;
  setDetail: (k: string, v: string | number | boolean) => void;
  setCommon: (c: Partial<CommonAnswers>) => void;
  reset: () => void;
}

const initialSafety: SafetyAnswers = {
  radiating: "no",
  saddle: "no",
  bladder: "no",
  trauma: "no",
  severe: "no",
};
const initialCommon: CommonAnswers = {
  painLevel: 3,
  activityImpact: 0,
  dailyImpact: 0,
  restResponse: 0,
  loadIncrease: false,
  radiatingMild: false,
};

export const useDraft = create<DraftState>((set) => ({
  painLocation: "lower-back",
  safety: initialSafety,
  activity: null,
  details: {},
  common: initialCommon,
  setSafety: (s) => set((st) => ({ safety: { ...st.safety, ...s } })),
  setActivity: (a) => set({ activity: a }),
  setDetail: (k, v) =>
    set((st) => ({ details: { ...st.details, [k]: v } })),
  setCommon: (c) => set((st) => ({ common: { ...st.common, ...c } })),
  reset: () =>
    set({
      painLocation: "lower-back",
      safety: initialSafety,
      activity: null,
      details: {},
      common: initialCommon,
    }),
}));
