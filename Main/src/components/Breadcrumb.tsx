import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="border-b border-line bg-soft">
      <div className="container-x flex h-11 items-center gap-2 overflow-hidden whitespace-nowrap text-[12px] text-ink-3">
        <Link href="/" className="hover:text-brand">
          首页
        </Link>
        {items.map((it) => (
          <span key={it.label} className="flex items-center gap-2">
            <span className="text-line">/</span>
            {it.href ? (
              <Link href={it.href} className="hover:text-brand">
                {it.label}
              </Link>
            ) : (
              <span className="text-ink-2">{it.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}