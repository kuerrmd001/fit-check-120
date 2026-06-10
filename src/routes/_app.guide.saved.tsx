import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ARTICLES } from "@/content/articles";
import { store } from "@/lib/assessment/storage";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/guide/saved")({ component: Page });

function Page() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => setIds(store.getSaved()), []);
  const items = ARTICLES.filter((a) => ids.includes(a.id));
  return (
    <>
      <AppHeader title="บทความที่บันทึกไว้" back />
      <div className="flex-1 px-4 pb-6">
        {items.length === 0 ? (
          <EmptyState icon={<Bookmark className="h-6 w-6" />} title="ยังไม่มีบทความที่บันทึก" description="กดไอคอนบุ๊กมาร์กเพื่อเก็บบทความที่สนใจ" />
        ) : (
          <div className="space-y-2">
            {items.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card>
                  <p className="text-sm font-semibold text-navy">{a.title}</p>
                  <p className="text-xs text-navy-soft">{a.readMin} นาที</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
