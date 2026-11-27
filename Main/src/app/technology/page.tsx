import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import PipeSection from "@/components/PipeSection";

export const metadata: Metadata = {
  title: "技术与研发 · 配方工艺 / 结构壁设计 / 连接技术",
  description: "江西惠洁管业的技术方向：原料配方与工艺参数、结构壁管型设计、热熔与电熔连接工艺、以及面向工程的选型计算支持。",
};

const directions = [
  { t: "原料与配方", d: "按产品用途匹配 PE100/PE80、PVC-U、PP-R、MPP 等专用料，控制炭黑含量与抗氧剂体系，兼顾耐候与卫生性能。" },
  { t: "挤出工艺", d: "通过机筒温度曲线、螺杆转速与牵引速度匹配，控制壁厚均匀性与外径公差，减少批次波动。" },
  { t: "结构壁设计", d: "双壁波纹与钢带增强结构在同等用料下提升环刚度，按埋深与荷载选择 SN4/SN8/SN12.5/SN16。" },
  { t: "连接技术", d: "热熔对接、电熔连接、承插密封三类工艺的参数量化与工艺评定，保证接口强度不低于管材本体。" },
];

const tools = [
  { k: "选型校核", v: "按设计流量、工作压力与温度折减系数确定 SDR 与壁厚" },
  { k: "埋深校核", v: "按覆土深度、荷载条件与回填材料确定环刚度等级" },
  { k: "工艺参数", v: "提供热熔/电熔温度、压力、时间参数表与焊口记录模板" },
  { k: "资料支持", v: "规格表 CSV、产品说明与标准条文对照，便于投标与报审" },
];

export default function TechnologyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "品质与研发", href: "/quality/" }, { label: "技术与研发" }]} />
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-10 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-7">
            <p className="eyebrow">TECHNOLOGY</p>
            <h1 className="h1 mt-3 text-ink">技术与研发</h1>
            <p className="lead mt-5">
              管材的技术含量集中在三件事：材料选得对不对、壁厚算得准不准、接口做得好不好。
              我们的研发工作围绕这三点展开，并把结论沉淀成客户可以直接使用的参数表。
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-xs border border-line bg-soft p-4">
              <PipeSection dn={400} en={23.5} sdr="SDR17" pn="PN1.0" className="w-full" />
              <p className="border-t border-line px-2 pt-3 text-[11px] text-ink-3">
                以 DN400 为例：SDR17 对应壁厚 23.5mm，理论米重约 15.2kg/m
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <p className="eyebrow">研发方向</p>
          <h2 className="h2 mt-2 text-ink">四个持续投入的方向</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {directions.map((d, i) => (
              <div key={d.t} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="num text-[13px] font-semibold text-brand">0{i + 1}</span>
                  <h3 className="text-[16px] font-semibold text-ink">{d.t}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-[1.9] text-ink-2">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">技术支持</p>
            <h2 className="h2 mt-2 text-ink">我们能替你算的部分</h2>
            <p className="mt-4 text-[14px] leading-[1.9] text-ink-2">
              工程师在选型时最常问的四件事，我们准备了对应的计算与资料支持。
            </p>
            <Link href="/contact/" className="btn-primary mt-6">
              提交技术需求
            </Link>
          </div>
          <div className="md:col-span-8">
            <div className="divide-y divide-line rounded-xs border border-line bg-white">
              {tools.map((t) => (
                <div key={t.k} className="grid gap-1 p-5 md:grid-cols-3">
                  <p className="text-[15px] font-semibold text-ink">{t.k}</p>
                  <p className="text-[13px] leading-relaxed text-ink-2 md:col-span-2">{t.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
              说明：以上为技术服务范围说明，具体计算结论需以设计单位出具的设计文件为准。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}