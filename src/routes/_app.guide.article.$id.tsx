import { createFileRoute, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import { ThumbsUp, ThumbsDown, Bookmark, Clock, ShieldCheck } from "lucide-react";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/guide/article/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/guide/article/$id" });
  const article = ARTICLES.find((a) => a.id === id);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState<"helpful" | "not" | null>(null);
  useEffect(() => setSaved(store.getSaved().includes(id)), [id]);

  if (!article) return <p className="p-4">ไม่พบบทความ</p>;
  const category = CATEGORIES.find((c) => c.id === article.category);

  return (
    <>
      <AppHeader
        title="บทความ"
        back
        right={
          <button
            onClick={() => {
              store.toggleSaved(id);
              setSaved(!saved);
            }}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Bookmark className={`h-5 w-5 ${saved ? "fill-primary text-primary" : "text-navy"}`} />
          </button>
        }
      />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-primary">
            <Clock className="h-4 w-4" />
            อ่าน {article.readMin} นาที · {category?.name}
          </div>
          <h1 className="text-2xl font-bold leading-tight text-navy">{article.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">{article.summary}</p>
        </Card>

        <AlertBox
          tone={article.category === "redflag" ? "danger" : "info"}
          title="ข้อมูลเพื่อการเรียนรู้"
        >
          บทความนี้เป็นข้อมูลทั่วไป ไม่ใช่การวินิจฉัยหรือการรักษาเฉพาะบุคคล
          หากมีสัญญาณอันตรายควรพบผู้เชี่ยวชาญ
        </AlertBox>

        {article.sections.map((s, i) => (
          <Card key={i} className="rounded-[26px] border-border/70 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-navy">{s.heading}</h3>
            </div>
            <ul className="space-y-2 text-sm leading-relaxed text-navy-soft">
              {s.body.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Card className="rounded-[26px] border-border/70 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-navy">บทความนี้มีประโยชน์หรือไม่?</p>
          <div className="mt-3 flex gap-2">
            <Button
              variant={feedback === "helpful" ? "secondary" : "outline"}
              full
              onClick={() => setFeedback("helpful")}
            >
              <ThumbsUp className="h-4 w-4" /> มีประโยชน์
            </Button>
            <Button
              variant={feedback === "not" ? "secondary" : "outline"}
              full
              onClick={() => setFeedback("not")}
            >
              <ThumbsDown className="h-4 w-4" /> ไม่ตรงประเด็น
            </Button>
          </div>
          {feedback && (
            <p className="mt-3 text-center text-xs font-medium text-primary">
              ขอบคุณสำหรับความคิดเห็น
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
