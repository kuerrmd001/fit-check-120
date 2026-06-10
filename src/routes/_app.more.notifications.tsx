import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_app/more/notifications")({ component: Page });

const NOTIFS = [
  { id: "1", title: "ติดตามอาการของคุณ", body: "ผ่านมา 24 ชั่วโมงแล้ว ลองประเมินซ้ำ", time: "1 ชม. ที่แล้ว" },
  { id: "2", title: "บทความใหม่", body: "กลับไปวิ่งอย่างไรไม่ให้ปวดหลังซ้ำ", time: "วานนี้" },
];

function Page() {
  return (
    <>
      <AppHeader title="การแจ้งเตือน" back />
      <div className="flex-1 space-y-2 px-4 pb-6">
        {NOTIFS.length === 0 ? (
          <EmptyState icon={<Bell className="h-6 w-6" />} title="ยังไม่มีการแจ้งเตือน" />
        ) : NOTIFS.map((n) => (
          <Card key={n.id}>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{n.title}</p>
                <p className="text-sm text-navy-soft">{n.body}</p>
                <p className="mt-1 text-xs text-navy-soft">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
