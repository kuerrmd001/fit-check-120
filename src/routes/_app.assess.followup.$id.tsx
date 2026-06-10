import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { QuestionCard } from "@/components/QuestionCard";
import { OptionButton } from "@/components/OptionButton";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";
import { useState } from "react";
import type { FollowupTrend } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/assess/followup/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/assess/followup/$id" });
  const nav = useNavigate();
  const [trend, setTrend] = useState<FollowupTrend>("same");
  const [painChange, setPainChange] = useState<"down" | "same" | "up">("same");
  const [dailyOk, setDailyOk] = useState(true);
  const [followed, setFollowed] = useState(true);
  const [newSym, setNewSym] = useState(false);

  const submit = () => {
    store.addFollowup(id, {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      trend, painChange, dailyOk, followedPlan: followed, newSymptoms: newSym,
    });
    nav({ to: "/history/$id", params: { id }, replace: true });
  };

  return (
    <>
      <AppHeader title="ติดตามอาการ" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <QuestionCard number={1} total={5} question="อาการของคุณตั้งแต่ประเมินครั้งก่อนเป็นอย่างไร?">
          {(["better","same","worse"] as FollowupTrend[]).map((v) => (
            <OptionButton key={v} selected={trend===v} onClick={() => setTrend(v)}>
              {v === "better" ? "ดีขึ้น" : v === "same" ? "เท่าเดิม" : "แย่ลง"}
            </OptionButton>
          ))}
        </QuestionCard>
        <QuestionCard number={2} total={5} question="ความปวดวันนี้เทียบเมื่อก่อน">
          {(["down","same","up"] as const).map((v) => (
            <OptionButton key={v} selected={painChange===v} onClick={() => setPainChange(v)}>
              {v === "down" ? "ลดลง" : v === "same" ? "เท่าเดิม" : "เพิ่มขึ้น"}
            </OptionButton>
          ))}
        </QuestionCard>
        <QuestionCard number={3} total={5} question="ทำกิจกรรมประจำวันได้ตามปกติหรือไม่?">
          <OptionButton selected={dailyOk} onClick={() => setDailyOk(true)}>ใช่</OptionButton>
          <OptionButton selected={!dailyOk} onClick={() => setDailyOk(false)}>ไม่</OptionButton>
        </QuestionCard>
        <QuestionCard number={4} total={5} question="คุณทำตามแผนที่แนะนำหรือไม่?">
          <OptionButton selected={followed} onClick={() => setFollowed(true)}>ทำตาม</OptionButton>
          <OptionButton selected={!followed} onClick={() => setFollowed(false)}>ไม่ได้ทำ</OptionButton>
        </QuestionCard>
        <QuestionCard number={5} total={5} question="มีอาการใหม่ที่น่ากังวลหรือไม่?">
          <OptionButton selected={!newSym} onClick={() => setNewSym(false)}>ไม่มี</OptionButton>
          <OptionButton selected={newSym} onClick={() => setNewSym(true)} tone="danger">มี</OptionButton>
        </QuestionCard>
        <Button full size="lg" onClick={submit}>บันทึก</Button>
      </div>
    </>
  );
}
