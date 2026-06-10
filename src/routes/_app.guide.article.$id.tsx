import { createFileRoute, useParams } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { ARTICLES } from "@/content/articles";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { store } from "@/lib/assessment/storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/guide/article/$id")({ component: Page });

function Page() {
  const { id } = useParams({ from: "/_app/guide/article/$id" });
  const article = ARTICLES.find((a) => a.id === id);
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(store.getSaved().includes(id)), [id]);

  if (!article) return <p className="p-4">ไม่พบบทความ</p>;

  return (
    <>
      <AppHeader title="บทความ" back right={
        <button onClick={() => { store.toggleSaved(id); setSaved(!saved); }} className="rounded-full p-2 hover:bg-muted">
          <Bookmark className={`h-5 w-5 ${saved ? "fill-primary text-primary" : "text-navy"}`} />
        </button>
      } />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <div>
          <h1 className="text-xl font-bold text-navy">{article.title}</h1>
          <p className="mt-1 text-xs text-navy-soft">อ่าน {article.readMin} นาที</p>
        </div>
        {article.sections.map((s, i) => (
          <Card key={i}>
            <h3 className="text-sm font-semibold text-navy">{s.heading}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-soft">
              {s.body.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-primary">•</span><span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <Card>
          <p className="text-sm font-semibold text-navy">บทความนี้มีประโยชน์หรือไม่?</p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" full><ThumbsUp className="h-4 w-4" /> มีประโยชน์</Button>
            <Button variant="outline" full><ThumbsDown className="h-4 w-4" /> ไม่ตรงประเด็น</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
