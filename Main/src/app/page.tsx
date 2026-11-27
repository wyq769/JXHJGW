import Link from "next/link";
import PipeSection from "@/components/PipeSection";
import PipeRing from "@/components/PipeRing";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import CaseCard from "@/components/CaseCard";
import QuickFinder from "@/components/QuickFinder";
import MediaFrame from "@/components/MediaFrame";
import { categories, products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { cases } from "@/content/cases";
import { news } from "@/content/news";
import { materialColor, site } from "@/content/site";

const dnMax = Math.max(...products.map((p) => p.dnRange[1]));
const dnMin = Math.min(...products.map((p) => p.dnRange[0]));
const standardList = Array.from(new Set(products.map((p) => p.standard)));
const hot = ["pe-water-pipe", "hdpe-double-wall-corrugated", "mpp-power-pipe", "pe-gas-pipe"]
  .map((s) => products.find((p) => p.slug === s)!)
  .filter(Boolean);

const stats = [
  { k: `${categories.length}`, u: "大产品系列", d: "给水 / 排水 / 电力 / 燃气 / 灌溉 / 海绵" },
  { k: `${products.length}`, u: "款主力产品", d: "每款都带规格矩阵" },
  { k: `DN${dnMin}–${dnMax}`, u: "口径覆盖", d: "盘管、直管、结构壁管" },
  { k: `${standardList.length}`, u: "项执行标准", d: "GB/T、CJ/T、DL/T、YD/T" },
];

const values = [
  { t: "按参数选型，不靠猜", d: "每个产品页提供口径、壁厚、尺寸比、压力等级与理论米重的完整规格表，支持按 DN 区间筛选与 CSV 导出。" },
  { t: "出厂检验与报告", d: "按 GB/T 与行业标准组织检验项目，可随货提供出厂检验报告，支持第三方检测委托。" },
  { t: "常规口径备货交付", d: "常用口径与压力等级常备库存，非常规规格按订单排产，交付周期提前告知。" },
  { t: "施工技术支持", d: "提供热熔/电熔工艺参数、回填与试压建议，必要时派技术人员配合现场交底。" },
];

const quality = [
  { k: "原料", v: "PE100 / PE80 专用料，入厂核验牌号与批次" },
  { k: "过程", v: "在线壁厚、外径监测 + 定尺切割记录" },
  { k: "成品", v: "静液压、环刚度、落锤冲击、拉伸屈服强度" },
  { k: "追溯", v: "按订单批次归档检验数据与焊口参数" },
];

const intro = [
  { t: "自有挤出生产线", d: "PE、PVC-U、PP-R 管材与结构壁管分线生产，常用口径常备库存。" },
  { t: "先给数据，再谈价格", d: "报价单直接对应口径、壁厚与执行标准，减少来回确认。" },
  { t: "江西本地交付", d: "厂址在永修云山经济开发区，省内项目供货与技术支持响应更快。" },
];

export default function Home() {
  const newsSorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute -left-44 top-0 h-[460px] w-[460px] rounded-full bg-[#1E6FA8]/25 blur-[130px]" />
        <div className="container-x relative grid gap-12 pb-2 pt-12 md:grid-cols-12 md:items-center md:pt-16">
          <div className="md:col-span-7 anim-in">
            <p className="flex items-center gap-3 text-[12px] tracking-[0.2em] text-white/50">
              <span className="h-px w-8 bg-white/40" />
              JIANGXI HUIJIE · 塑料管道制造
            </p>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.2] text-white md:text-[50px]">
              专注塑料管道制造
              <span className="mt-2 block text-[19px] font-semibold leading-[1.5] text-[#8FC0E8] md:text-[30px]">
                全口径 · 全材质 · 可查规格
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.95] text-white/70">
              给水 · 排水 · 电力通讯 · 燃气 · 农业灌溉 · 海绵城市六大系列，口径覆盖 <span className="whitespace-nowrap">DN{dnMin}–DN{dnMax}</span>。
              每一款产品都按「口径 / 壁厚 / 材质」给出可核对的规格数据，让选型与报价不再靠口头描述。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact/" className="btn-accent px-7">
                获取报价
                <span aria-hidden>→</span>
              </Link>
              <Link href="/products/" className="btn-ghost px-7">
                查看产品规格
              </Link>
              <a href={`tel:${site.phone}`} className="ml-1 text-[14px] text-white/60 hover:text-white">
                销售热线 <span className="num ml-1 text-[16px] font-semibold text-white">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="glow-brand rounded-xs border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <PipeSection dn={315} en={18.7} sdr="SDR17" pn="PN1.0" className="w-full" />
              <div className="flex items-center justify-between border-t border-white/10 px-2 pt-3 text-[11px] text-white/45">
                <span>示例：PE100 给水管 DN315 · SDR17 · PN1.0</span>
                <Link href="/products/pe-water-pipe/" className="text-[#8FC0E8] hover:underline">
                  规格表 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero 数据带 */}
        <div className="container-x relative mt-10 md:mt-12">
          <dl className="grid grid-cols-2 gap-y-7 border-t border-white/10 py-7 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.u} className="md:pr-6">
                <dd className="stat-k text-[30px] font-bold leading-none text-white md:text-[38px]">{s.k}</dd>
                <dt className="mt-2 text-[12px] tracking-wide text-white/55">{s.u}</dt>
                <p className="mt-1 hidden text-[11px] leading-snug text-white/30 md:block">{s.d}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 快速选型 */}
      <section className="container-x -mt-8 md:-mt-10">
        <QuickFinder />
      </section>

      {/* 走进惠洁 */}
      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-6">
            <div className="relative">
              <MediaFrame
                ratio="4/3"
                alt="江西惠洁管业永修厂区与挤出生产线"
                label="厂区 / 生产线实拍位"
                hint="建议提供：厂房外景、挤出生产线、成品堆场各 1 张（横构图）"
              />
              <div className="absolute -bottom-8 right-0 hidden w-[44%] md:block">
                <MediaFrame
                  ratio="3/2"
                  alt="质检与检测环节"
                  label="检测实拍位"
                  className="border-[6px] border-white shadow-[0_28px_56px_-34px_rgba(17,24,39,0.65)]"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <p className="eyebrow">走进惠洁</p>
            <h2 className="h2 mt-3 text-ink">
              一家把「参数写清楚」的
              <br className="hidden md:block" />
              江西管道制造企业
            </h2>
            <p className="mt-5 text-[14px] leading-[1.95] text-ink-2">
              江西惠洁管业科技有限公司成立于 2023 年，位于江西省九江市永修县云山经济开发区，
              主营塑料管道及配套制品的制造与销售，服务市政给排水、建筑给排水、电力通讯、燃气、
              农业灌溉与海绵城市六类工程。
            </p>
            <div className="mt-8 space-y-5">
              {intro.map((it, i) => (
                <div key={it.t} className="flex gap-4">
                  <span className="stat-k mt-0.5 text-[13px] font-semibold text-brand">0{i + 1}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{it.t}</p>
                    <p className="mt-1 text-[13px] leading-[1.85] text-ink-2">{it.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about/" className="mt-8 inline-flex items-center gap-1 text-[13px] text-brand hover:underline">
              更多关于我们 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 产品中心 */}
      <section className="section border-y border-line bg-soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="产品中心"
            title="六大系列，覆盖市政与建筑的管线需求"
            desc="按用途进入对应系列，可查看每个规格的口径、壁厚与压力/环刚度等级。"
            moreHref="/products/"
            moreLabel="全部产品与规格"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((c) => {
              const list = products.filter((p) => p.category === c.slug);
              const color = materialColor[list[0]?.material ?? ""] ?? "#12507F";
              return (
                <Link
                  key={c.slug}
                  href={`/products/#${c.slug}`}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-xs border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_22px_48px_-30px_rgba(20,105,91,0.5)]"
                >
                  <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: color }} />
                  <PipeRing color={color} size={62} />
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold text-ink group-hover:text-brand">{c.name}</h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">{c.en}</p>
                    <p className="mt-2 line-clamp-2 text-[12px] leading-[1.75] text-ink-2">{c.desc}</p>
                    <p className="stat-k mt-2 text-[12px] text-ink-3">
                      {list.length} 款产品 · DN{Math.min(...list.map((p) => p.dnRange[0]))}–
                      {Math.max(...list.map((p) => p.dnRange[1]))}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex items-end justify-between">
            <p className="text-[13px] tracking-[0.18em] text-ink-3">HOT PRODUCTS · 常用规格</p>
            <Link href="/products/" className="text-[13px] text-brand hover:underline">
              查看全部 16 款 →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hot.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 工厂与装备 */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="工厂与装备"
            title="看得见的产线，才谈得上稳定的批次"
            desc="从挤出、定型、冷却到牵引切割与在线测厚，关键工序都有设备与记录支撑。"
            moreHref="/technology/"
            moreLabel="技术与研发"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "挤出生产线实拍位", t: "管材挤出线", d: "PE / PVC-U / PP-R 分线生产，螺杆与机头按材质与口径配置。" },
              { label: "成品仓储实拍位", t: "成品仓储与定尺", d: "直管 6/9/12m、盘管 100/200m，常备口径随时发运。" },
              { label: "检测实验室实拍位", t: "检测与试验", d: "静液压、环刚度、落锤冲击、拉伸屈服强度按标准组织检验。" },
            ].map((it) => (
              <div key={it.t} className="group">
                <MediaFrame ratio="4/3" alt={it.t} label={it.label} hint="横构图 1600×1200 以上，避免逆光" />
                <p className="mt-4 text-[15px] font-semibold text-ink transition-colors group-hover:text-brand">{it.t}</p>
                <p className="mt-1.5 text-[13px] leading-[1.85] text-ink-2">{it.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            <span className="mr-2 text-[12px] text-ink-3">主要装备</span>
            {["挤出机", "真空定型箱", "喷淋冷却", "牵引机", "自动切割", "在线测厚", "静液压试验机", "环刚度试验机"].map((e) => (
              <span key={e} className="tag">
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 解决方案 */}
      <section className="band-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="container-x relative section">
          <SectionHeading
            eyebrow="解决方案"
            title="从工程场景出发，配一整套管"
            desc="我们按项目类型给出成套管材配置：主干、支管、检查井与配套件，避免不同标段各买各的。"
            moreHref="/solutions/"
            moreLabel="全部解决方案"
            light
          />
          <div className="grid gap-4 md:grid-cols-3">
            {solutions.map((s, i) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}/`}
                className="group relative overflow-hidden rounded-xs border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xs bg-white/10 text-[#8FC0E8]">
                    <span className="stat-k text-[13px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/30">{s.en}</span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-white">{s.name}</h3>
                <p className="mt-2.5 line-clamp-3 text-[13px] leading-[1.85] text-white/55">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[13px] text-[#8FC0E8]">
                  了解方案 <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 工程案例 */}
      <section className="section border-b border-line bg-soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="工程案例"
            title="项目现场是最好的说明书"
            desc="下列项目由本公司实际供货，项目名称、管材规格与用量取自购销/采购合同；合同编号与金额不在网站披露。"
            moreHref="/cases/"
            moreLabel="更多案例"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {cases.slice(0, 3).map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </div>
      </section>

      {/* 品质与标准 */}
      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow">品质与研发</p>
            <h2 className="h2 mt-3 text-ink">从原料牌号到出厂报告，每个环节都留得下记录</h2>
            <p className="mt-5 text-[14px] leading-[1.95] text-ink-2">
              公司按 GB/T 19001 建立质量管理体系，关键工序设置质量控制点。
              对客户而言，这意味着同一批次的壁厚偏差、环刚度与静液压性能是稳定可预期的。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quality/" className="btn-primary">
                查看检验项目
              </Link>
              <Link href="/technology/" className="btn-outline">
                技术与研发
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-xs border border-line bg-line sm:grid-cols-2">
              {quality.map((q, i) => (
                <div key={q.k} className="bg-white p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="stat-k text-[13px] font-semibold text-brand">0{i + 1}</span>
                    <p className="text-[14px] font-semibold text-ink">{q.k}</p>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.85] text-ink-2">{q.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[12px] text-ink-3">执行标准</span>
              {standardList.slice(0, 8).map((s) => (
                <span key={s} className="tag-brand">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 新闻 */}
      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <SectionHeading eyebrow="新闻资讯" title="公司与行业动态" moreHref="/news/" moreLabel="全部资讯" />
          <ul className="divide-y divide-line border-y border-line">
            {newsSorted.slice(0, 4).map((n) => (
              <li key={n.slug}>
                <Link href={`/news/${n.slug}/`} className="group flex flex-col gap-2 py-5 md:flex-row md:items-center md:gap-8">
                  <span className="stat-k shrink-0 text-[13px] text-ink-3 md:w-28">{n.date}</span>
                  <span className="tag-brand shrink-0">{n.category}</span>
                  <span className="text-[15px] text-ink transition-colors group-hover:text-brand">{n.title}</span>
                  <span className="ml-auto hidden shrink-0 text-[13px] text-ink-3 transition-transform group-hover:translate-x-1 md:block">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-accent">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="container-x relative flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14">
          <div>
            <h2 className="text-[24px] font-bold text-white md:text-[30px]">需要报价或选型支持？</h2>
            <p className="mt-2 text-[14px] text-white/80">告诉我们口径、压力等级与用量，1 个工作小时内给出报价与供货周期。</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${site.phone}`} className="stat-k flex items-center gap-2 text-[22px] font-bold text-white">
              <span className="text-[15px] font-normal text-white/70">销售热线</span>
              {site.phoneDisplay}
            </a>
            <Link href="/contact/" className="btn bg-white px-7 text-accent hover:bg-white/90">
              在线询价
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
