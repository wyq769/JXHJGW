export type CaseMaterial = {
  name: string;
  spec: string;
  qty: string;
};

export type CaseImage = { src: string; caption: string };

export type CaseItem = {
  slug: string;
  title: string;
  location: string;
  year: string;
  scale: string;
  totalLength: string;
  contractNo?: string;
  materials: CaseMaterial[];
  products: string[];
  solution: string;
  summary: string;
  supply: string[];
  images?: CaseImage[];
  cover: string;
};

export const cases: CaseItem[] = [
  {
    slug: "sihe-village-water",
    title: "永修县村镇提灌站及引水管道工程",
    location: "江西 · 九江 · 永修",
    year: "2025.07",
    scale: "PE100 给水管 DN160–DN315（0.8MPa）",
    totalLength: "3,422 m",
    contractNo: "HJGY-2026-07",
    materials: [
      { name: "PE100 管材（0.8MPa）", spec: "315 mm", qty: "1,200 m" },
      { name: "PE100 管材（0.8MPa）", spec: "250 mm", qty: "1,102 m" },
      { name: "PE100 管材（0.8MPa）", spec: "200 mm", qty: "480 m" },
      { name: "PE100 管材（0.8MPa）", spec: "160 mm", qty: "640 m" },
      { name: "闸阀、排气阀、止水阀", spec: "160–315 mm", qty: "37 只" },
      { name: "异径三通、异径直接、法兰头", spec: "160–315 mm", qty: "124 只" },
    ],
    products: ["pe-water-pipe"],
    solution: "agriculture-irrigation",
    summary: "项目位于九江市永修县，建设内容为提灌站与引水管道。我方供应 PE100 给水管材（DN160–DN315，0.8MPa）共 3,422 米，以及配套闸阀、排气阀、止水阀与三通、直接、法兰头等管件，按村镇地块分段配送。",
    supply: [
      "按地块分段配送，管材定尺 6 m / 9 m，盘管按需供货，减少田间接头",
      "阀门与管件随管材成套配齐，现场安装不必二次采购",
      "随货提供出厂检验报告，配合村组与监理验收",
    ],
    images: [
      { src: "/images/cases/fusion-welding-2.jpg", caption: "田间管道热熔对接" },
      { src: "/images/cases/weld-joint.jpg", caption: "焊口外观检查" },
    ],
    cover: "/images/cases/fusion-welding-2-wide.jpg",
  },
  {
    slug: "yongguang-village-water",
    title: "永修县村镇引水管道工程",
    location: "江西 · 九江 · 永修",
    year: "2025.08",
    scale: "PE100 给水管 DN160–DN315（0.8MPa）",
    totalLength: "2,790 m",
    contractNo: "HJGY-2026-07",
    materials: [
      { name: "PE100 管材（0.8MPa）", spec: "315 mm", qty: "1,460 m" },
      { name: "PE100 管材（0.8MPa）", spec: "250 mm", qty: "680 m" },
      { name: "PE100 管材（0.8MPa）", spec: "200 mm", qty: "600 m" },
      { name: "PE100 管材（0.8MPa）", spec: "160 mm", qty: "50 m" },
      { name: "闸阀、排气阀", spec: "160–315 mm", qty: "37 只" },
      { name: "异径三通、异径直接、法兰头", spec: "160–315 mm", qty: "112 只" },
    ],
    products: ["pe-water-pipe"],
    solution: "municipal-water",
    summary: "项目位于九江市永修县，为村镇引水管道建设。我方供应 PE100 给水管材（DN160–DN315，0.8MPa）共 2,790 米及配套阀门、管件，解决村镇集中取水与田间输配水。",
    supply: [
      "管材按村组线路分段配送，主干 DN315 与配水支管同批到货",
      "阀门、三通、法兰头成套配齐，方便现场一次性安装",
      "提供出厂检验报告与管材标识，便于验收与后期维护追溯",
    ],
    images: [
      { src: "/images/cases/weld-joint.jpg", caption: "焊口外观检查" },
      { src: "/images/cases/pipe-laying.jpg", caption: "沟槽内管道敷设" },
    ],
    cover: "/images/cases/weld-joint-wide.jpg",
  },
  {
    slug: "zhazhang-sangye-water",
    title: "山南市扎囊县桑耶镇集中供水工程",
    location: "西藏 · 山南 · 扎囊",
    year: "2026.04",
    scale: "PE 给水管 DN250–DN400（1.6MPa）",
    totalLength: "2,970 m",
    materials: [
      { name: "PE 管材（1.6MPa）", spec: "400 mm", qty: "1,002 m" },
      { name: "PE 管材（1.6MPa）", spec: "355 mm", qty: "768 m" },
      { name: "PE 管材（1.6MPa）", spec: "315 mm", qty: "600 m" },
      { name: "PE 管材（1.6MPa）", spec: "250 mm", qty: "600 m" },
    ],
    products: ["pe-water-pipe"],
    solution: "municipal-water",
    summary: "项目为西藏山南市扎囊县桑耶镇的集中供水工程，我方供应 DN250–DN400 给水用 PE 管材，压力等级 1.6MPa。高原地区温差大、紫外强，管材按 1.6MPa 提高安全余量，并按整根定尺供货以减少现场接口。",
    supply: [
      "1.6MPa 压力等级管材，按整根定尺供货，减少高海拔现场焊接工作量",
      "随货提供出厂检测报告，便于甲方与监理验收入库",
      "长途运输接口端加装保护，避免管端椭圆变形影响对接",
    ],
    images: [
      { src: "/images/cases/pipe-laying.jpg", caption: "沟槽内管道敷设" },
      { src: "/images/cases/fusion-welding-1.jpg", caption: "热熔对接作业" },
      { src: "/images/cases/valve-install.jpg", caption: "阀门法兰连接" },
    ],
    cover: "/images/cases/pipe-laying-wide.jpg",
  },
  {
    slug: "cuona-quzhuomu-water",
    title: "错那县曲卓木乡乡镇标准化供水提升工程",
    location: "西藏 · 山南 · 错那",
    year: "2026.04",
    scale: "PE100 给水管 DN315 / DN250（1.6MPa）",
    totalLength: "3,876 m",
    materials: [
      { name: "给水用 PE 管（PE100 全新料）", spec: "DN315 × 28.6 mm, 1.6MPa", qty: "2,400 m" },
      { name: "给水用 PE 管（PE100 全新料）", spec: "DN250 × 22.7 mm, 1.6MPa", qty: "1,476 m" },
    ],
    products: ["pe-water-pipe"],
    solution: "municipal-water",
    summary: "项目为西藏山南市错那县曲卓木乡乡镇标准化供水提升工程，我方按临时采购合同供应 PE100 全新料给水管，规格 DN315 与 DN250，壁厚 28.6 mm / 22.7 mm，压力等级 1.6MPa，用于乡镇供水主干与配水干管。",
    supply: [
      "PE100 全新料，非再生料，满足饮用水输送的卫生要求",
      "按合同暂定数量备货，实际供货量按现场施工进度结算",
      "随货提供原料牌号说明、出厂检验报告与增值税专用发票",
    ],
    images: [
      { src: "/images/cases/pipe-lowering.jpg", caption: "机械配合下管就位" },
      { src: "/images/cases/trench-wide.jpg", caption: "沟槽敷设与临时支撑" },
    ],
    cover: "/images/cases/pipe-lowering-wide.jpg",
  },
  {
    slug: "hukou-sewage-epc",
    title: "湖口县城区污水管网建设 EPC 项目",
    location: "江西 · 九江 · 湖口",
    year: "2026",
    scale: "MPP 电力管 15,872 m + 增强缠绕管 4,000 m",
    totalLength: "19,872 m",
    contractNo: "HKGW-WZ-2026-009",
    materials: [
      { name: "MPP 电力管（国标）", spec: "160×13 / 110×8 / 70×6 mm", qty: "72 m" },
      { name: "MPP 电力管（企标）", spec: "160×13 / 110×8 / 70×6 mm", qty: "15,800 m" },
      { name: "增强缠绕管（国标）", spec: "DN400 SN8 / DN300 SN8", qty: "2,000 m" },
      { name: "增强缠绕管（企标）", spec: "DN400 SN8 / DN300 SN8", qty: "2,000 m" },
    ],
    products: ["mpp-power-pipe", "steel-reinforced-spiral"],
    solution: "municipal-water",
    summary: "项目为九江市湖口县城区污水管网建设 EPC 项目，我方供应 MPP 电力电缆护套管（DN70–DN160）与增强缠绕结构壁管（DN300、DN400，环刚度 SN8）。电力管用于道路开挖后的电缆排管与过路穿越，缠绕管用于污水支管与接户段。",
    supply: [
      "合同约定指标：拉伸强度 ≥15MPa、断裂伸长率 ≥350%、环刚度 ≥6.3kN/m²、摩擦系数 ≤0.35",
      "定做产品按甲方书面下单排产，货到现场后按合同约定期限结算",
      "随货提供检测报告与送货单，数量以现场点验、检尺为准",
    ],
    images: [
      { src: "/images/cases/trench-wide.jpg", caption: "沟槽内管道敷设与临时支撑" },
      { src: "/images/cases/pipe-laying.jpg", caption: "管道沟槽敷设" },
    ],
    cover: "/images/cases/trench-wide.jpg",
  },
  {
    slug: "cuona-mama-tube",
    title: "错那市麻麻门巴民族乡管材采购项目",
    location: "西藏 · 山南 · 错那",
    year: "2026",
    scale: "BWFRP 电力/通讯保护套管 Φ100–Φ200",
    totalLength: "93,442 m（BWFRP 套管）",
    contractNo: "ZJ-CNXC-01(LJ)-WC-013",
    materials: [
      { name: "BWFRP 电力电缆保护套管", spec: "Φ100 × 3 mm", qty: "40,378 m" },
      { name: "BWFRP 通讯电缆保护套管", spec: "Φ200 × 6.5 mm", qty: "26,712 m" },
      { name: "BWFRP 电力电缆保护套管", spec: "Φ100 × 2 mm", qty: "26,352 m" },
      { name: "管枕", spec: "210 mm / 110 mm", qty: "58,401 个" },
      { name: "JDG/KBG 管、镀锌钢管等配套管材", spec: "DN20–DN120", qty: "约 20.4 万米" },
    ],
    products: ["mpp-power-pipe", "pvc-u-telecom-pipe"],
    solution: "power-telecom",
    summary: "项目位于西藏山南市错那市麻麻门巴民族乡，由施工单位集中采购。我方供应 BWFRP 电力与通讯电缆保护套管及管枕、JDG/KBG 管、镀锌钢管等配套管材，用于乡镇市政道路下的电力与通信管网敷设。",
    supply: [
      "合同编号 ZJ-CNXC-01(LJ)-WC-013，招标编号 ZJ-CNXC-WZZB-GC-2025-006",
      "BWFRP 套管与管枕按包段清单成套供应，满足排管间距与包封要求",
      "高海拔长途运输，按施工包段分批到货，减少现场二次搬运",
    ],
    images: [
      { src: "/images/cases/fusion-welding-1.jpg", caption: "现场管材对接作业" },
      { src: "/images/cases/pipe-lowering.jpg", caption: "机械配合下管" },
    ],
    cover: "/images/cases/fusion-welding-1-b-wide.jpg",
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
