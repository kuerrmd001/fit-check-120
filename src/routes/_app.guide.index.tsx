import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import { Search, Bookmark, ChevronRight, BookOpen, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_app/guide/")({ component: Page });

function Page() {
  const featured = ARTICLES[0];
  const mythArticles = ARTICLES.filter((a) => a.category === "pain-education");

  return (
    <>
      <AppHeader
        title="คู่มือ"
        right={
          <Link to="/guide/saved" className="rounded-full p-2 hover:bg-muted">
            <Bookmark className="h-5 w-5 text-navy" />
          </Link>
        }
      />
      <div className="flex-1 space-y-5 px-4 pb-6">
        <Card className="rounded-[30px] border-primary/15 bg-primary-soft/70 p-5 shadow-[0_20px_50px_-34px_oklch(0.45_0.08_190)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[20px] bg-card/80 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold leading-tight text-navy">คู่มือดูแลอาการและพักฟื้น</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            อ่านข้อมูลทั่วไปเรื่องการออกกำลังกาย อาการหลังล่าง และสัญญาณที่ควรระวัง
          </p>
        </Card>

        <Link
          to="/guide/search"
          className="flex items-center gap-3 rounded-[24px] border border-border/70 bg-card px-4 py-4 text-sm font-medium text-navy-soft shadow-soft"
        >
          <Search className="h-4 w-4" />
          ค้นหาบทความ...
        </Link>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">หมวดหมู่</h3>
            <Link to="/guide/saved" className="text-xs font-semibold text-primary">
              บทความที่บันทึก
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((c) => (
              <div
                key={c.id}
                className="rounded-[22px] border border-primary/10 bg-card p-3 text-sm font-semibold text-navy shadow-soft"
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-navy">เข้าใจอาการปวดจากการออกกำลังกาย</h3>
            <p className="mt-1 text-xs leading-relaxed text-navy-soft">
              Myth vs Fact แบบสั้น ๆ เพื่อช่วยแยกความเข้าใจผิดจากสิ่งที่ควรสังเกต
            </p>
          </div>
          <div className="space-y-2.5">
            {mythArticles.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card className="rounded-[24px] border-primary/10 bg-card p-4 shadow-soft">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-risk-yellow-soft px-2.5 py-1 text-[11px] font-bold text-risk-yellow">
                      ความเข้าใจผิด
                    </span>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                      ข้อเท็จจริง
                    </span>
                  </div>
                  <p className="text-sm font-bold leading-snug text-navy">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy-soft">
                    {a.summary}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/guide/article/$id" params={{ id: featured.id }}>
          <Card className="rounded-[30px] border-primary/15 bg-card p-5 shadow-[0_18px_44px_-32px_oklch(0.35_0.08_210)]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              <ShieldCheck className="h-4 w-4" />
              บทความแนะนำ
            </div>
            <h3 className="text-lg font-bold leading-snug text-navy">{featured.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-soft">{featured.summary}</p>
            <p className="mt-3 text-xs font-semibold text-primary">อ่าน {featured.readMin} นาที</p>
          </Card>
        </Link>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">บทความล่าสุด</h3>
          <div className="space-y-2.5">
            {ARTICLES.map((a) => (
              <Link key={a.id} to="/guide/article/$id" params={{ id: a.id }}>
                <Card className="flex items-center gap-3 rounded-[24px] border-border/70 bg-card p-4 shadow-soft">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{a.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy-soft">
                      {a.summary}
                    </p>
                    <p className="text-xs text-navy-soft">
                      {a.readMin} นาที · {CATEGORIES.find((c) => c.id === a.category)?.name}
                    </p>
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
