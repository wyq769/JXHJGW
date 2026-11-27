import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "服务支持 · 选型报价 / 供货交付 / 技术售后",
  description: "江西惠洁管业服务支持：选型与报价、样品与资料、排产交付、施工技术指导与售后响应，销售热线 181-7892-5551。",
};

const promises = [
  { k: "1 小时", v: "工作时间内询价响应", d: "提交询价后由销售或技术支持在 1 个工作小时内回复，含口径与壁厚确认。" },
  { k: "2 类资料", v: "规格表 + 标准对照", d: "提供产品规格表 CSV 与执行标准条文对照，便于投标与报审。" },
  { k: "3 类工艺", v: "热熔 / 电熔 / 承插", d: "提供工艺参数表、焊口记录模板与现场指导。" },
  { k: "全程", v: "质量问题跟踪到批次", d: "按批次归档检验数据，出现质量疑问可回溯原料与工艺记录。" },
];

const steps = [
  { t: "需求沟通", d: "说明用途、介质、工作压力、埋深或敷设方式、需求量与交期。" },
  { t: "选型报价", d: "确定材质、SDR 或环刚度等级、口径与连接方式，出具报价单与规格清单。" },
  { t: "排产交付", d: "按合同排产，定尺切割、标识与包装，安排发货并同步物流信息。" },
  { t: "施工配合", d: "提供连接工艺参数、现场技术指导与焊口/接口验收要点。" },
];

const faq = [
  { q: "同一口径不同压力等级怎么选？", a: "压力等级由 SDR 决定，SDR 越小壁厚越厚、承压越高。常规给水按设计工作压力乘安全系数后选取 PN1.0 或 PN1.6，具体请提供设计参数由我们协助核算。" },
  { q: "埋在车行道下需要什么环刚度？", a: "一般绿化带与行人区可选 SN4，车行道及覆土较深区域建议 SN8 及以上；钢带增强螺旋管可按 SN12.5/SN16 供货。" },
  { q: "能不能按定尺长度供货？", a: "可以。PE 盘管与直管、PVC-U 直管均可按项目定尺切割，定尺长度请在下单时注明，避免现场二次切割造成浪费。" },
  { q: "是否提供样品与检测报告？", a: "提供样品与技术资料。出厂检验报告随货提供，第三方检测报告按项目需要另行安排。" },
  { q: "最小起订量是多少？", a: "常规规格按整支或整盘起订，具体以规格与库存情况确认；工程批量订单可单独协商排产。" },
];

export default function ServicePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "服务支持" }]} />
      <section className="border-b border-line bg-white">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow">SERVICE</p>
          <h1 className="h1 mt-3 text-ink">服务支持</h1>
          <p className="lead mt-5 max-w-3xl">
            从选型到施工，我们把「参数确认」放在最前面：管径、壁厚、压力等级、环刚度、连接方式，
            先确认清楚，再谈价格与交期。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phone}`} className="btn-accent">
              销售热线 {site.phoneDisplay}
            </a>
            <Link href="/contact/" className="btn-outline">
              在线询价
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-4 md:grid-cols-4">
          {promises.map((p) => (
            <div key={p.k} className="card p-5">
              <p className="num text-[24px] font-bold text-brand">{p.k}</p>
              <h3 className="mt-1 text-[14px] font-semibold text-ink">{p.v}</h3>
              <p className="mt-2 text-[12.5px] leading-[1.85] text-ink-2">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x">
          <p className="eyebrow">服务流程</p>
          <h2 className="h2 mt-2 text-ink">四步走完一个订单</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.t} className="relative rounded-xs border border-line bg-white p-5">
                <span className="num text-[13px] font-semibold text-brand">0{i + 1}</span>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-[13px] leading-[1.85] text-ink-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">常见问题</p>
            <h2 className="h2 mt-2 text-ink">选型常遇到的五个问题</h2>
            <p className="mt-4 text-[14px] leading-[1.9] text-ink-2">
              如果没有找到答案，把工程条件发给我们，由技术支持协助核算。
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="divide-y divide-line rounded-xs border border-line">
              {faq.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-ink">
                    {f.q}
                    <span className="text-brand transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-[13px] leading-[1.9] text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x max-w-3xl">
          <div className="rounded-xs border border-line bg-white p-6 md:p-8">
            <h2 className="h3 text-ink">提交技术或商务需求</h2>
            <p className="mt-2 text-[13px] text-ink-2">
              填写后我们会在 1 个工作小时内联系您确认参数。
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}