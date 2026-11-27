/**
 * 管材剖面示意图：直观呈现「口径 DN / 壁厚 en / 尺寸比 SDR / 压力等级 PN」。
 * 纯 SVG，无外部图片依赖，可随产品参数变化。
 */
export default function PipeSection({
  dn = 315,
  en = 18.7,
  sdr = "SDR17",
  pn = "PN1.0",
  className = "",
}: {
  dn?: number;
  en?: number;
  sdr?: string;
  pn?: string;
  className?: string;
}) {
  const cx = 170;
  const cy = 176;
  const R = 116;
  const wallPx = Math.max(7, Math.min(22, (en / dn) * R * 2.4));
  const r = R - wallPx;

  return (
    <svg viewBox="0 0 340 340" className={className} role="img" aria-label={`DN${dn} 管材剖面示意`}>
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E6FA8" />
          <stop offset="55%" stopColor="#12507F" />
          <stop offset="100%" stopColor="#0B3557" />
        </linearGradient>
        <linearGradient id="boreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAF0F6" />
        </linearGradient>
        <marker id="arrowStart" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" fill="none" stroke="#9AA7B4" strokeWidth="1" />
        </marker>
        <marker id="arrowEnd" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#9AA7B4" strokeWidth="1" />
        </marker>
      </defs>

      {/* 外径尺寸线 */}
      <line
        x1={cx - R}
        y1="52"
        x2={cx + R}
        y2="52"
        stroke="#9AA7B4"
        strokeWidth="1"
        markerStart="url(#arrowStart)"
        markerEnd="url(#arrowEnd)"
      />
      <line x1={cx - R} y1="46" x2={cx - R} y2="70" stroke="#CFD9E4" strokeWidth="1" />
      <line x1={cx + R} y1="46" x2={cx + R} y2="70" stroke="#CFD9E4" strokeWidth="1" />
      <text x={cx} y="40" textAnchor="middle" fontSize="11" fill="#5B6672">
        公称外径 DN{dn}
      </text>

      {/* 管壁 */}
      <circle cx={cx} cy={cy} r={R} fill="url(#wallGrad)" />
      <circle cx={cx} cy={cy} r={r} fill="url(#boreGrad)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#CFD9E4" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0B3557" strokeWidth="1" opacity="0.35" />

      {/* 壁厚引出线 */}
      <g>
        <line
          x1={cx + (R - wallPx / 2) * Math.cos(Math.PI / 4)}
          y1={cy + (R - wallPx / 2) * Math.sin(Math.PI / 4)}
          x2="300"
          y2="318"
          stroke="#D6282C"
          strokeWidth="1.2"
        />
        <circle cx={cx + (R - wallPx / 2) * Math.cos(Math.PI / 4)} cy={cy + (R - wallPx / 2) * Math.sin(Math.PI / 4)} r="2.6" fill="#D6282C" />
        <text x="338" y="330" fontSize="10.5" fill="#D6282C" textAnchor="end">
          壁厚 {en}mm
        </text>
      </g>

      {/* 参数标签 */}
      <g fontSize="11" fill="#5B6672">
        <text x="26" y="312">
          {sdr}
        </text>
        <text x="26" y="330" fill="#12507F" fontWeight="600">
          {pn}
        </text>
      </g>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fill="#8A939C">
        内径 {(dn - 2 * en).toFixed(0)}mm
      </text>
    </svg>
  );
}