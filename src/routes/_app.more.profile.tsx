import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { store } from "@/lib/assessment/storage";
import { Activity, Edit3, Target, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/more/profile")({ component: Page });

type Profile = ReturnType<typeof store.getProfile>;

const FIELDS: {
  k: keyof Profile;
  label: string;
  type: "text" | "number";
  helper: string;
}[] = [
  { k: "nickname", label: "ชื่อเล่น", type: "text", helper: "ชื่อที่แสดงในแอป" },
  { k: "age", label: "อายุ", type: "number", helper: "ใช้เพื่อบันทึกข้อมูลพื้นฐาน" },
  { k: "sex", label: "เพศ", type: "text", helper: "ระบุได้ตามที่สะดวก" },
  { k: "sport", label: "กิจกรรมหลัก", type: "text", helper: "เช่น วิ่ง เวท เทนนิส หรือโยคะ" },
];

function Page() {
  const [p, setP] = useState<Profile>({
    nickname: "",
    age: 21,
    sex: "ไม่ระบุ",
    sport: "วิ่ง",
  });
  useEffect(() => setP(store.getProfile()), []);

  return (
    <>
      <AppHeader title="โปรไฟล์" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="border-primary/15 bg-primary-soft/60">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-primary shadow-soft">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-navy">{p.nickname || "ผู้ใช้ Fit Check"}</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                โปรไฟล์นี้ช่วยให้ประวัติและการติดตามอาการเป็นระเบียบขึ้น
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <Target className="mb-2 h-4 w-4 text-primary" />
            <p className="text-xs font-semibold text-navy">เป้าหมาย</p>
            <p className="mt-1 text-xs leading-relaxed text-navy-soft">
              ติดตามอาการและกลับไปทำกิจกรรมอย่างค่อยเป็นค่อยไป
            </p>
          </Card>
          <Card className="p-3">
            <Activity className="mb-2 h-4 w-4 text-primary" />
            <p className="text-xs font-semibold text-navy">ระดับกิจกรรม</p>
            <p className="mt-1 text-xs leading-relaxed text-navy-soft">
              ใช้กิจกรรมหลัก: {p.sport || "ยังไม่ระบุ"}
            </p>
          </Card>
        </div>

        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-navy">ข้อมูลพื้นฐาน</p>
              <p className="text-xs text-navy-soft">แก้ไขได้จากช่องด้านล่าง</p>
            </div>
            <Edit3 className="h-4 w-4 text-primary" />
          </div>

          {FIELDS.map((f) => (
            <label key={f.k} className="block">
              <span className="text-xs font-semibold text-navy-soft">{f.label}</span>
              <input
                type={f.type}
                value={p[f.k]}
                onChange={(e) =>
                  setP({
                    ...p,
                    [f.k]: f.type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
              />
              <span className="mt-1 block text-[11px] text-navy-soft">{f.helper}</span>
            </label>
          ))}
        </Card>

        <Button
          full
          size="lg"
          onClick={() => {
            store.setProfile(p);
            alert("บันทึกแล้ว");
          }}
        >
          บันทึก
        </Button>
      </div>
    </>
  );
}
