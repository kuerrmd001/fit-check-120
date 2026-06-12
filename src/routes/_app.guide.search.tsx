import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/guide/search")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const results = term
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.summary.toLowerCase().includes(term) ||
          a.sections.some(
            (section) =>
              section.heading.toLowerCase().includes(term) ||
              section.body.some((body) => body.toLowerCase().includes(term)),
          ) ||
          CATEGORIES.find((c) => c.id === a.category)
            ?.name.toLowerCase()
            .includes(term),
      )
    : [];
  return (
    <>
      <AppHeader title="ค้นหา" back />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <div className="flex items-center gap-3 rounded-[24px] border border-border/70 bg-card px-4 py-3.5 shadow-soft">
          <Search className="h-4 w-4 text-navy-soft" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาบทความ..."
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-navy-soft"
          />
        </div>
        {!q ? (
          <EmptyState
            title="พิมพ์เพื่อค้นหา"
            description="ลองค้นหา 'วิ่ง', 'หลังล่าง', 'ยืดเหยียด'"
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title="ไม่พบผลลัพธ์"
            description="ลองใช้คำค้นอื่น เช่น หลังล่าง วิ่ง เวท หรือสัญญาณอันตราย"
          />
        ) : (
          <div className="space-y-2.5">
            {results.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card className="flex items-center gap-3 rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
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
