import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getNews, news } from "@/content/news";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return { title: "文章未找到" };
  return { title: n.title, description: n.summary };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();

  const others = news.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "新闻资讯", href: "/news/" },
          { label: n.category },
        ]}
      />
      <article className="section">
        <div className="container-x max-w-3xl">
          <p className="num text-[13px] text-ink-3">{n.date} · {n.category}</p>
          <h1 className="h1 mt-3 text-ink">{n.title}</h1>
          <p className="mt-5 border-l-2 border-brand pl-4 text-[14px] leading-[1.95] text-ink-2">
            {n.summary}
          </p>
          <div className="prose-cn mt-8">
            {n.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <Link href="/news/" className="btn-outline">
              ← 返回列表
            </Link>
            <Link href="/contact/" className="btn-accent">
              联系我们
            </Link>
          </div>
        </div>
      </article>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <h2 className="h3 text-ink">其他资讯</h2>
          <div className="mt-5 divide-y divide-line border-t border-line">
            {others.map((o) => (
              <Link key={o.slug} href={`/news/${o.slug}/`} className="group flex flex-wrap items-baseline gap-4 py-4">
                <span className="num text-[12.5px] text-ink-3">{o.date}</span>
                <span className="text-[14px] text-ink transition group-hover:text-brand">{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}