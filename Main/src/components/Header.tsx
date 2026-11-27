"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* 顶部信息条 */}
      <div className="hidden bg-brand-dark text-white/80 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[12px]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-white/50">地址</span>
              {site.address}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-white/50">工作时间</span>
              {site.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phone}`} className="num flex items-center gap-1.5 text-white hover:text-white/80">
              <span className="text-white/50">销售热线</span> {site.phoneDisplay}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <Link href="/contact/" className="hover:text-white">
              在线询价
            </Link>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <div className={`border-b border-line bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_6px_20px_-12px_rgba(17,24,39,0.25)]" : ""}`}>
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[74px]">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex h-[74px] items-center whitespace-nowrap px-3 text-[14.5px] transition-colors ${
                    isActive(item.href) ? "text-brand" : "text-ink hover:text-brand"
                  }`}
                >
                  {item.label}
                  {item.children && <span className="ml-1 text-[10px] text-ink-3">▾</span>}
                  {isActive(item.href) && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-[168px] border border-line bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2 text-[14px] text-ink-2 transition-colors hover:bg-soft hover:text-brand"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a href={`tel:${site.phone}`} className="flex flex-col leading-tight whitespace-nowrap max-xl:hidden">
              <span className="text-[11px] text-ink-3">销售热线</span>
              <span className="num text-[16px] font-semibold text-brand">{site.phoneDisplay}</span>
            </a>
            <Link href="/contact/" className="btn-accent h-10 whitespace-nowrap">
              获取报价
              <span aria-hidden>→</span>
            </Link>
          </div>

          <button
            type="button"
            aria-label="打开菜单"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xs border border-line lg:hidden"
          >
            <span className="relative block h-[14px] w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-all ${open ? "top-[6px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-[6px] h-[2px] w-5 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-all ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`} />
            </span>
          </button>
        </div>

        {/* 移动端菜单 */}
        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="container-x py-2">
              {nav.map((item) => (
                <div key={item.href} className="border-b border-line/70 last:border-0">
                  <Link href={item.href} className="flex h-11 items-center justify-between text-[15px] text-ink">
                    {item.label}
                    <span className="text-ink-3">›</span>
                  </Link>
                  {item.children && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="tag-brand">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-3 py-4">
                <a href={`tel:${site.phone}`} className="btn-primary flex-1">
                  电话咨询
                </a>
                <Link href="/contact/" className="btn-accent flex-1">
                  获取报价
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}