import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { AlertBox } from "@/components/AlertBox";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Footprints,
  HeartPulse,
} from "lucide-react";

export const Route = createFileRoute("/_app/recover/")({ component: Page });

const ACTIVITIES = [
  {
    id: "stretch",
    title: "ยืดเหยียดหลังล่าง",
    duration: "5 นาที",
    level: "เบา",
    note: "เริ่มจากการหายใจและเคลื่อนไหวช้า ๆ",
  },
  {
    id: "core",
    title: "แกนกลางลำตัวเบื้องต้น",
    duration: "8 นาที",
    level: "ปานกลาง",
    note: "ฝึกควบคุมลำตัวโดยไม่กลั้นหายใจ",
  },
  {
    id: "mobility",
    title: "การเคลื่อนไหวสะโพก",
    duration: "6 นาที",
    level: "เบา",
    note: "ลดความตึงรอบสะโพกและหลังส่วนล่าง",
  },
  {
    id: "walk",
    title: "เดินเบา ๆ",
    duration: "15 นาที",
    level: "เบา",
    note: "เดินสบาย ๆ และสังเกตอาการระหว่างทาง",
  },
  {
    id: "hipthrust",
    title: "กระตุ้นกล้ามเนื้อสะโพก",
    duration: "10 นาที",
    level: "ปานกลาง",
    note: "เน้นใช้สะโพก ไม่ฝืนหลังส่วนล่าง",
  },
];

function Page() {
  return (
    <>
      <AppHeader title="แนวทางขยับเบา ๆ" subtitle="กิจกรรมทั่วไปและติดตามอาการอย่างระมัดระวัง" />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-7">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">แนวทางขยับเบา ๆ</p>
              <h1 className="mt-1 text-xl font-bold text-navy">ค่อย ๆ กลับไปขยับตามอาการ</h1>
              <p className="mt-2 text-sm leading-6 text-navy-soft">
                เลือกกิจกรรมเบา ๆ สังเกตอาการระหว่างทำ และหยุดทันทีหากปวดเพิ่มหรือมีอาการผิดปกติ
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "วันนี้", value: "1 แผน", icon: CalendarClock },
            { label: "ระดับ", value: "เบา", icon: Footprints },
            { label: "เป้าหมาย", value: "สังเกต", icon: CheckCircle2 },
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
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-navy">ภาพรวมความคืบหน้า</h2>
              <p className="text-xs text-navy-soft">ต้นแบบแสดงตัวอย่างการติดตาม</p>
            </div>
            <span className="rounded-full bg-risk-green-soft px-3 py-1 text-xs font-semibold text-risk-green">
              35%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[35%] rounded-full bg-primary" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-navy-soft">
            <div className="rounded-2xl bg-muted/60 p-3">
              <p className="font-semibold text-navy">ทำได้</p>
              <p className="mt-1">ยืดเหยียดเบา ๆ 2 ครั้ง</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-3">
              <p className="font-semibold text-navy">ขั้นต่อไป</p>
              <p className="mt-1">เลือกกิจกรรมที่ไม่เพิ่มอาการ</p>
            </div>
          </div>
        </Card>

        <AlertBox tone="warning" title="ข้อควรระวัง">
          หากอาการปวดเพิ่มขึ้น มีชา อ่อนแรง หรือรู้สึกผิดปกติระหว่างทำกิจกรรม
          ให้หยุดและพิจารณาพบผู้เชี่ยวชาญ
        </AlertBox>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy">กิจกรรมแนะนำ</h2>
            <span className="text-xs text-navy-soft">{ACTIVITIES.length} รายการ</span>
          </div>
          {ACTIVITIES.map((a) => (
            <Link key={a.id} to="/recover/activity/$id" params={{ id: a.id }}>
              <Card className="mb-3 flex items-center gap-3 rounded-[26px]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-navy">{a.title}</p>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-navy-soft">
                      {a.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-navy-soft">
                    {a.duration} · {a.note}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-navy-soft" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
