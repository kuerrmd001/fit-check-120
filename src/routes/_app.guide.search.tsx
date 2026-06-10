import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ARTICLES } from "@/content/articles";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/guide/search")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const results = q ? ARTICLES.filter((a) => a.title.includes(q) || a.summary.includes(q)) : [];
  return (
    <>
      <AppHeader title="ค้นหา" back />
      <div className="flex-1 space-y-3 px-4 pb-6">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-navy-soft" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาบทความ..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        {!q ? (
          <EmptyState title="พิมพ์เพื่อค้นหา" description="ลองค้นหา 'วิ่ง', 'หลังล่าง', 'ยืดเหยียด'" />
        ) : results.length === 0 ? (
          <EmptyState title="ไม่พบผลลัพธ์" />
        ) : (
          results.map((a) => (
            <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
              <Card><p className="text-sm font-semibold text-navy">{a.title}</p></Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
