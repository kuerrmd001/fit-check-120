import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Bell, BookOpen, CalendarClock, HeartPulse, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_app/more/notifications")({ component: Page });

const NOTIFS = [
  {
    id: "1",
    title: "ติดตามอาการของคุณ",
    body: "ผ่านมา 24 ชั่วโมงแล้ว ลองบันทึกว่าอาการดีขึ้น เท่าเดิม หรือแย่ลง",
    time: "1 ชม. ที่แล้ว",
    kind: "followup",
    Icon: CalendarClock,
  },
  {
    id: "2",
    title: "เตือนพักฟื้น",
    body: "วันนี้ลองลดความหนักและสังเกตอาการหลังทำกิจกรรม",
    time: "วันนี้",
    kind: "recovery",
    Icon: HeartPulse,
  },
  {
    id: "3",
    title: "สัญญาณที่ควรระวัง",
    body: "หากมีอาการชา อ่อนแรง หรือควบคุมปัสสาวะลำบาก ควรหยุดกิจกรรมและพบผู้เชี่ยวชาญ",
    time: "เมื่อวาน",
    kind: "safety",
    Icon: ShieldAlert,
  },
  {
    id: "4",
    title: "บทความใหม่",
    body: "กลับไปวิ่งอย่างไรให้ค่อยเป็นค่อยไปและสังเกตอาการระหว่างทาง",
    time: "วานนี้",
    kind: "article",
    Icon: BookOpen,
  },
];

const TONES = {
  followup: "bg-primary-soft text-primary",
  recovery: "bg-risk-green-soft text-risk-green",
  safety: "bg-risk-yellow-soft text-risk-yellow",
  article: "bg-muted text-navy-soft",
};

function Page() {
  return (
    <>
      <AppHeader title="การแจ้งเตือน" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">การแจ้งเตือนเพื่อช่วยติดตาม</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                รวมการเตือนติดตามอาการ พักฟื้น สัญญาณที่ควรระวัง และบทความใหม่
              </p>
            </div>
          </div>
        </Card>

        {NOTIFS.length === 0 ? (
          <EmptyState icon={<Bell className="h-6 w-6" />} title="ยังไม่มีการแจ้งเตือน" />
        ) : (
          NOTIFS.map((n) => (
            <Card key={n.id}>
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                    TONES[n.kind as keyof typeof TONES]
                  }`}
                >
                  <n.Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{n.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-soft">{n.body}</p>
                  <p className="mt-1 text-xs text-navy-soft">{n.time}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
