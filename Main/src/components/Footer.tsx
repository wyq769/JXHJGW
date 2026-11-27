import Link from "next/link";
import { categories } from "@/content/products";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-[13px] leading-[1.9]">
            专注塑料管道制造，覆盖给水、排水、电力通讯、燃气、农业灌溉与海绵城市配套，为市政与建筑项目提供全口径、全材质的管材配置。
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-xs border border-dashed border-white/25 p-2 text-center text-[10px] leading-tight text-white/50">
              微信二维码
              <br />
              待上传
            </div>
            <div className="text-[12px] leading-relaxed">
              <p className="text-white">微信扫码 · 技术选型咨询</p>
              <p className="mt-1 text-white/50">工作日 30 分钟内响应</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-4 text-[14px] font-semibold text-white">产品中心</h4>
          <ul className="space-y-2 text-[13px]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/#${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-[14px] font-semibold text-white">解决方案</h4>
          <ul className="space-y-2 text-[13px]">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}/`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-[14px] font-semibold text-white">联系我们</h4>
          <ul className="space-y-3 text-[13px]">
            <li>
              <span className="block text-white/40">销售热线</span>
              <a href={`tel:${site.phone}`} className="num text-[18px] font-semibold text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="block text-white/40">公司地址</span>
              {site.address}
            </li>
            <li>
              <span className="block text-white/40">关于</span>
              <Link href="/about/" className="hover:text-white">
                公司简介
              </Link>
              <span className="mx-2 text-white/20">/</span>
              <Link href="/news/" className="hover:text-white">
                新闻资讯
              </Link>
              <span className="mx-2 text-white/20">/</span>
              <Link href="/careers/" className="hover:text-white">
                加入我们
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}　保留所有权利
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{site.icp}</span>
            <span className="hidden md:inline text-white/15">|</span>
            <span>营业执照公示</span>
            <span className="hidden md:inline text-white/15">|</span>
            <span>本网站内容以实际合同与技术协议为准</span>
          </p>
        </div>
      </div>
    </footer>
  );
}