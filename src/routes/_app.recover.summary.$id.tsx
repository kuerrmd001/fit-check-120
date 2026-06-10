import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/recover/summary/$id")({ component: Page });

function Page() {
  return (
    <>
      <AppHeader title="สรุปเซสชัน" />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-risk-green-soft text-risk-green">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-3 text-lg font-bold text-navy">เยี่ยมมาก!</h2>
          <p className="mt-1 text-sm text-navy-soft">คุณทำเซสชันฟื้นฟูเสร็จแล้ว</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-navy">รู้สึกอย่างไรหลังทำ?</p>
          <div className="mt-2 flex gap-2">
            {["😊 ดีขึ้น", "😐 เท่าเดิม", "😣 แย่ลง"].map((t) => (
              <button key={t} className="flex-1 rounded-xl border border-border bg-card px-2 py-2 text-xs">
                {t}
              </button>
            ))}
          </div>
        </Card>
        <Link to="/recover"><Button full size="lg">เสร็จสิ้น</Button></Link>
      </div>
    </>
  );
}
