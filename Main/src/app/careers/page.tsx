import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "加入我们 · 招聘岗位",
  description: `${site.name}招聘：销售工程师、挤出机操作工、质检员、技术助理。工作地点：江西省九江市永修县。`,
};

const jobs = [
  {
    t: "销售工程师（工程管道）",
    n: "2 人",
    place: "九江 / 南昌",
    req: [
      "大专及以上学历，给排水、市政工程、材料或营销相关专业优先",
      "1 年以上管材、建材或市政工程渠道销售经验",
      "能读懂管材规格表，理解 SDR 与压力等级的关系",
      "能适应短期出差，持有 C1 驾照优先",
    ],
  },
  {
    t: "挤出机操作工",
    n: "3 人",
    place: "九江永修",
    req: [
      "熟悉 PE 或 PVC-U 管材挤出生产线操作与换模",
      "能判断壁厚不均、外径超差、表面缺陷等常见异常",
      "接受倒班，有管材厂经验者优先",
    ],
  },
  {
    t: "质检员",
    n: "1 人",
    place: "九江永修",
    req: [
      "熟悉管材常规检验项目：壁厚测量、环刚度、落锤冲击、静液压",
      "能按标准整理出厂检验记录与报告",
      "工作细致，能坚持按批次留样",
    ],
  },
  {
    t: "技术助理",
    n: "1 人",
    place: "九江永修",
    req: [
      "协助整理产品规格表、标准条文与技术资料",
      "熟练使用 Excel，会做参数表与图表",
      "应届生可，给排水或材料专业优先",
    ],
  },
];

const perks = ["五险", "带薪培训", "工作餐与宿舍", "节日福利", "工龄补贴", "岗位晋升通道"];

export default function CareersPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "关于我们", href: "/about/" }, { label: "加入我们" }]} />
      <section className="border-b border-line bg-white">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow">CAREERS</p>
          <h1 className="h1 mt-3 text-ink">加入我们</h1>
          <p className="lead mt-5 max-w-3xl">
            我们是一家 2023 年成立的管材制造企业，团队不大，但每个岗位都要对「参数说得清」负责。
            如果你愿意在一根管子上把事情做扎实，欢迎加入。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">在招岗位</p>
            <h2 className="h2 mt-2 text-ink">当前开放 {jobs.length} 个岗位</h2>
            <div className="mt-6 divide-y divide-line rounded-xs border border-line">
              {jobs.map((j) => (
                <div key={j.t} className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-[16px] font-semibold text-ink">{j.t}</h3>
                    <p className="text-[12.5px] text-ink-3">
                      招聘 {j.n} · {j.place}
                    </p>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {j.req.map((r) => (
                      <li key={r} className="flex gap-2 text-[13px] leading-[1.85] text-ink-2">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="rounded-xs border border-line bg-soft p-6">
              <h3 className="text-[15px] font-semibold text-ink">薪酬与福利</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {perks.map((p) => (
                  <span key={p} className="tag">
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-line pt-4 text-[12.5px] leading-[1.9] text-ink-2">
                <p>投递方式：</p>
                <p className="mt-1">
                  电话/微信 <span className="num font-semibold text-ink">{site.phoneDisplay}</span>
                </p>
                <p>邮箱 {site.email}</p>
                <p className="mt-2 text-ink-3">请注明应聘岗位，附简历或工作经历简述。</p>
              </div>
              <Link href="/contact/" className="btn-primary mt-5 w-full justify-center">
                联系我们
              </Link>
            </div>
            <div className="mt-4 rounded-xs border border-l-2 border-line border-l-brand p-5 text-[12.5px] leading-[1.9] text-ink-2">
              本页面所列岗位为长期招聘方向，具体在招情况以电话沟通为准。
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}