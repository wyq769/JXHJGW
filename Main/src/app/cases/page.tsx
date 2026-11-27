import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "工程案例 · 供水/排水/电力排管/灌溉工程供货项目",
  description: "江西惠洁管业已供货的市政供水、污水管网、电力排管与农田灌溉工程案例，含项目名称、管材规格与供货量。",
};

export default function CasesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "工程案例" }]} />
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-mask" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="container-x relative py-12 md:py-16">
          <p className="eyebrow eyebrow-light">PROJECTS</p>
          <h1 className="h1 mt-3 text-white">工程案例</h1>
          <p className="lead mt-5 max-w-3xl text-white/70">
            以下项目由本公司实际供货，项目名称、管材规格与用量取自双方签订的购销/采购合同。合同编号、单价与合同金额不在网站披露。
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
