import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import { store } from "@/lib/assessment/storage";
import { Bookmark, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/guide/saved")({ component: Page });

function Page() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => setIds(store.getSaved()), []);
  const items = ARTICLES.filter((a) => ids.includes(a.id));
  return (
    <>
      <AppHeader title="บทความที่บันทึกไว้" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[20px] bg-white/80 text-primary">
            <Bookmark className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-navy">คลังบทความของคุณ</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            เก็บบทความที่อยากกลับมาอ่านซ้ำเรื่องการดูแลอาการและการฟื้นตัว
          </p>
        </Card>

        {items.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="h-6 w-6" />}
            title="ยังไม่มีบทความที่บันทึก"
            description="กดไอคอนบุ๊กมาร์กเพื่อเก็บบทความที่สนใจ"
          />
        ) : (
          <div className="space-y-2.5">
            {items.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card className="flex items-center gap-3 rounded-[24px] border-border/70 bg-white p-4 shadow-soft">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{a.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-navy-soft">{a.summary}</p>
                    <p className="mt-2 text-xs font-semibold text-primary">
                      {a.readMin} นาที · {CATEGORIES.find((c) => c.id === a.category)?.name}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-navy-soft" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
