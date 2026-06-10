import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { OptionButton } from "@/components/OptionButton";
import { useDraft } from "@/lib/assessment/draft";
import type { ActivityType } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/activity")({ component: Page });

const OPTIONS: { v: ActivityType; label: string; hint: string }[] = [
  { v: "running", label: "วิ่ง / Cardio", hint: "วิ่ง จ๊อกกิ้ง ปั่นจักรยาน ฯลฯ" },
  { v: "weights", label: "Weight Training", hint: "ยกน้ำหนัก เล่นยิม" },
  { v: "unsure", label: "ไม่แน่ใจ", hint: "ไม่ทราบว่ากิจกรรมใดกระตุ้นอาการ" },
];

function Page() {
  const nav = useNavigate();
  const { activity, setActivity } = useDraft();
  const go = (a: ActivityType) => {
    setActivity(a);
    nav({ to: `/assess/questions/${a}` as "/assess/questions/$type", params: { type: a } });
  };
  return (
    <>
      <AppHeader title="ประเภทกิจกรรม" back />
      <ProgressSteps step={3} total={5} />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <p className="text-sm text-navy-soft">กิจกรรมใดที่เกี่ยวข้องกับอาการของคุณมากที่สุด?</p>
        {OPTIONS.map((o) => (
          <OptionButton key={o.v} selected={activity === o.v} onClick={() => go(o.v)} hint={o.hint}>
            {o.label}
          </OptionButton>
        ))}
      </div>
    </>
  );
}
