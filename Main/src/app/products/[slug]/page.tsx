import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MediaFrame from "@/components/MediaFrame";
import PipeSection from "@/components/PipeSection";
import PipeRing from "@/components/PipeRing";
import ProductCard from "@/components/ProductCard";
import SpecExplorer from "@/components/SpecExplorer";
import InquiryForm from "@/components/InquiryForm";
import { getCategory, getProduct, products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "产品未找到" };
  return {
    title: `${p.name} 规格参数 · DN${p.dnRange[0]}–${p.dnRange[1]}`,
    description: `${p.name}，执行 ${p.standard}，口径 DN${p.dnRange[0]}–${p.dnRange[1]}，${(p.stiffness ?? p.pressure ?? []).join(" / ")}。提供口径壁厚规格表、连接方式与询价。`,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const relatedSolutions = solutions.filter((s) => s.products.includes(p.slug));

  const dnOptions = Array.from(new Set(p.spec.rows.map((r) => `DN${r[0]}`)));
  const pnList = p.stiffness ?? p.pressure ?? [];
  const levelLabel = p.stiffness ? "环刚度等级" : "压力等级";

  // 只有"口径 × 压力/环刚度"矩阵的产品才画剖面图（水表箱、雨水模块、检查井等结构件不适用）。
  const isPipeSection = Boolean(p.pressure || p.stiffness);
  // 示例规格取有代表性的一档：优先常用压力/环刚度等级，再取口径中位数，避免落到边界规格。
  const preferLevel = p.stiffness ? "SN8" : "PN1.0";
  const preferred = p.spec.rows.filter((r) => String(r[3]) === preferLevel);
  const pool = isPipeSection && preferred.length ? preferred : p.spec.rows;
  const midRow = pool[Math.floor(pool.length / 2)] ?? p.spec.rows[0];

  let sampleDn = Number(p.spec.rows[0]?.[0]) || p.dnRange[0];
  let sampleEn = Math.round(sampleDn / 17);
  let sampleSdr = "—";
  let samplePm = "—";
  if (isPipeSection && midRow) {
    if (p.stiffness) {
      // 结构壁管：列为「DN/ID、内径、外径、环刚度、重量」，壁厚按（外径−内径）/2 示意
      const id = Number(midRow[1]);
      const od = Number(midRow[2]);
      sampleDn = od;
      sampleEn = Math.round(((od - id) / 2) * 10) / 10;
      sampleSdr = "结构壁";
      samplePm = String(midRow[3]);
    } else {
      // 压力管：列为「公称外径、壁厚、尺寸比、压力等级、米重」
      sampleDn = Number(midRow[0]);
      sampleEn = Number(midRow[1]);
      sampleSdr = String(midRow[2]);
      samplePm = String(midRow[3]);
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: "产品中心", href: "/products/" }, { label: cat.name, href: `/products/#${cat.slug}` }, { label: p.name }]} />

      {/* 产品头部 */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-10 py-10 md:grid-cols-12 md:py-14">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag-brand">{p.material}</span>
              <span className="tag">{cat.name}</span>
              <span className="tag">执行标准 {p.standard}</span>
            </div>
            <h1 className="h1 mt-4 text-ink">{p.name}</h1>
            <p className="lead mt-4 max-w-2xl">{p.summary}</p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
              {[
                { k: "口径范围", v: `DN${p.dnRange[0]}–${p.dnRange[1]}` },
                // 只有压力管/结构壁管才有等级项，避免结构件出现空的"压力等级"
                ...(pnList.length ? [{ k: levelLabel, v: pnList.join(" / ") }] : []),
                { k: "连接方式", v: p.connection.join(" / ") },
                { k: "供货长度", v: p.length },
                { k: "外观", v: p.colorDesc },
                { k: "材质", v: p.material },
              ].map((it) => (
                <div key={it.k}>
                  <dt className="text-[12px] text-ink-3">{it.k}</dt>
                  <dd className="mt-0.5 text-[14px] text-ink">{it.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#inquiry" className="btn-accent px-7">
                获取报价
              </a>
              <a href="#spec" className="btn-outline px-7">
                查看规格表
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xs border border-line bg-soft p-4">
              {isPipeSection ? (
                <PipeSection dn={sampleDn} en={sampleEn} sdr={sampleSdr} pn={samplePm} className="w-full" />
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 px-6 text-center">
                  <PipeRing color="#12507F" size={96} />
                  <p className="text-[13px] leading-[1.9] text-ink-2">
                    {p.name}属于结构件/配套件，规格以
                    <a href="#spec" className="mx-1 text-brand hover:underline">
                      规格参数表
                    </a>
                    为准。
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-line px-2 pt-3 text-[11px] text-ink-3">
                <span>
                  {isPipeSection ? `示例规格：DN${sampleDn} · ${sampleSdr} · ${samplePm}` : `共 ${p.spec.rows.length} 种常规规格`}
                </span>
                <a href="#spec" className="text-brand hover:underline">
                  全部规格 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特点与应用 */}
      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">产品特点</p>
            <h2 className="h2 mt-2 text-ink">为什么这样设计</h2>
            <ul className="mt-6 space-y-3">
              {p.features.map((f, i) => (
                <li key={f} className="flex gap-3 rounded-xs border border-line p-4">
                  <span className="num shrink-0 text-[13px] font-semibold text-brand">0{i + 1}</span>
                  <span className="text-[14px] leading-relaxed text-ink-2">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow">典型应用</p>
            <h2 className="h2 mt-2 text-ink">适用场景</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.applications.map((a) => (
                <span key={a} className="rounded-xs border border-line bg-soft px-3 py-1.5 text-[13px] text-ink-2">
                  {a}
                </span>
              ))}
            </div>
            {relatedSolutions.length > 0 && (
              <>
                <h3 className="mt-8 text-[14px] font-semibold text-ink">相关解决方案</h3>
                <ul className="mt-3 space-y-2">
                  {relatedSolutions.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/solutions/${s.slug}/`} className="group flex items-center justify-between rounded-xs border border-line px-4 py-2.5 text-[13px] hover:border-brand/40">
                        <span className="text-ink group-hover:text-brand">{s.name}</span>
                        <span className="text-ink-3 transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-8 rounded-xs bg-brand-tint p-5">
              <p className="text-[13px] font-semibold text-brand">需要选型建议？</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
                告诉我们的工程条件（管径、压力、埋深或敷设方式），我们给出材质、压力等级与壁厚的建议。
              </p>
              <a href={`tel:${site.phone}`} className="num mt-3 inline-block text-[16px] font-semibold text-brand">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 产品影像 */}
      <section className="border-t border-line bg-white py-10 md:py-12">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <MediaFrame alt={`${p.name} 产品实拍`} label={`${p.name} 产品实拍位`} hint="白底或浅灰底，横构图 1600×900" ratio="16/9" />
          <MediaFrame alt={`${p.name} 应用场景`} label={`${p.name} 应用场景实拍位`} hint="现场施工/敷设照片，横构图 1600×900" ratio="16/9" />
        </div>
      </section>

      {/* 规格表 */}
      <section id="spec" className="section scroll-mt-24 border-t border-line bg-soft">
        <div className="container-x">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">SPECIFICATIONS</p>
              <h2 className="h2 mt-2 text-ink">规格参数表</h2>
              <p className="mt-2 text-[13px] text-ink-2">
                共 {p.spec.rows.length} 个规格组合，执行标准 {p.standard}；理论米重按密度估算，仅供报价参考。
              </p>
            </div>
            <p className="text-[12px] text-ink-3">支持按口径区间筛选 / 导出 CSV</p>
          </div>
          <SpecExplorer spec={p.spec} productName={p.name} />
        </div>
      </section>

      {/* 询价 */}
      <section id="inquiry" className="section scroll-mt-24">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">INQUIRY</p>
            <h2 className="h2 mt-2 text-ink">询价与技术支持</h2>
            <p className="mt-4 text-[14px] leading-[1.9] text-ink-2">
              填写需求后，销售工程师通常在 1 个工作小时内回复，包含单价、供货周期与运输方式。
              如需现场技术交底，请在留言中说明项目地点。
            </p>
            <ul className="mt-6 space-y-3 text-[13px] text-ink-2">
              <li className="flex items-center gap-2">
                <span className="text-brand">☎</span>
                <a href={`tel:${site.phone}`} className="num font-semibold text-brand">
                  {site.phoneDisplay}
                </a>
                <span className="text-ink-3">（{site.contactName}）</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand">⌂</span>
                {site.address}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand">◷</span>
                {site.hours}
              </li>
            </ul>
          </div>
          <div className="md:col-span-8">
            <div className="rounded-xs border border-line bg-white p-6 md:p-8">
              <InquiryForm defaultProduct={p.name} compact dnOptions={dnOptions} pnOptions={pnList} />
            </div>
          </div>
        </div>
      </section>

      {/* 同系列 */}
      {related.length > 0 && (
        <section className="section border-t border-line bg-soft">
          <div className="container-x">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="h2 text-ink">同系列产品</h2>
              <Link href="/products/" className="text-[13px] text-brand hover:underline">
                全部产品 →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}