import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";

export const Route = createFileRoute("/_app/recover/activity/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/recover/activity/$id" });
  return (
    <>
      <AppHeader title="รายละเอียดกิจกรรม" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <h2 className="text-base font-bold text-navy">ยืดเหยียดหลังล่าง</h2>
          <p className="mt-1 text-sm text-navy-soft">5 นาที · ระดับเบา</p>
          <div className="mt-3 space-y-2 text-sm text-navy">
            <p>• Cat-Cow 10 ครั้ง</p>
            <p>• Child's pose 30 วินาที</p>
            <p>• Knee to chest ข้างละ 30 วินาที</p>
          </div>
        </Card>
        <AlertBox tone="info">หากปวดเพิ่มขึ้นระหว่างทำ ให้หยุดทันที</AlertBox>
        <Link to="/recover/session/$id" params={{ id }}>
          <Button full size="lg">เริ่มเซสชัน</Button>
        </Link>
      </div>
    </>
  );
}
