import Link from "next/link";
import type { Solution } from "@/content/solutions";

/** 方案图标：用统一线条风格的小型管线示意，避免字符字形在不同系统下不一致 */
function SolutionIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const };
  switch (type) {
    case "water":
    case "irrigation":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M3 9c2.5-2 4.5 2 7 0s4.5 2 7 0 3-1 4 0" {...common} />
          <path d="M3 15c2.5-2 4.5 2 7 0s4.5 2 7 0 3-1 4 0" {...common} />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect x="4" y="3" width="10" height="18" {...common} />
          <path d="M14 10h5v11h-5M7 7h4M7 11h4M7 15h4" {...common} />
        </svg>
      );
    case "power":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" {...common} />
        </svg>
      );
    case "gas":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M12 3v4M6 21h12M8 21v-6a4 4 0 1 1 8 0v6" {...common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <circle cx="12" cy="12" r="8" {...common} />
          <circle cx="12" cy="12" r="3" {...common} />
        </svg>
      );
  }
}

export default function SolutionCard({ s, index }: { s: Solution; index?: number }) {
  return (
    <Link
      href={`/solutions/${s.slug}/`}
      className="group relative overflow-hidden rounded-xs border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_44px_-28px_rgba(20,105,91,0.5)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xs bg-brand-tint text-brand">
          <SolutionIcon type={s.icon} />
        </div>
        {index !== undefined && <span className="num text-[28px] font-bold leading-none text-line">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-5 text-[17px] font-semibold text-ink transition-colors group-hover:text-brand">{s.name}</h3>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-3">{s.en}</p>
      <p className="mt-3 line-clamp-3 text-[13px] leading-[1.85] text-ink-2">{s.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-[13px] text-brand">
        了解方案 <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}