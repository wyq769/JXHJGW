import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import MediaFrame from "@/components/MediaFrame";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "联系我们 · 地址 / 电话 / 微信",
  description: `${site.name}，地址：${site.address}，销售热线 ${site.phoneDisplay}，工作时间 ${site.hours}。`,
};

const cards = [
  { k: "销售热线", v: site.phoneDisplay, sub: `${site.contactName}`, href: `tel:${site.phone}` },
  { k: "工作时间", v: site.hours, sub: "节假日请留言或微信联系" },
  { k: "电子邮箱", v: site.email, sub: "邮件请附规格与需求量", href: `mailto:${site.email}` },
  { k: "公司地址", v: site.addressShort, sub: site.address },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "联系我们" }]} />
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">CONTACT</p>
          <h1 className="h1 mt-3 text-white">联系我们</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.95] text-white/70">
            询价、索样、技术支持或到厂参观，都可以直接联系我们。把口径与需求量说清楚，报价会更快。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-4 md:grid-cols-4">
          {cards.map((c) => (
            <div key={c.k} className="card p-5">
              <p className="text-[12px] text-ink-3">{c.k}</p>
              {c.href ? (
                <a href={c.href} className="mt-1 block text-[15px] font-semibold text-ink hover:text-brand">
                  {c.v}
                </a>
              ) : (
                <p className="mt-1 text-[15px] font-semibold text-ink">{c.v}</p>
              )}
              <p className="mt-2 text-[12px] leading-[1.8] text-ink-2">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-line bg-soft">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-xs border border-line bg-white p-6 md:p-8">
              <h2 className="h3 text-ink">在线询价</h2>
              <p className="mt-2 text-[13px] text-ink-2">
                填写需求后我们会在 1 个工作小时内联系您确认参数与交期。
              </p>
              <div className="mt-6">
                <InquiryForm />
              </div>
            </div>
          </div>

          <div className="md:col-span-5" id="wechat">
            <div className="rounded-xs border border-line bg-white p-6">
              <h3 className="text-[15px] font-semibold text-ink">微信联系</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
                扫码添加微信，发送图纸或规格清单更快。
              </p>
              <div className="mt-4 flex justify-center">
                <div className="flex h-[180px] w-[180px] items-center justify-center rounded-xs border border-dashed border-line bg-soft">
                  <span className="text-center text-[11px] leading-relaxed text-ink-3">
                    微信二维码
                    <br />
                    待上传
                  </span>
                </div>
              </div>
              <dl className="mt-5 space-y-3 border-t border-line pt-4 text-[12.5px]">
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 text-ink-3">联系人</dt>
                  <dd className="text-ink">{site.contactName}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 text-ink-3">电话</dt>
                  <dd className="num text-ink">{site.phoneDisplay}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 text-ink-3">邮箱</dt>
                  <dd className="text-ink">{site.email}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 rounded-xs border border-line bg-white p-6">
              <h3 className="text-[15px] font-semibold text-ink">到厂参观</h3>
              <p className="mt-2 text-[12.5px] leading-[1.9] text-ink-2">
                工厂位于江西省九江市永修县云山经济开发区军山荣棋大道北侧 6 号。
                来访前请提前一天电话预约，以便安排接待与参观路线。
              </p>
              <div className="mt-4">
                <MediaFrame alt="惠洁管业厂区位置" label="厂区位置示意" hint="上线前替换为地图截图或嵌入高德地图" ratio="16/9" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}