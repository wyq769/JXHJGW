import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "江西惠洁管业科技有限公司 | 塑料管道制造 · 给水/排水/电力通讯/燃气/灌溉",
    template: `%s | ${site.brand}`,
  },
  description:
    "江西惠洁管业科技有限公司专注塑料管道制造，产品覆盖给水管、排水排污管、电力通讯护套管、燃气管、农业灌溉管与海绵城市配套，口径 DN20–DN2200，提供口径/壁厚/材质规格选型与技术支持。",
  keywords: [
    "江西惠洁管业",
    "惠洁管业",
    "塑料管道",
    "PE给水管",
    "HDPE双壁波纹管",
    "MPP电力管",
    "PE燃气管",
    "灌溉管",
    "永修管材厂家",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: site.name,
    title: "江西惠洁管业科技有限公司",
    description: "塑料管道制造 · 给水/排水/电力通讯/燃气/灌溉/海绵城市 · DN20–DN2200",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body id="top">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingBar />
      </body>
    </html>
  );
}