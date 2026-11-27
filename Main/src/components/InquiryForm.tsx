"use client";

import { useState } from "react";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { submitInquiry } from "@/lib/inquiry";

const demands = [
  { value: "pipe", label: "管材询价" },
  { value: "solution", label: "方案与选型" },
  { value: "sample", label: "样品与技术资料" },
  { value: "other", label: "其他" },
] as const;

export default function InquiryForm({
  defaultProduct,
  compact = false,
  dnOptions,
  pnOptions,
}: {
  defaultProduct?: string;
  compact?: boolean;
  dnOptions?: string[];
  pnOptions?: string[];
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    demand: "pipe" as (typeof demands)[number]["value"],
    product: defaultProduct ?? "",
    dn: "",
    pn: "",
    quantity: "",
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^1[3-9]\d{9}$/.test(form.phone.trim())) {
      setError("请填写姓名与有效的手机号码");
      setState("error");
      return;
    }
    setState("loading");
    setError("");
    const res = await submitInquiry(form);
    if (res.ok) {
      setState("done");
    } else {
      setError(res.error ?? "提交失败");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-xs border border-brand/20 bg-brand-tint p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-[20px] text-white">✓</div>
        <h3 className="text-[18px] font-semibold text-ink">询价已提交</h3>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-ink-2">
          我们已收到您的需求，销售工程师将在 1 个工作小时内与您联系。如需加急，请直接致电
          <a href={`tel:${site.phone}`} className="num mx-1 font-semibold text-brand">
            {site.phoneDisplay}
          </a>
          。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">
            联系人 <i className="text-accent">*</i>
          </span>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="h-11 w-full rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
            placeholder="请输入姓名"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">
            手机号码 <i className="text-accent">*</i>
          </span>
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/[^\d]/g, "").slice(0, 11))}
            inputMode="numeric"
            className="h-11 w-full rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
            placeholder="用于接收报价"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">公司名称</span>
          <input
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className="h-11 w-full rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
            placeholder="选填"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">需求类型</span>
          <select
            value={form.demand}
            onChange={(e) => set("demand", e.target.value)}
            className="h-11 w-full rounded-xs border border-line bg-white px-3 text-[14px] outline-none focus:border-brand"
          >
            {demands.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">产品</span>
          <select
            value={form.product}
            onChange={(e) => set("product", e.target.value)}
            className="h-11 w-full rounded-xs border border-line bg-white px-3 text-[14px] outline-none focus:border-brand"
          >
            <option value="">请选择（可留空）</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">口径 DN</span>
          {dnOptions?.length ? (
            <select
              value={form.dn}
              onChange={(e) => set("dn", e.target.value)}
              className="h-11 w-full rounded-xs border border-line bg-white px-3 text-[14px] outline-none focus:border-brand"
            >
              <option value="">请选择</option>
              {dnOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={form.dn}
              onChange={(e) => set("dn", e.target.value)}
              className="h-11 w-full rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
              placeholder="如 DN315"
            />
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-ink-2">{pnOptions?.length ? "压力 / 环刚度" : "数量"}</span>
          {pnOptions?.length ? (
            <select
              value={form.pn}
              onChange={(e) => set("pn", e.target.value)}
              className="h-11 w-full rounded-xs border border-line bg-white px-3 text-[14px] outline-none focus:border-brand"
            >
              <option value="">请选择</option>
              {pnOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={form.quantity}
              onChange={(e) => set("quantity", e.target.value)}
              className="h-11 w-full rounded-xs border border-line px-3 text-[14px] outline-none focus:border-brand"
              placeholder="如 2000 米"
            />
          )}
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[13px] text-ink-2">需求说明</span>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={compact ? 3 : 4}
          className="w-full rounded-xs border border-line px-3 py-2.5 text-[14px] outline-none focus:border-brand"
          placeholder="项目地点、用途、工期、是否需要技术选型支持等"
        />
      </label>

      {state === "error" && <p className="text-[13px] text-accent">{error}</p>}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "loading"} className="btn-accent px-8 disabled:opacity-60">
          {state === "loading" ? "提交中…" : "提交询价"}
        </button>
        <p className="text-[12px] text-ink-3">
          或直接致电
          <a href={`tel:${site.phone}`} className="num mx-1 font-semibold text-brand">
            {site.phoneDisplay}
          </a>
          （{site.contactName}）
        </p>
      </div>
      <p className="text-[12px] leading-relaxed text-ink-3">
        提交即表示同意我们通过电话/微信与您联系，您的信息仅用于本次业务沟通，不会对外提供。
      </p>
    </form>
  );
}