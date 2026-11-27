import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MediaFrame from "@/components/MediaFrame";
import { cases, getCase } from "@/content/cases";
import { getProduct } from "@/content/products";
import { getSolution } from "@/content/solutions";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "案例未找到" };
  return { title: c.title, description: `${c.location} · ${c.year} · ${c.scale}` };
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const sol = getSolution(c.solution);
  const list = c.products.map((x) => getProduct(x)).filter(Boolean);
  const others = cases.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb items={[{ label: "工程案例", href: "/cases/" }, { label: c.title }]} />
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            {c.location} · {c.year}
          </p>
          <h1 className="h1 mt-3 max-w-4xl text-white">{c.title}</h1>
          <p className="mt-4 text-[14px] text-white/70">{c.scale}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="h2 text-ink">项目概况</h2>
            <p className="mt-4 text-[15px] leading-[1.95] text-ink-2">{c.summary}</p>

            <h2 className="h2 mt-10 text-ink">供货清单</h2>
            <p className="mt-2 text-[13px] text-ink-3">以下为合同约定的产品与暂定数量，实际供货量按现场进度结算。</p>
            <div className="mt-4 overflow-x-auto rounded-xs border border-line">
              <table className="w-full min-w-[560px] border-collapse text-[13px]">
                <thead>
                  <tr className="bg-soft text-left text-ink-2">
                    <th className="px-4 py-3 font-medium">产品名称</th>
                    <th className="px-4 py-3 font-medium">规格型号</th>
                    <th className="px-4 py-3 font-medium">数量</th>
                  </tr>
                </thead>
                <tbody>
                  {c.materials.map((m) => (
                    <tr key={`${m.name}-${m.spec}`} className="border-t border-line">
                      <td className="px-4 py-3 text-ink">{m.name}</td>
                      <td className="px-4 py-3 text-ink-2">{m.spec}</td>
                      <td className="num px-4 py-3 text-ink">{m.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="h2 mt-10 text-ink">供货与服务</h2>
            <ul className="mt-4 space-y-3">
              {c.supply.map((s, i) => (
                <li key={s} className="flex gap-3 rounded-xs border border-line p-4">
                  <span className="num shrink-0 text-[13px] font-semibold text-brand">0{i + 1}</span>
                  <span className="text-[14px] leading-relaxed text-ink-2">{s}</span>
                </li>
              ))}
            </ul>

            <h2 className="h2 mt-10 text-ink">现场影像</h2>
            {c.images?.length ? (
              <div className={`mt-4 grid gap-4 ${c.images.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : c.images.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                {c.images.map((img) => (
                  <figure key={img.src}>
                    <MediaFrame src={img.src} alt={img.caption} ratio="4/5" />
                    <figcaption className="mt-2 text-[12px] leading-relaxed text-ink-3">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <MediaFrame alt="项目现场" label="项目现场实拍位" hint="施工/敷设阶段照片" ratio="4/3" />
                <MediaFrame alt="竣工实拍位" label="竣工实拍位" hint="完工后的检查井/管网照片" ratio="4/3" />
              </div>
            )}

            <p className="mt-8 rounded-xs bg-soft p-4 text-[12px] leading-relaxed text-ink-3">
              说明：项目名称、管材规格与用量取自双方签订的购销/采购合同；合同编号、单价与合同金额不在网站披露。页面配图为本公司管道施工现场实拍。
            </p>
          </div>
          <aside className="md:col-span-4">
            <div className="rounded-xs border border-line p-5">
              <h3 className="text-[14px] font-semibold text-ink">项目信息</h3>
              <dl className="mt-3 space-y-3 text-[13px]">
                <div>
                  <dt className="text-ink-3">项目地点</dt>
                  <dd className="text-ink">{c.location}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">实施年份</dt>
                  <dd className="num text-ink">{c.year}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">主要管材合计</dt>
                  <dd className="num text-ink">{c.totalLength}</dd>
                </div>
                {sol && (
                  <div>
                    <dt className="text-ink-3">所属方案</dt>
                    <dd>
                      <Link href={`/solutions/${sol.slug}/`} className="text-brand hover:underline">
                        {sol.name}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {list.length > 0 && (
              <div className="mt-4 rounded-xs border border-line p-5">
                <h3 className="text-[14px] font-semibold text-ink">使用产品</h3>
                <ul className="mt-3 space-y-2 text-[13px]">
                  {list.map((p) => (
                    <li key={p!.slug}>
                      <Link href={`/products/${p!.slug}/`} className="flex items-center justify-between text-ink-2 hover:text-brand">
                        {p!.name}
                        <span className="text-ink-3">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <h2 className="h2 mb-6 text-ink">其他案例</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/cases/${o.slug}/`} className="card card-hover p-5">
                <p className="num text-[12px] text-ink-3">
                  {o.location} · {o.year}
                </p>
                <h3 className="mt-2 text-[15px] font-semibold text-ink">{o.title}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] text-ink-2">{o.scale}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
