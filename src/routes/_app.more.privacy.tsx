import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { AlertBox } from "@/components/AlertBox";
import { Card } from "@/components/Card";
import { PDPA, DISCLAIMER } from "@/content/disclaimer";
import { Database, FileCheck2, ShieldCheck, Trash2, UserCheck } from "lucide-react";

export const Route = createFileRoute("/_app/more/privacy")({ component: Page });

const PRIVACY_SECTIONS = [
  {
    title: "ข้อมูลสุขภาพ",
    body: "ข้อมูลที่เกี่ยวกับอาการ ตำแหน่งที่ปวด คะแนนความปวด และกิจกรรม ใช้เพื่อช่วยจัดระเบียบการประเมินและการติดตามในแอป",
    Icon: Database,
  },
  {
    title: "ความยินยอม",
    body: "คุณควรอ่านข้อจำกัดของแอปก่อนใช้งาน และสามารถเลือกใช้ต่อเมื่อเข้าใจว่า Fit Check เป็นข้อมูลเบื้องต้นเท่านั้น",
    Icon: FileCheck2,
  },
  {
    title: "โหมดผู้เยี่ยมชม",
    body: "คุณสามารถใช้งานแบบ Guest ได้โดยไม่ต้องสมัครสมาชิก ข้อมูลหลักจะยังอยู่ในเครื่องที่ใช้งาน",
    Icon: UserCheck,
  },
  {
    title: "การลบข้อมูล",
    body: "คุณสามารถลบประวัติ การตั้งค่า บทความที่บันทึก และข้อมูลบัญชีจากเครื่องนี้ได้ในเมนูลบบัญชี",
    Icon: Trash2,
  },
];

function Page() {
  return (
    <>
      <AppHeader title="นโยบายความเป็นส่วนตัว" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">ข้อมูลของคุณควรเข้าใจง่ายและควบคุมได้</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                Fit Check ออกแบบให้ใช้ข้อมูลเท่าที่จำเป็นต่อการประเมินเบื้องต้นและการติดตามอาการ
              </p>
            </div>
          </div>
        </Card>

        <AlertBox tone="info" title="ข้อจำกัดทางการแพทย์">
          {DISCLAIMER}
        </AlertBox>

        <div className="grid gap-3">
          {PRIVACY_SECTIONS.map((section) => {
            const Icon = section.Icon;
            return (
              <Card key={section.title}>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy">{section.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-soft">{section.body}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card>
          <h3 className="text-sm font-bold text-navy">แนวทาง PDPA และการจัดการข้อมูล</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-soft">
            {PDPA.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
