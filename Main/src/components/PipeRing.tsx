/** 产品卡片用的管材剖面小图标 */
export default function PipeRing({ color = "#12507F", size = 76 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true">
      <circle cx="40" cy="40" r="33" fill="none" stroke={color} strokeWidth="1" opacity="0.18" />
      <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="9" opacity="0.9" />
      <circle cx="40" cy="40" r="23.5" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.55" />
      <circle cx="40" cy="40" r="8" fill={color} opacity="0.08" />
    </svg>
  );
}