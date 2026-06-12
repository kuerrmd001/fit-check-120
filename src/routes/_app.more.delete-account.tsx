import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { AlertBox } from "@/components/AlertBox";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/more/delete-account")({ component: Page });

function Page() {
  const nav = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmed && confirmText.trim() === "ลบข้อมูล";

  return (
    <>
      <AppHeader title="ลบบัญชี" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-risk-red/20 bg-risk-red-soft">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-risk-red shadow-soft">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-risk-red">ยืนยันก่อนลบบัญชี</p>
              <p className="mt-1 text-sm leading-relaxed text-navy">
                การลบข้อมูลนี้มีผลกับเครื่องที่ใช้งานอยู่ และไม่สามารถกู้คืนจากแอปได้
              </p>
            </div>
          </div>
        </Card>

        <AlertBox tone="danger" title="ไม่สามารถกู้คืนได้">
          การลบบัญชีจะลบประวัติการประเมิน บทความที่บันทึก และการตั้งค่าทั้งหมดออกจากเครื่องนี้
        </AlertBox>

        <Card>
          <p className="text-sm font-bold text-navy">ข้อมูลที่จะถูกลบ</p>
          <ul className="mt-3 space-y-2 text-sm text-navy-soft">
            {[
              "ประวัติการประเมินและการติดตามอาการ",
              "โปรไฟล์และการตั้งค่า",
              "บทความที่บันทึกไว้",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-risk-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[oklch(0.6_0.22_25)]"
          />
          <span className="text-sm leading-relaxed text-navy">
            ฉันเข้าใจว่าการลบนี้จะลบข้อมูลออกจากเครื่องนี้และไม่สามารถกู้คืนจากแอปได้
          </span>
        </label>

        <Card>
          <label className="block">
            <span className="text-sm font-bold text-navy">ยืนยันด้วยข้อความ</span>
            <span className="mt-1 block text-xs leading-relaxed text-navy-soft">
              พิมพ์คำว่า “ลบข้อมูล” เพื่อยืนยันว่าคุณต้องการลบข้อมูลในเครื่องนี้
            </span>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="ลบข้อมูล"
              className="mt-3 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-navy outline-none transition placeholder:text-navy-soft/70 focus:border-risk-red focus:ring-2 focus:ring-risk-red-soft"
            />
          </label>
        </Card>

        <Button
          full
          size="lg"
          variant="danger"
          disabled={!canDelete}
          className={!canDelete ? "opacity-50" : ""}
          onClick={() => {
            store.deleteAll();
            nav({ to: "/disclaimer" });
          }}
        >
          <Trash2 className="h-4 w-4" />
          ยืนยันการลบบัญชี
        </Button>
        <Button full variant="ghost" onClick={() => nav({ to: "/more" })}>
          ยกเลิก
        </Button>
      </div>
    </>
  );
}
