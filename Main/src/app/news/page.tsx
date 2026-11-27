import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "新闻资讯 · 公司动态与行业信息",
  description: "江西惠洁管业新闻资讯：公司动态、行业标准与政策信息、展会与活动信息。",
};

const cats = ["全部", "公司新闻", "行业动态", "展会信息"] as const;

export default function NewsPage() {
  const newsSorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Breadcrumb items={[{ label: "关于我们", href: "/about/" }, { label: "新闻资讯" }]} />
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="eyebrow eyebrow-light">NEWS</p>
          <h1 className="h1 mt-3 text-white">新闻资讯</h1>
          <p className="lead mt-5 max-w-3xl text-white/70">
            公司动态、行业标准变化与展会信息。涉及标准更新的内容会注明来源与实施日期。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {cats.map((c, i) => (
              <span
                key={c}
                className={`rounded-xs border px-3 py-1.5 text-[12.5px] ${
                  i === 0 ? "border-brand bg-brand text-white" : "border-line text-ink-2"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8 divide-y divide-line border-t border-line">
            {newsSorted.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}/`}
                className="group grid gap-3 py-6 md:grid-cols-12 md:items-start"
              >
                <div className="md:col-span-2">
                  <p className="num text-[13px] text-ink-3">{n.date}</p>
                  <p className="mt-1 text-[11.5px] text-brand">{n.category}</p>
                </div>
                <div className="md:col-span-10">
                  <h2 className="text-[16px] font-semibold text-ink transition group-hover:text-brand">
                    {n.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-[1.9] text-ink-2">{n.summary}</p>
                  <span className="mt-2 inline-block text-[12.5px] text-brand">阅读全文 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}