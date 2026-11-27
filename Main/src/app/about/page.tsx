import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import MediaFrame from "@/components/MediaFrame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "关于我们 · 江西惠洁管业科技有限公司",
  description:
    "江西惠洁管业科技有限公司成立于 2023 年，位于江西省九江市永修县云山经济开发区，主营塑料制品制造、工程塑料及合成树脂制造与销售，专注塑料管道产品。",
};

const basic = [
  { k: "公司名称", v: site.name },
  { k: "统一社会信用代码", v: "91360425MAC95K05X0" },
  { k: "法定代表人", v: "刘华成" },
  { k: "注册资本", v: site.capital },
  { k: "成立日期", v: "2023 年 03 月 03 日" },
  { k: "公司地址", v: site.address },
  { k: "经营范围", v: "塑料制品制造；新材料技术研发；工程塑料及合成树脂制造；塑料制品销售；合成材料制造（不含危险化学品）；合成材料销售。" },
];

const timeline = [
  { y: "2023", t: "公司成立", d: "落户江西省九江市永修县云山经济开发区，确定以塑料管道为主营方向。" },
  { y: "2024", t: "产线投建", d: "完成 PE、PVC-U 管材挤出生产线布局，形成给水与排水管材供货能力。" },
  { y: "2025", t: "品类扩展", d: "新增电力通讯护套管、燃气管、灌溉管与海绵城市配套产品，覆盖六大系列。" },
  { y: "2026", t: "体系与品牌", d: "按 GB/T 19001 建立质量管理体系，推进官网与对外品牌体系建设。" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "关于我们" }]} />

      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">ABOUT US</p>
          <h1 className="h1 mt-3 text-white">关于惠洁</h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-[1.95] text-white/70">
            江西惠洁管业科技有限公司是一家以塑料管道制造为核心的技术型企业，
            产品覆盖给水、排水、电力通讯、燃气、农业灌溉与海绵城市配套六大领域。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">公司简介</p>
            <h2 className="h2 mt-2 text-ink">做一根参数说得清的管子</h2>
            <div className="prose-cn mt-5">
              <p>
                {site.name}成立于 2023 年 3 月，注册于江西省九江市永修县云山经济开发区军山荣棋大道北侧 6 号，
                注册资本 {site.capital}。公司经营范围覆盖塑料制品制造、新材料技术研发、工程塑料及合成树脂制造与销售。
              </p>
              <p>
                我们把产品线收敛在「管道」这一件事上：给水管、排水排污管、电力通讯护套管、燃气管、
                农业灌溉管以及海绵城市配套制品。围绕这些产品，公司建立了从原料牌号核验、挤出工艺控制到成品检验的流程，
                并为每个规格提供口径、壁厚、尺寸比与压力等级的对照数据。
              </p>
              <p>
                对客户来说，这意味着在报价前就能确认自己买到的是什么：DN 是多少、壁厚多少毫米、执行哪一个标准、
                能承受多大的工作压力或环刚度。我们希望把这类「本该说清楚的信息」放在官网上，而不是只写在一张报价单里。
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "主营方向", v: "塑料管道制造" },
                { k: "产品系列", v: "六大系列 16 款" },
                { k: "口径覆盖", v: "DN20–DN2200" },
              ].map((it) => (
                <div key={it.k} className="rounded-xs border border-line p-4">
                  <p className="text-[12px] text-ink-3">{it.k}</p>
                  <p className="mt-1 text-[14px] font-semibold text-ink">{it.v}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-xs border border-line bg-soft p-6">
              <h3 className="text-[15px] font-semibold text-ink">工商信息</h3>
              <dl className="mt-4 space-y-3 text-[13px]">
                {basic.map((b) => (
                  <div key={b.k} className="flex gap-3 border-b border-line/70 pb-3 last:border-0 last:pb-0">
                    <dt className="w-24 shrink-0 text-ink-3">{b.k}</dt>
                    <dd className="text-ink">{b.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-3">
                以上信息以市场监督管理部门登记为准，营业执照可在联系我们页面索取复印件。
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-white py-10 md:py-14">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          <MediaFrame alt="惠洁管业厂区全景" label="厂区全景实拍位" hint="横构图 1600×1200 以上" ratio="4/3" />
          <MediaFrame alt="惠洁管业挤出车间" label="挤出车间实拍位" hint="横构图 1600×1200" ratio="4/3" />
          <MediaFrame alt="惠洁管业实验室" label="实验室 / 检测实拍位" hint="横构图 1600×1200" ratio="4/3" />
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <p className="eyebrow">发展历程</p>
          <h2 className="h2 mt-2 text-ink">一步一个品类地做</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.y} className="relative rounded-xs border border-line bg-white p-5">
                <span className="num text-[26px] font-bold text-brand/25">{t.y}</span>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">{t.t}</h3>
                <p className="mt-2 text-[13px] leading-[1.8] text-ink-2">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">主体说明</p>
            <h2 className="h2 mt-2 text-ink">关于公司名称</h2>
          </div>
          <div className="md:col-span-8">
            <div className="rounded-xs border-l-2 border-brand bg-soft p-6 text-[14px] leading-[1.95] text-ink-2">
              <p>
                {site.name}与河南惠洁管业有限公司为各自独立经营的法人主体，双方为姊妹公司关系，
                在股权与经营上相互独立。本网站所展示的产品、规格、标准与服务承诺，
                均指江西惠洁管业科技有限公司自身提供的产品与服务。
              </p>
              <p className="mt-3">
                如您希望确认具体项目的供货主体与合同签订方，请与我们联系核对。
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact/" className="btn-primary">
                联系我们
              </Link>
              <Link href="/products/" className="btn-outline">
                查看产品
              </Link>
              <Link href="/careers/" className="btn-outline">
                加入我们
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}