import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { AlertBox } from "@/components/AlertBox";
import { Button } from "@/components/Button";
import { store } from "@/lib/assessment/storage";

export const Route = createFileRoute("/_app/more/delete-account")({ component: Page });

function Page() {
  const nav = useNavigate();
  return (
    <>
      <AppHeader title="ลบบัญชี" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <AlertBox tone="danger" title="ไม่สามารถกู้คืนได้">
          การลบบัญชีจะลบประวัติการประเมิน บทความที่บันทึก และการตั้งค่าทั้งหมดออกจากเครื่องนี้
        </AlertBox>
        <Button full size="lg" variant="danger" onClick={() => {
          store.deleteAll();
          nav({ to: "/disclaimer" });
        }}>
          ยืนยันการลบบัญชี
        </Button>
        <Button full variant="ghost" onClick={() => nav({ to: "/more" })}>
          ยกเลิก
        </Button>
      </div>
    </>
  );
}
