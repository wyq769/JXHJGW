import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SolutionCard from "@/components/SolutionCard";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "解决方案 · 市政给排水/建筑给排水/电力通讯/燃气/灌溉/海绵城市",
  description:
    "按工程场景组织的管材配置方案：市政给排水、建筑给排水、电力通讯管网、燃气输配、农业节水灌溉与海绵城市，含管材选型逻辑与配套产品。",
};

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "解决方案" }]} />
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="eyebrow eyebrow-light">SOLUTIONS</p>
          <h1 className="h1 mt-3 text-white">解决方案</h1>
          <p className="lead mt-5 max-w-3xl text-white/70">
            管材不是孤立的产品，而是管线系统的一部分。我们按工程类型把主干、支管、检查井与配套件配成一套，并给出压力等级、环刚度与连接方式的选用依据。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-3">
            {solutions.map((s, i) => (
              <SolutionCard key={s.slug} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-soft">
        <div className="container-x py-12">
          <div className="flex flex-col items-start justify-between gap-5 rounded-xs border border-line bg-white p-6 md:flex-row md:items-center">
            <div>
              <h3 className="h3 text-ink">需要按图纸出材料清单？</h3>
              <p className="mt-1 text-[13px] text-ink-2">
                提供平面图与设计说明，我们可以协助整理管材规格、数量与压力等级清单，便于比价与备料。
              </p>
            </div>
            <Link href="/contact/" className="btn-primary">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}