import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { CheckCircle2, Clock3, Footprints, Target } from "lucide-react";

export const Route = createFileRoute("/_app/recover/activity/$id")({ component: Page });

const DETAILS: Record<
  string,
  {
    title: string;
    duration: string;
    level: string;
    goal: string;
    benefits: string[];
    steps: string[];
    cautions: string[];
  }
> = {
  stretch: {
    title: "ยืดเหยียดหลังล่าง",
    duration: "5 นาที",
    level: "เบา",
    goal: "ลดความตึงและช่วยให้หลังส่วนล่างเคลื่อนไหวได้สบายขึ้น",
    benefits: ["เริ่มต้นง่าย", "ใช้แรงน้อย", "เหมาะกับวันที่อยากขยับเบา ๆ"],
    steps: ["ท่าแมว-วัว 10 ครั้ง", "ท่าเด็ก 30 วินาที", "ดึงเข่าเข้าหาอกข้างละ 30 วินาที"],
    cautions: ["ไม่กดฝืนช่วงที่เจ็บ", "หายใจช้า ๆ และหยุดถ้าปวดเพิ่ม"],
  },
  core: {
    title: "แกนกลางลำตัวเบื้องต้น",
    duration: "8 นาที",
    level: "ปานกลาง",
    goal: "ฝึกควบคุมลำตัวแบบนุ่มนวลโดยไม่เพิ่มแรงกดที่หลัง",
    benefits: ["ช่วยรับรู้การเกร็งลำตัว", "เหมาะกับการกลับมาเริ่มฝึก", "ทำเป็นรอบสั้น ๆ ได้"],
    steps: [
      "ท่าแมลงตายช้า ๆ 6 ครั้งต่อข้าง",
      "สะพานสะโพก 8 ครั้ง",
      "แพลงก์ด้านข้างแบบงอเข่า ข้างละ 15 วินาที",
    ],
    cautions: ["ไม่กลั้นหายใจ", "ลดจำนวนครั้งได้หากเริ่มล้า"],
  },
  mobility: {
    title: "การเคลื่อนไหวสะโพก",
    duration: "6 นาที",
    level: "เบา",
    goal: "เพิ่มความคล่องตัวรอบสะโพกเพื่อช่วยลดการชดเชยที่หลัง",
    benefits: ["เคลื่อนไหวช้า", "ช่วยเช็กช่วงการเคลื่อนไหว", "เหมาะก่อนเดินหรือยืดเหยียด"],
    steps: [
      "หมุนสะโพกข้างละ 8 ครั้ง",
      "สลับท่า 90/90 จำนวน 6 ครั้ง",
      "ยืดด้านหน้าสะโพกข้างละ 30 วินาที",
    ],
    cautions: ["ไม่บิดหลังแรง", "ใช้มือพยุงได้ถ้าทรงตัวไม่มั่นคง"],
  },
  walk: {
    title: "เดินเบา ๆ",
    duration: "15 นาที",
    level: "เบา",
    goal: "กลับไปขยับแบบต่อเนื่องด้วยความหนักต่ำและสังเกตอาการ",
    benefits: ["ปรับความเร็วได้", "ติดตามอาการง่าย", "เหมาะกับวันที่อยากเริ่มขยับ"],
    steps: ["เดินช้า 3 นาที", "เดินสบาย 10 นาที", "ผ่อนความเร็ว 2 นาที"],
    cautions: ["เลือกพื้นเรียบ", "หยุดพักหากอาการปวดเพิ่ม"],
  },
  hipthrust: {
    title: "กระตุ้นกล้ามเนื้อสะโพก",
    duration: "10 นาที",
    level: "ปานกลาง",
    goal: "กระตุ้นกล้ามเนื้อสะโพกโดยควบคุมหลังให้นิ่ง",
    benefits: ["ช่วยรับรู้การใช้สะโพก", "ปรับช่วงการเคลื่อนไหวได้", "เหมาะหลังอาการสงบลง"],
    steps: ["สะพานสะโพก 8 ครั้ง", "ท่าหอยกาบข้างละ 10 ครั้ง", "ฮิปฮินจ์ยืนช้า ๆ 8 ครั้ง"],
    cautions: ["ไม่แอ่นหลัง", "เลือกช่วงที่ทำแล้วไม่เพิ่มอาการ"],
  },
};

function Page() {
  const { id } = useParams({ from: "/_app/recover/activity/$id" });
  const activity = DETAILS[id] ?? DETAILS.stretch;

  return (
    <>
      <AppHeader title="รายละเอียดกิจกรรม" subtitle="อ่านเป้าหมายและข้อควรระวังก่อนเริ่ม" back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-7">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70">
          <p className="text-xs font-semibold text-primary">กิจกรรมขยับเบา ๆ</p>
          <h1 className="mt-1 text-2xl font-bold text-navy">{activity.title}</h1>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white p-3 shadow-soft">
              <Clock3 className="h-4 w-4 text-primary" />
              <p className="mt-2 text-xs text-navy-soft">ระยะเวลา</p>
              <p className="text-sm font-bold text-navy">{activity.duration}</p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-soft">
              <Footprints className="h-4 w-4 text-primary" />
              <p className="mt-2 text-xs text-navy-soft">ระดับ</p>
              <p className="text-sm font-bold text-navy">{activity.level}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[26px]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">เป้าหมาย</h2>
              <p className="mt-1 text-sm leading-6 text-navy-soft">{activity.goal}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[26px]">
          <h2 className="text-sm font-semibold text-navy">ประโยชน์ที่คาดหวัง</h2>
          <div className="mt-3 space-y-2">
            {activity.benefits.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-navy-soft">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-risk-green" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[26px]">
          <h2 className="text-sm font-semibold text-navy">ขั้นตอน</h2>
          <div className="mt-3 space-y-2">
            {activity.steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl bg-muted/60 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm text-navy">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        <AlertBox tone="warning" title="ข้อควรระวัง">
          {activity.cautions.join(" · ")} หากปวดเพิ่มขึ้นระหว่างทำ ให้หยุดทันที
        </AlertBox>

        <Link to="/recover/session/$id" params={{ id }}>
          <Button full size="lg">
            เริ่มเซสชัน
          </Button>
        </Link>
      </div>
    </>
  );
}
