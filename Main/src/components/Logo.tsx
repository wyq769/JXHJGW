import Image from "next/image";
import Link from "next/link";

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const title = variant === "light" ? "text-white" : "text-brand-dark";
  const sub = variant === "light" ? "text-white/55" : "text-brand/70";
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="江西惠洁管业科技有限公司 首页">
      <Image src="/images/logo-mark-alpha.png" alt="惠洁管业" width={124} height={71} className="h-10 w-auto md:h-11" priority />
      <span className="hidden h-9 w-px bg-line sm:block" />
      <span className="hidden flex-col leading-tight sm:flex">
        <span className={`text-[17px] font-bold tracking-wide md:text-[19px] ${title}`}>惠洁管业</span>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${sub}`}>HUIJIE TUBE INDUSTRY</span>
      </span>
    </Link>
  );
}