import Link from "next/link";
import { Product } from "@/content/products";
import { materialColor } from "@/content/site";
import PipeRing from "./PipeRing";

export default function ProductCard({ p }: { p: Product }) {
  const color = materialColor[p.material] ?? "#12507F";
  return (
    <Link
      href={`/products/${p.slug}/`}
      className="card card-hover group flex flex-col p-5"
    >
      <div className="flex items-start justify-between">
        <PipeRing color={color} />
        <span className="tag !bg-brand-tint !text-brand">{p.material}</span>
      </div>
      <h3 className="mt-4 text-[16px] font-semibold text-ink transition-colors group-hover:text-brand">{p.name}</h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.8] text-ink-2">{p.summary}</p>
      <dl className="mt-4 grid grid-cols-2 gap-y-2 border-t border-line pt-3 text-[12px]">
        <div className="flex items-center gap-1.5">
          <dt className="text-ink-3">口径</dt>
          <dd className="num text-ink">
            DN{p.dnRange[0]}–{p.dnRange[1]}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="text-ink-3">{p.stiffness ? "环刚度" : "压力"}</dt>
          <dd className="num text-ink">
            {(p.stiffness ?? p.pressure ?? []).slice(0, 2).join(" / ")}
          </dd>
        </div>
      </dl>
      <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-brand">
        查看规格参数
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}