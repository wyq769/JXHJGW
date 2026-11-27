import Link from "next/link";
import type { CaseItem } from "@/content/cases";
import { getSolution } from "@/content/solutions";
import MediaFrame from "@/components/MediaFrame";

export default function CaseCard({ item }: { item: CaseItem }) {
  const hasCover = Boolean(item.cover && item.cover.startsWith("/"));
  const sol = getSolution(item.solution);

  return (
    <Link href={`/cases/${item.slug}/`} className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative h-[182px] overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <MediaFrame src={hasCover ? item.cover : undefined} alt={item.title} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#062338] via-[#062338]/78 to-[#062338]/12" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="stat-k text-[12px] text-white/70">{item.year}</span>
            {!hasCover && (
              <span className="rounded-xs border border-white/25 px-2 py-[2px] text-[10px] tracking-wide text-white/55">
                实拍位
              </span>
            )}
          </div>
          <div>
            <p className="text-[11px] tracking-widest text-white/55">{sol?.name ?? ""}</p>
            <p className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-white">{item.title}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[12px] text-ink-3">{item.location}</p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.8] text-ink-2">{item.scale}</p>
        <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-ink-3">
          <span>管材合计</span>
          <span className="num text-ink">{item.totalLength}</span>
        </div>
        <span className="mt-auto pt-3 text-[13px] text-brand">
          查看工程详情 <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
