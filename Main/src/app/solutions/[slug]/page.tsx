import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import CaseCard from "@/components/CaseCard";
import { getSolution, solutions } from "@/content/solutions";
import { getProduct, products } from "@/content/products";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return { title: "方案未找到" };
  return { title: `${s.name}解决方案`, description: s.summary };
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const list = s.products.map((x) => getProduct(x)).filter(Boolean) as typeof products;
  const relatedCases = cases.filter((c) => c.solution === s.slug);

  return (
    <>
      <Breadcrumb items={[{ label: "解决方案", href: "/solutions/" }, { label: s.name }]} />

      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{s.en}</p>
          <h1 className="h1 mt-3 text-white">{s.name}解决方案</h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-[1.95] text-white/70">{s.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">常见问题</p>
            <h2 className="h2 mt-2 text-ink">我们通常解决这些</h2>
            <ul className="mt-5 space-y-3">
              {s.pain.map((x, i) => (
                <li key={x} className="flex gap-3 border-l-2 border-accent/70 pl-4 text-[14px] leading-relaxed text-ink-2">
                  <span className="num text-[12px] text-ink-3">0{i + 1}</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8">
            <p className="eyebrow">配置建议</p>
            <h2 className="h2 mt-2 text-ink">系统与管材配置</h2>
            <div className="mt-5 divide-y divide-line border-y border-line">
              {s.system.map((it) => (
                <div key={it.title} className="grid gap-2 py-4 md:grid-cols-3">
                  <h3 className="text-[15px] font-semibold text-ink">{it.title}</h3>
                  <p className="text-[13px] leading-relaxed text-ink-2 md:col-span-2">{it.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xs bg-brand-tint p-5 text-[13px] leading-relaxed text-ink-2">
              具体口径、壁厚与压力等级需结合设计流量、埋深与地质条件确定，可联系我们协助校核。
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="h2 text-ink">推荐产品</h2>
            <Link href="/products/" className="text-[13px] text-brand hover:underline">
              全部产品 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="h2 mb-6 text-ink">相关案例</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedCases.map((c) => (
                <CaseCard key={c.slug} item={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-dark">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-[20px] font-bold text-white md:text-[24px]">{s.name} · 需要技术支持？</h2>
            <p className="mt-2 text-[13px] text-white/60">提供图纸或工程条件，我们协助出具选型与用量建议。</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact/" className="btn-accent">
              在线咨询
            </Link>
            <a href={`tel:${site.phone}`} className="btn-ghost num">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}