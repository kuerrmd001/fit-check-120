import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AlertBox } from "@/components/AlertBox";
import { useDraft } from "@/lib/assessment/draft";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/assess/")({ component: Page });

function Page() {
  const reset = useDraft((s) => s.reset);
  useEffect(() => { reset(); }, [reset]);

  return (
    <>
      <AppHeader title="เริ่มประเมิน" />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="bg-gradient-to-br from-primary to-[oklch(0.55_0.14_180)] text-white">
          <h2 className="text-base font-bold">การประเมินอาการปวดหลังเบื้องต้น</h2>
          <p className="mt-1 text-sm opacity-90">ใช้เวลาประมาณ 2-3 นาที</p>
        </Card>

        <div className="space-y-2">
          {[
            "1. ตรวจสัญญาณอันตราย (Red Flag)",
            "2. เลือกตำแหน่งที่ปวด",
            "3. ระบุประเภทกิจกรรม",
            "4. ตอบคำถามเรื่องอาการ",
            "5. รับผลและคำแนะนำเบื้องต้น",
          ].map((s, i) => (
            <Card key={i} className="flex items-center gap-3 py-3">
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

        <Link to="/assess/location">
          <Button full size="lg">เริ่มประเมิน</Button>
        </Link>
      </div>
    </>
  );
}
