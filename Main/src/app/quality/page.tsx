import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "品质与认证 · 检验项目与执行标准",
  description: "江西惠洁管业按 GB/T 19001 建立质量管理体系，执行 GB/T 13663.2、GB/T 5836.1、GB/T 19472.1、GB 15558.1 等标准，产品经静液压、环刚度、落锤冲击等检验。",
};

const points = [
  { t: "原料入厂核验", d: "核对 PE100/PE80、PVC-U 树脂等原料的牌号、批次与合格证明，避免混料与回用料失控。" },
  { t: "在线过程控制", d: "挤出过程监测外径、壁厚与外观，定尺切割记录可回溯至班次与机台。" },
  { t: "成品性能检验", d: "按产品标准执行静液压试验、环刚度、落锤冲击、拉伸屈服强度、维卡软化温度等项目。" },
  { t: "批次可追溯", d: "按订单批次归档检验数据、原料批次与工艺参数，支持客户索取出厂检验报告。" },
];

const items = [
  { std: "GB/T 13663.2-2018", name: "PE 给水管", test: "静液压、断裂伸长率、纵向回缩率、卫生性能" },
  { std: "GB/T 5836.1-2018", name: "PVC-U 排水管", test: "拉伸屈服强度、落锤冲击、维卡软化温度、扁平试验" },
  { std: "GB/T 19472.1-2019", name: "HDPE 双壁波纹管", test: "环刚度、环柔性、烘箱试验、落锤冲击" },
  { std: "GB 15558.1-2015", name: "PE 燃气管", test: "静液压、耐快速裂纹扩展、氧化诱导时间" },
  { std: "DL/T 802.7-2010", name: "MPP 电力护套管", test: "环刚度、维卡软化温度、抗压扁平" },
  { std: "GB/T 18742.2-2017", name: "PP-R 给水管", test: "静液压、简支梁冲击、纵向回缩率" },
];

export default function QualityPage() {
  const stdList = Array.from(new Set(products.map((p) => p.standard)));
  return (
    <>
      <Breadcrumb items={[{ label: "品质与研发", href: "/quality/" }, { label: "品质与认证" }]} />
      <section className="border-b border-line bg-white">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow">QUALITY</p>
          <h1 className="h1 mt-3 text-ink">品质与认证</h1>
          <p className="lead mt-5 max-w-3xl">
            管材是埋在墙里、埋在地下的产品，出问题时返工成本远高于材料本身。
            我们把质量控制放在「原料—过程—成品—追溯」四条线上，并坚持随货提供检验数据。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {points.map((p, i) => (
            <div key={p.t} className="card p-6">
              <span className="num text-[13px] font-semibold text-brand">0{i + 1}</span>
              <h3 className="mt-2 text-[16px] font-semibold text-ink">{p.t}</h3>
              <p className="mt-2 text-[13px] leading-[1.9] text-ink-2">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <p className="eyebrow">检验项目</p>
          <h2 className="h2 mt-2 text-ink">主要产品与检验项目对照</h2>
          <div className="mt-6 overflow-x-auto rounded-xs border border-line bg-white">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>执行标准</th>
                  <th>产品</th>
                  <th>主要检验项目</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.std}>
                    <td className="num">{it.std}</td>
                    <td>{it.name}</td>
                    <td className="whitespace-normal">{it.test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
            注：具体检验项目以对应产品标准与合同技术协议为准；认证证书、检测报告等资质文件正在办理与整理，
            可联系我们索取最新版本。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">执行标准</p>
            <h2 className="h2 mt-2 text-ink">我们按标准做产品</h2>
            <p className="mt-4 text-[14px] leading-[1.9] text-ink-2">
              每款产品在详情页标注执行标准，规格表中的壁厚与尺寸比均按标准尺寸比推算，便于设计院与监理核对。
            </p>
            <Link href="/products/" className="btn-outline mt-6">
              查看产品规格
            </Link>
          </div>
          <div className="md:col-span-8">
            <ul className="grid gap-2 sm:grid-cols-2">
              {stdList.map((s) => (
                <li key={s} className="num rounded-xs border border-line px-4 py-3 text-[13px] text-ink-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}