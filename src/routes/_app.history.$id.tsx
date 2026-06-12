import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { CalendarClock, ClipboardList, HeartPulse, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/RiskBadge";
import { RISK_META } from "@/content/carePlans";
import { DISCLAIMER } from "@/content/disclaimer";
import {
  getActivityLabel,
  getDailyFunctionTrendLabel,
  getFollowupResultCopy,
  getFollowupStatus,
  getFollowupTrendLabel,
  getPainLocationLabel,
  getPainScore,
  getPainSeverityLabel,
  getPrimaryTriggerLabel,
  getRadiationLabel,
  getReturnedToExerciseLabel,
  getRiskColorLabel,
  getRiskLevelLabel,
  getTriggerLabels,
} from "@/lib/assessment/historySummary";
import { store } from "@/lib/assessment/storage";
import type { AssessmentRecord } from "@/lib/assessment/types";

export const Route = createFileRoute("/_app/history/$id")({ component: Page });

const detailDisclaimer =
  "ผลนี้อ้างอิงจากคำตอบของคุณ และไม่ใช่การวินิจฉัยโรค หากอาการรุนแรง แย่ลง หรือไม่แน่ใจ ควรหยุดออกกำลังกายและพบผู้เชี่ยวชาญ";

function formatDate(value: string) {
  return new Date(value).toLocaleString("th-TH", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-muted/70 p-3">
      <p className="text-xs text-navy-soft">{label}</p>
      <p className="mt-1 font-semibold text-navy">{value}</p>
    </div>
  );
}

function Page() {
  const { id } = useParams({ from: "/_app/history/$id" });
  const navigate = useNavigate();
  const [a, setA] = useState<AssessmentRecord | undefined>();
  useEffect(() => setA(store.getAssessment(id)), [id]);
  if (!a) return null;

  const meta = RISK_META[a.risk];
  const triggerLabels = getTriggerLabels(a);
  const triggerSummary = triggerLabels.length ? triggerLabels.join(", ") : "ไม่ได้ระบุ";

  const handleDelete = () => {
    if (!window.confirm("ต้องการลบประวัติการประเมินนี้ใช่ไหม?")) return;
    store.deleteAssessment(a.id);
    navigate({ to: "/history" });
  };

  return (
    <>
      <AppHeader title="รายละเอียดการประเมิน" back />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <Card className="rounded-[30px] border-border/70 bg-card p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <RiskBadge level={a.risk} />
              <h2 className="mt-3 text-xl font-bold text-navy">{meta.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-navy-soft">{meta.tone}</p>
            </div>
            <div className="rounded-[22px] bg-primary-soft px-3 py-2 text-center">
              <p className="text-xs text-primary">Pain</p>
              <p className="text-lg font-bold text-navy">{getPainScore(a)}/10</p>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-navy-soft">
            <CalendarClock className="h-4 w-4 text-primary" />
            {formatDate(a.createdAt)}
          </p>
        </Card>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-navy">สรุปการประเมินครั้งนี้</h3>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
            <DetailItem label="วันที่ประเมิน" value={formatDate(a.createdAt)} />
            <DetailItem label="ตำแหน่งที่ปวด" value={getPainLocationLabel(a)} />
            <DetailItem
              label="ระดับปวด"
              value={`${getPainScore(a)}/10 (${getPainSeverityLabel(a)})`}
            />
            <DetailItem label="อาการร้าว/ชา" value={getRadiationLabel(a)} />
            <DetailItem label="กิจกรรมที่เกี่ยวข้อง" value={getActivityLabel(a.activity)} />
            <DetailItem label="Trigger หลัก" value={getPrimaryTriggerLabel(a)} />
            <DetailItem label="Triggers ที่เลือก" value={triggerSummary} />
            <DetailItem
              label="ผลประเมิน"
              value={`${getRiskColorLabel(a.risk)} / ความเสี่ยง${getRiskLevelLabel(a.risk)}`}
            />
            <DetailItem label="สถานะติดตามอาการ" value={getFollowupStatus(a)} />
            <DetailItem label="คะแนนรวม" value={`${a.score}`} />
          </div>
        </Card>

        <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold text-navy">คำแนะนำสรุป</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">{meta.description}</p>
        </Card>

        {a.followups.length > 0 && (
          <Card className="rounded-[26px] border-border/70 bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-navy">การติดตามอาการ</h3>
            </div>
            <div className="mt-3 space-y-2.5">
              {a.followups.map((f) => (
                <div key={f.id} className="rounded-[20px] bg-muted/70 p-3 text-sm text-navy">
                  <p className="font-semibold">{getFollowupTrendLabel(f)}</p>
                  <p className="mt-1 text-xs text-navy-soft">
                    {new Date(f.createdAt).toLocaleString("th-TH")}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-2xl bg-card/75 p-2.5">
                      <p className="text-navy-soft">Pain</p>
                      <p className="mt-0.5 font-bold text-navy">
                        {typeof f.followUpPainScore === "number"
                          ? `${f.followUpPainScore}/10`
                          : "ไม่ได้ระบุ"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-card/75 p-2.5">
                      <p className="text-navy-soft">กลับไปออกกำลังกาย</p>
                      <p className="mt-0.5 font-bold text-navy">{getReturnedToExerciseLabel(f)}</p>
                    </div>
                    <div className="rounded-2xl bg-card/75 p-2.5">
                      <p className="text-navy-soft">ชีวิตประจำวัน</p>
                      <p className="mt-0.5 font-bold text-navy">{getDailyFunctionTrendLabel(f)}</p>
                    </div>
                    <div className="rounded-2xl bg-card/75 p-2.5">
                      <p className="text-navy-soft">ความมั่นใจ</p>
                      <p className="mt-0.5 font-bold text-navy">
                        {typeof f.confidenceScore === "number"
                          ? `${f.confidenceScore}/10`
                          : "ไม่ได้ระบุ"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-2xl bg-card/75 p-3 text-xs leading-relaxed text-navy-soft">
                    {getFollowupResultCopy(f)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="rounded-[24px] border-primary/15 bg-primary-soft/50 p-4 text-xs leading-relaxed text-navy-soft">
          {detailDisclaimer}
        </Card>

        <div className="space-y-3">
          <Link to="/assess">
            <Button full variant="outline">
              <RotateCcw className="h-4 w-4" />
              ประเมินซ้ำ
            </Button>
          </Link>
          <Link to="/assess/care-plan/$id" params={{ id: a.id }}>
            <Button full variant={a.risk === "red" ? "danger" : "primary"}>
              ดูคำแนะนำอีกครั้ง
            </Button>
          </Link>
          <Link to="/assess/followup/$id" params={{ id: a.id }}>
            <Button full variant="secondary">
              บันทึกติดตามอาการ
            </Button>
          </Link>
          <Button full variant="danger" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            ลบประวัติ
          </Button>
        </div>

        <p className="text-xs leading-relaxed text-navy-soft">{DISCLAIMER}</p>
      </div>
    </>
  );
}
