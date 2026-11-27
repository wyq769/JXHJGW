export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products, categories } from "@/content/products";
import { solutions } from "@/content/solutions";
import { cases } from "@/content/cases";
import { news } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticPaths = [
    "",
    "/products/",
    "/solutions/",
    "/cases/",
    "/technology/",
    "/quality/",
    "/service/",
    "/about/",
    "/news/",
    "/contact/",
    "/careers/",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const p of products) {
    entries.push({ url: `${base}/products/${p.slug}/`, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const s of solutions) {
    entries.push({ url: `${base}/solutions/${s.slug}/`, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const c of cases) {
    entries.push({ url: `${base}/cases/${c.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const n of news) {
    entries.push({ url: `${base}/news/${n.slug}/`, changeFrequency: "monthly", priority: 0.5 });
  }
  void categories;

  return entries;
}