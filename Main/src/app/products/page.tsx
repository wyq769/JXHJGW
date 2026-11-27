import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/content/products";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "产品中心 · 给水/排水/电力通讯/燃气/灌溉/海绵城市管材",
  description:
    "江西惠洁管业产品中心：PE给水管、PVC-U给水管、PP-R给水管、HDPE双壁波纹管、钢带增强螺旋波纹管、塑料检查井、MPP/CPVC电力护套管、通信管、PE燃气管、灌溉管与海绵城市配套，提供完整口径壁厚规格表。",
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "产品中心" }]} />

      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="eyebrow eyebrow-light">PRODUCTS</p>
          <h1 className="h1 mt-3 text-white">产品中心</h1>
          <p className="lead mt-5 max-w-3xl text-white/70">
            六大系列 {products.length} 款主力产品，口径覆盖 DN
            {Math.min(...products.map((p) => p.dnRange[0]))}–{Math.max(...products.map((p) => p.dnRange[1]))}。
            每款产品提供口径、壁厚、尺寸比、压力等级（或环刚度）与理论米重的完整规格表，支持按口径区间筛选并导出 CSV。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-xs border border-white/25 px-3 py-1.5 text-[13px] text-white/75 transition-colors hover:border-white hover:text-white"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {categories.map((c, idx) => {
        const list = products.filter((p) => p.category === c.slug);
        return (
          <section key={c.slug} id={c.slug} className={`scroll-mt-24 ${idx % 2 ? "bg-soft" : "bg-white"}`}>
            <div className="container-x py-12 md:py-16">
              <div className="mb-7 flex flex-col gap-3 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <h2 className="h2 text-ink">{c.name}</h2>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-3">{c.en}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[14px] text-ink-2">{c.desc}</p>
                </div>
                <p className="text-[12px] text-ink-3">
                  {list.length} 款产品　|　常用场景：{c.useCases.join(" / ")}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-line bg-white">
        <div className="container-x py-12">
          <div className="flex flex-col items-start justify-between gap-5 rounded-xs border border-line bg-soft p-6 md:flex-row md:items-center">
            <div>
              <h3 className="h3 text-ink">没有找到需要的口径或压力等级？</h3>
              <p className="mt-1 text-[13px] text-ink-2">
                非常规规格可按订单排产，请提供口径、壁厚/压力等级、执行标准与用量，我们给出可行性与交期。
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact/" className="btn-accent">
                提交需求
              </Link>
              <a href={`tel:${site.phone}`} className="btn-outline num">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}