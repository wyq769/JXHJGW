import Link from "next/link";
import { site } from "@/content/site";

const items = [
  { label: "电话", icon: "☎", href: `tel:${site.phone}` },
  { label: "微信", icon: "▣", href: "/contact/#wechat" },
  { label: "询价", icon: "✎", href: "/contact/" },
];

export default function FloatingBar() {
  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-l-xs border border-line border-r-0 bg-white shadow-lg 2xl:flex">
      {items.map((it) => (
        <Link
          key={it.label}
          href={it.href}
          className="group flex h-[62px] w-[62px] flex-col items-center justify-center gap-0.5 border-b border-line text-[11px] text-ink-2 transition-colors last:border-0 hover:bg-brand hover:text-white"
        >
          <span className="text-[15px]">{it.icon}</span>
          {it.label}
        </Link>
      ))}
      <a
        href="#top"
        className="flex h-[62px] w-[62px] flex-col items-center justify-center gap-0.5 text-[11px] text-ink-2 transition-colors hover:bg-brand hover:text-white"
      >
        <span className="text-[15px]">↑</span>
        顶部
      </a>
    </div>
  );
}