"use client";

import { useMemo, useState } from "react";
import type { SpecTable } from "@/content/products";

export default function SpecExplorer({ spec, productName }: { spec: SpecTable; productName: string }) {
  const [kw, setKw] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const rows = useMemo(() => {
    const dn = (row: (string | number)[]) => Number(row[0]);
    return spec.rows.filter((row) => {
      const d = dn(row);
      if (min !== "" && d < Number(min)) return false;
      if (max !== "" && d > Number(max)) return false;
      if (kw.trim()) {
        const text = row.join(" ");
        if (!text.toLowerCase().includes(kw.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [spec.rows, kw, min, max]);

  const exportCsv = () => {
    const lines = [spec.columns.join(","), ...rows.map((r) => r.join(","))];
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${productName}-规格参数.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-ink-3">口径筛选</span>
          <input
            value={min}
            onChange={(e) => setMin(e.target.value.replace(/[^\d]/g, ""))}
            inputMode="numeric"
            placeholder="最小 DN"
            className="h-9 w-[104px] rounded-xs border border-line px-3 text-[13px] outline-none focus:border-brand"
          />
          <span className="text-ink-3">—</span>
          <input
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            inputMode="numeric"
            placeholder="最大 DN"
            className="h-9 w-[104px] rounded-xs border border-line px-3 text-[13px] outline-none focus:border-brand"
          />
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="搜索规格 / 压力等级"
            className="h-9 w-[168px] rounded-xs border border-line px-3 text-[13px] outline-none focus:border-brand"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-ink-3">
            共 <b className="num text-brand">{rows.length}</b> 条
          </span>
          <button type="button" onClick={exportCsv} className="btn-outline h-9 px-3 text-[13px]">
            导出 CSV
          </button>
        </div>
      </div>

      <div className="hide-scrollbar max-h-[560px] overflow-auto rounded-xs border border-line">
        <table className="spec-table">
          <thead className="sticky top-0 z-10">
            <tr>
              {spec.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((cell, j) => (
                  <td key={j} className={j === 0 ? "num font-medium text-ink" : "num"}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={spec.columns.length} className="!py-10 text-center text-ink-3">
                  没有匹配的规格，请调整口径范围或联系技术支持
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {spec.note && <p className="mt-3 text-[12px] text-ink-3">注：{spec.note}</p>}
    </div>
  );
}