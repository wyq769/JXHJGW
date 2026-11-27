import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-2xl py-10 text-center">
        <p className="num text-[56px] font-bold leading-none text-brand/25">404</p>
        <h1 className="h2 mt-4 text-ink">页面没有找到</h1>
        <p className="mt-3 text-[14px] leading-[1.9] text-ink-2">
          这个地址可能已经调整。你可以回到首页，或者直接按用途与口径在产品中心里找规格。
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
    </section>
  );
}