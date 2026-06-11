import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { AlertBox } from "@/components/AlertBox";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { LifeBuoy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/more/support")({ component: Page });

function Page() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <AppHeader title="ติดต่อสนับสนุน" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">ช่วยเหลือเรื่องการใช้งานแอป</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                ส่งปัญหา ข้อเสนอแนะ หรือสิ่งที่อยากให้ Fit Check ปรับปรุง
              </p>
            </div>
          </div>
        </Card>

        <AlertBox tone="warning" title="ไม่ใช่ช่องทางฉุกเฉิน">
          หน้านี้ใช้สำหรับติดต่อทีมสนับสนุนแอป ไม่ใช่บริการฉุกเฉินหรือการวินิจฉัย หากมีอาการรุนแรง
          อาการแย่ลง หรือมีสัญญาณที่ควรระวัง ควรติดต่อผู้เชี่ยวชาญหรือหน่วยบริการในพื้นที่
        </AlertBox>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">support@fitcheck.app</p>
              <p className="text-xs text-navy-soft">ตอบกลับภายใน 1-2 วันทำการ</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <p className="text-sm font-bold text-navy">ส่งข้อความหาเรา</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-navy-soft">
            อธิบายปัญหาที่พบ หน้าที่ใช้งานอยู่ หรือข้อเสนอแนะที่อยากฝากไว้
          </p>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            placeholder="บอกเล่าปัญหาหรือข้อเสนอแนะ..."
            className="mt-3 w-full rounded-2xl border border-border bg-white p-3 text-sm text-navy outline-none transition placeholder:text-navy-soft/70 focus:border-primary focus:ring-2 focus:ring-primary-soft"
          />
          <Button
            full
            className="mt-3"
            onClick={() => {
              setSent(true);
              setMsg("");
            }}
          >
            ส่งข้อความ
          </Button>
          {sent && (
            <p className="mt-2 text-center text-xs text-risk-green">ส่งเรียบร้อยแล้ว (ตัวอย่าง)</p>
          )}
        </Card>
      </div>
    </>
  );
}
