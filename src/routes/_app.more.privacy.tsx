import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { PDPA, DISCLAIMER } from "@/content/disclaimer";

export const Route = createFileRoute("/_app/more/privacy")({ component: Page });

function Page() {
  return (
    <>
      <AppHeader title="นโยบายความเป็นส่วนตัว" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <Card>
          <h3 className="text-sm font-semibold text-navy">ข้อจำกัด</h3>
          <p className="mt-2 text-sm text-navy-soft">{DISCLAIMER}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-navy">การจัดการข้อมูล</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-navy-soft">
            {PDPA.map((p, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span>{p}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
