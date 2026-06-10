import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { AlertTriangle, Phone, Info, Home } from "lucide-react";

export const Route = createFileRoute("/_app/assess/red-flag")({ component: Page });

function Page() {
  const nav = useNavigate();
  return (
    <>
      <AppHeader title="สัญญาณอันตราย" />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-risk-red-soft text-risk-red">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <h2 className="mt-3 text-xl font-bold text-risk-red">สัญญาณอันตราย</h2>
          <p className="mt-2 text-sm text-navy">
            พบสัญญาณที่ควรระวัง กรุณาหยุดการประเมิน หยุดออกกำลังกาย และพบผู้เชี่ยวชาญหรือหน่วยบริการสุขภาพโดยเร็วที่สุด
          </p>
        </div>

        <AlertBox tone="danger" title="คำเตือน">
          อย่าฝืนออกกำลังกายต่อ การละเลยอาจทำให้อาการแย่ลง
        </AlertBox>

        <div className="space-y-2">
          <Button full size="lg" variant="danger" onClick={() => alert("ติดต่อ 1669 หรือสถานพยาบาลใกล้บ้าน")}>
            <Phone className="h-4 w-4" />
            ติดต่อผู้เชี่ยวชาญ / หน่วยบริการ
          </Button>
          <Link to="/guide/article/$id" params={{ id: "red-flags" }}>
            <Button full variant="outline">
              <Info className="h-4 w-4" />
              ดูข้อมูลเพิ่มเติม
            </Button>
          </Link>
          <Button full variant="ghost" onClick={() => nav({ to: "/home" })}>
            <Home className="h-4 w-4" />
            กลับหน้าหลัก
          </Button>
        </div>
      </div>
    </>
  );
}
