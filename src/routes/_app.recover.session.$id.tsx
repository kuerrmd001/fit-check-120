import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { useEffect, useState } from "react";
import { CheckCircle2, Pause, Play, TimerReset } from "lucide-react";

export const Route = createFileRoute("/_app/recover/session/$id")({ component: Page });

const SESSIONS: Record<string, { title: string; duration: number; steps: string[]; tip: string }> =
  {
    stretch: {
      title: "ยืดเหยียดหลังล่าง",
      duration: 300,
      steps: ["หายใจลึกและเตรียมตัว", "ท่าแมว-วัวช้า ๆ", "ท่าเด็ก", "ดึงเข่าเข้าหาอก"],
      tip: "เคลื่อนไหวช้าและไม่ฝืนช่วงที่เจ็บ",
    },
    core: {
      title: "แกนกลางลำตัวเบื้องต้น",
      duration: 480,
      steps: ["ตั้งลมหายใจ", "ท่าแมลงตาย", "สะพานสะโพก", "แพลงก์ด้านข้างแบบงอเข่า"],
      tip: "หายใจต่อเนื่องและลดจำนวนครั้งได้",
    },
    mobility: {
      title: "การเคลื่อนไหวสะโพก",
      duration: 360,
      steps: ["เตรียมท่านั่ง", "หมุนสะโพก", "สลับท่า 90/90", "ยืดด้านหน้าสะโพก"],
      tip: "พยุงตัวได้และไม่บิดหลังแรง",
    },
    walk: {
      title: "เดินเบา ๆ",
      duration: 900,
      steps: ["เดินช้า", "เดินสบาย", "สังเกตอาการ", "ผ่อนความเร็ว"],
      tip: "เลือกพื้นเรียบและหยุดพักหากอาการเพิ่ม",
    },
    hipthrust: {
      title: "กระตุ้นกล้ามเนื้อสะโพก",
      duration: 600,
      steps: ["ตั้งหลังให้นิ่ง", "สะพานสะโพก", "ท่าหอยกาบ", "ฮิปฮินจ์ช้า ๆ"],
      tip: "ใช้สะโพกนำการเคลื่อนไหว ไม่แอ่นหลัง",
    },
  };

function formatTime(sec: number) {
  return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
}

function Page() {
  const { id } = useParams({ from: "/_app/recover/session/$id" });
  const nav = useNavigate();
  const [sec, setSec] = useState(0);
  const [running, setRunning] = useState(true);
  const session = SESSIONS[id] ?? SESSIONS.stretch;
  const stepLength = Math.max(1, Math.floor(session.duration / session.steps.length));
  const stepIndex = Math.min(Math.floor(sec / stepLength), session.steps.length - 1);
  const progress = Math.min(100, Math.round((sec / session.duration) * 100));

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setSec((s) => Math.min(s + 1, session.duration)), 1000);
    return () => clearInterval(i);
  }, [running, session.duration]);

  return (
    <>
      <AppHeader title="เซสชันขยับเบา ๆ" subtitle={session.title} back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-7">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 text-center">
          <p className="text-xs font-semibold text-primary">เวลาที่ผ่านไป</p>
          <p className="mt-2 text-5xl font-bold text-navy">{formatTime(sec)}</p>
          <p className="mt-1 text-xs text-navy-soft">เป้าหมาย {formatTime(session.duration)}</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-primary">{progress}%</p>
        </Card>

        <Card className="rounded-[26px]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <TimerReset className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary">
                ขั้นตอน {stepIndex + 1} จาก {session.steps.length}
              </p>
              <h2 className="mt-1 text-xl font-bold text-navy">{session.steps[stepIndex]}</h2>
              <p className="mt-2 text-sm leading-6 text-navy-soft">
                ทำด้วยจังหวะที่ควบคุมได้ หากรู้สึกปวดเพิ่ม ให้หยุดพักทันที
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {session.steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm ${
                  index === stepIndex
                    ? "bg-primary-soft text-navy"
                    : index < stepIndex
                      ? "bg-risk-green-soft text-risk-green"
                      : "bg-muted/60 text-navy-soft"
                }`}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        <AlertBox tone="info" title="คำแนะนำระหว่างทำ">
          {session.tip}
        </AlertBox>

        <div className="space-y-2">
          <Button
            full
            size="lg"
            variant={running ? "outline" : "primary"}
            onClick={() => setRunning((r) => !r)}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? "หยุดชั่วคราว" : "ดำเนินต่อ"}
          </Button>
          <Button
            full
            size="lg"
            onClick={() => nav({ to: "/recover/summary/$id", params: { id } })}
          >
            จบเซสชัน
          </Button>
        </div>
      </div>
    </>
  );
}
