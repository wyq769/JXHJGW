import Image from "next/image";
import type { ReactNode } from "react";

const ratioClass: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
};

type Props = {
  /** 实拍图地址；为空时渲染带纹理的占位框，避免页面出现空白破图 */
  src?: string;
  alt: string;
  /** 占位时的说明文字，例如「厂区实拍位」 */
  label?: string;
  /** 占位时的第二行提示（拍摄建议） */
  hint?: string;
  /** 宽高比；不传则由外部容器控制尺寸 */
  ratio?: keyof typeof ratioClass | string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
};

export default function MediaFrame({
  src,
  alt,
  label = "实拍位 · 待上传",
  hint,
  ratio,
  className = "",
  priority = false,
  children,
}: Props) {
  const ratioStyle = ratio ? ratioClass[ratio] ?? "" : "";
  return (
    <div className={`media ${src ? "" : "media-ph"} ${ratioStyle} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="media-img"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/25 text-brand/70">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 16l5-5 4 4 3-3 6 6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="9" r="1.5" />
            </svg>
          </span>
          <span className="text-[12px] font-medium text-brand/80">{label}</span>
          {hint && <span className="max-w-[80%] text-[11px] leading-relaxed text-ink-3">{hint}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
