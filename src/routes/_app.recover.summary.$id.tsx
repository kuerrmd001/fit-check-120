import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { useState } from "react";
import { CalendarClock, CheckCircle2, HeartPulse, Save, TimerReset } from "lucide-react";

export const Route = createFileRoute("/_app/recover/summary/$id")({ component: Page });

const ACTIVITY_TITLE: Record<string, string> = {
  stretch: "ยืดเหยียดหลังล่าง",
  core: "แกนกลางลำตัวเบื้องต้น",
  mobility: "การเคลื่อนไหวสะโพก",
  walk: "เดินเบา ๆ",
  hipthrust: "กระตุ้นกล้ามเนื้อสะโพก",
};

function Page() {
  const { id } = useParams({ from: "/_app/recover/summary/$id" });
  const [feedback, setFeedback] = useState("เท่าเดิม");
  const [saved, setSaved] = useState(false);
  const title = ACTIVITY_TITLE[id] ?? "กิจกรรมขยับเบา ๆ";

  return (
    <>
      <AppHeader title="สรุปเซสชัน" subtitle={title} />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-7">
        <Card className="rounded-[30px] border-risk-green/20 bg-risk-green-soft/70 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-risk-green shadow-soft">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="mt-4 text-xs font-semibold text-risk-green">เสร็จสิ้น</p>
          <h1 className="mt-1 text-2xl font-bold text-navy">คุณทำเซสชันขยับเบา ๆ ครบแล้ว</h1>
          <p className="mt-2 text-sm leading-6 text-navy-soft">
            บันทึกความรู้สึกหลังทำ เพื่อใช้สังเกตแนวโน้มในการกลับไปขยับครั้งต่อไป
          </p>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "กิจกรรม", value: "1", icon: HeartPulse },
            { label: "เวลา", value: "ครบ", icon: TimerReset },
            { label: "ติดตาม", value: "24-48 ชม.", icon: CalendarClock },
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

        <Card className="rounded-[26px]">
          <p className="text-sm font-semibold text-navy">อาการหลังทำเป็นอย่างไร?</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["ดีขึ้น", "เท่าเดิม", "แย่ลง"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFeedback(t)}
                className={`rounded-2xl border px-2 py-3 text-xs font-semibold transition ${
                  feedback === t
                    ? "border-primary/30 bg-primary text-white"
                    : "border-border bg-card text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-navy-soft">
            หากเลือก “แย่ลง” ควรหยุดกิจกรรมที่กระตุ้นอาการและติดตามอาการอย่างใกล้ชิด
          </p>
        </Card>

        <Card className="rounded-[26px]">
          <h2 className="text-sm font-semibold text-navy">ขั้นตอนถัดไป</h2>
          <div className="mt-3 space-y-2 text-sm leading-6 text-navy-soft">
            <p>1. พักและสังเกตอาการหลังทำกิจกรรม</p>
            <p>2. บันทึกว่าอาการดีขึ้น เท่าเดิม หรือแย่ลง</p>
            <p>3. เลือกกิจกรรมครั้งถัดไปที่ไม่เพิ่มอาการ</p>
          </div>
        </Card>

        {saved && (
          <AlertBox tone="success" title="บันทึกแล้ว">
            บันทึกความรู้สึกหลังเซสชันไว้ในต้นแบบนี้แล้ว
          </AlertBox>
        )}

        <div className="space-y-2">
          <Button full size="lg" onClick={() => setSaved(true)}>
            <Save className="h-4 w-4" />
            บันทึกผลเซสชัน
          </Button>
          <Link
            to="/recover"
            className="flex w-full items-center justify-center rounded-2xl border border-border bg-white px-5 py-3.5 text-base font-medium text-navy shadow-soft"
          >
            กลับไปแนวทางขยับเบา ๆ
          </Link>
        </div>
      </div>
    </>
  );
}
