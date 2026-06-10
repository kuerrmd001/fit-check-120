import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import { Search, Bookmark, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/guide/")({ component: Page });

function Page() {
  return (
    <>
      <AppHeader title="คู่มือ" right={
        <Link to="/guide/saved" className="rounded-full p-2 hover:bg-muted">
          <Bookmark className="h-5 w-5 text-navy" />
        </Link>
      } />
      <div className="flex-1 space-y-4 px-4 pb-6">
        <Link to="/guide/search" className="flex items-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-navy-soft">
          <Search className="h-4 w-4" />
          ค้นหาบทความ...
        </Link>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">หมวดหมู่</h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="rounded-xl bg-primary-soft p-3 text-sm font-medium text-navy">
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">บทความล่าสุด</h3>
          <div className="space-y-2">
            {ARTICLES.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{a.title}</p>
                    <p className="text-xs text-navy-soft">{a.readMin} นาที · {CATEGORIES.find(c => c.id === a.category)?.name}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-navy-soft" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
