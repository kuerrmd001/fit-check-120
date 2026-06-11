import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AlertBox } from "@/components/AlertBox";
import { AssessmentReferences } from "@/components/AssessmentReferences";
import { useDraft } from "@/lib/assessment/draft";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/assess/")({ component: Page });

function Page() {
  const reset = useDraft((s) => s.reset);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <AppHeader title="เริ่มประเมิน" />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="bg-gradient-to-br from-primary to-[oklch(0.55_0.14_180)] text-white">
          <h2 className="text-base font-bold">การประเมินอาการบาดเจ็บเบื้องต้น</h2>
          <p className="mt-1 text-sm opacity-90">
            Fit Check ช่วยประเมินอาการบาดเจ็บเบื้องต้นจากการออกกำลังกาย
            โดยเวอร์ชันต้นแบบนี้เปิดใช้เต็มสำหรับอาการหลังล่างก่อน
          </p>
          <p className="mt-2 text-xs opacity-80">ใช้เวลาประมาณ 2-3 นาที</p>
        </Card>

        <Link to="/assess/location">
          <Button
            full
            size="lg"
            className="min-h-14 text-base font-bold shadow-[0_18px_36px_-18px_oklch(0.55_0.14_180_/_0.65)]"
          >
            เริ่มประเมินอาการบาดเจ็บ
          </Button>
        </Link>

        <p className="rounded-2xl bg-primary-soft px-4 py-3 text-sm font-semibold leading-6 text-navy">
          ขั้นตอนเหล่านี้จะเริ่มหลังจากกดปุ่มเริ่มประเมิน
        </p>

        <div className="space-y-2">
          {[
            "1. เลือกอาการหลัก 1 ตำแหน่งก่อน",
            "2. ตรวจสัญญาณอันตราย (Safety Check)",
            "3. เลือกกิจกรรมที่เกี่ยวข้อง",
            "4. ตอบคำถามเรื่องอาการ",
            "5. รับผลและคำแนะนำเบื้องต้น",
          ].map((s, i) => (
            <Card key={i} className="flex items-center gap-3 bg-muted/50 py-3 shadow-none">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-sm text-navy">{s.replace(/^\d+\.\s*/, "")}</span>
            </Card>
          ))}
        </div>

        <AlertBox tone="info">
          ผลที่ได้เป็นข้อมูลทั่วไปจากคำตอบของคุณ ไม่ใช่การวินิจฉัยทางการแพทย์
        </AlertBox>

        <AssessmentReferences />

        <Link to="/assess/location">
          <Button full size="lg">
            เริ่มประเมินอาการบาดเจ็บ
          </Button>
        </Link>
      </div>
    </>
  );
}
