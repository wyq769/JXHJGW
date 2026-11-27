"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products } from "@/content/products";

/** 首页「按用途 + 口径快速选型」入口：把用户的工程语言（做什么工程、多大口径）直接映射到产品 */
export default function QuickFinder() {
  const [cat, setCat] = useState("water-supply");
  const [dn, setDn] = useState("");

  const matched = useMemo(() => {
    const d = Number(dn);
    return products.filter((p) => {
      const inCat = p.category === cat;
      const inDn = !dn || (d >= p.dnRange[0] && d <= p.dnRange[1]);
      return inCat && inDn;
    });
  }, [cat, dn]);

  return (
    <div className="rounded-xs border border-line bg-white p-5 shadow-[0_18px_50px_-30px_rgba(17,24,39,0.3)] md:p-7">
      <div className="grid gap-4 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <span className="mb-2 block text-[13px] text-ink-2">1. 选择工程用途</span>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCat(c.slug)}
                className={`rounded-xs border px-3 py-1.5 text-[13px] transition-colors ${
                  cat === c.slug ? "border-brand bg-brand text-white" : "border-line text-ink-2 hover:border-brand hover:text-brand"
                }`}
              >
                {c.name.replace("系列", "").replace("配套", "")}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-4">
          <span className="mb-2 block text-[13px] text-ink-2">2. 输入口径 DN</span>
          <div className="flex items-center gap-2">
            <input
              value={dn}
              onChange={(e) => setDn(e.target.value.replace(/[^\d]/g, ""))}
              inputMode="numeric"
              placeholder="例如 315"
              className="num h-11 w-32 rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
            />
            <span className="text-[12px] text-ink-3">留空则显示该用途全部产品</span>
          </div>
        </div>
        <div className="md:col-span-4">
          <span className="mb-2 block text-[13px] text-ink-2">3. 匹配结果</span>
          <div className="flex h-11 items-center justify-between rounded-xs bg-soft px-4">
            <span className="text-[13px] text-ink-2">
              匹配到 <b className="num text-[18px] text-brand">{matched.length}</b> 款产品
            </span>
            <Link href={`/products/#${cat}`} className="text-[13px] text-brand hover:underline">
              查看规格 →
            </Link>
          </div>
        </div>
      </div>

      {matched.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {matched.slice(0, 3).map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <Link href={`/products/${p.slug}/`} className="text-[14px] text-ink hover:text-brand">
                {p.name}
              </Link>
              <span className="num text-[12px] text-ink-3">
                DN{p.dnRange[0]}–{p.dnRange[1]} · {(p.stiffness ?? p.pressure ?? []).join(" / ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}