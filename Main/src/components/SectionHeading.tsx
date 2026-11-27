import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  moreHref,
  moreLabel = "查看全部",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  moreHref?: string;
  moreLabel?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${light ? "text-white/70" : ""}`}>{eyebrow}</p>}
        <h2 className={`h2 mt-2 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        {desc && <p className={`mt-3 text-[14px] leading-[1.9] ${light ? "text-white/60" : "text-ink-2"}`}>{desc}</p>}
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className={`group inline-flex shrink-0 items-center gap-1.5 text-[14px] ${light ? "text-white/80 hover:text-white" : "text-brand hover:text-brand-dark"}`}
        >
          {moreLabel}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}