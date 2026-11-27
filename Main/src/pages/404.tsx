import Link from "next/link";

/**
 * 纯静态托管（output: export）下 404 由 pages/404 生成 out/404.html，
 * 因此在无样式依赖的前提下复制一份与 app/not-found 一致的版式。
 */
export default function Custom404() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <p className="num text-[56px] font-bold leading-none text-brand/25">404</p>
        <h1 className="mt-4 text-[24px] font-semibold text-ink">页面没有找到</h1>
        <p className="mt-3 text-[14px] leading-[1.9] text-ink-2">
          这个地址可能已经调整。你可以回到首页，或者按用途与口径在产品中心里找规格。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
          <Link href="/products/" className="btn-outline">
            产品中心
          </Link>
          <Link href="/contact/" className="btn-accent">
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}