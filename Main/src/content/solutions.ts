export type Solution = {
  slug: string;
  name: string;
  en: string;
  summary: string;
  pain: string[];
  system: { title: string; desc: string }[];
  products: string[]; // product slugs
  cases: string[]; // case slugs
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "municipal-water",
    name: "市政给排水",
    en: "Municipal Water & Sewer",
    summary: "从水厂出厂干管到街区配水、雨污分流的成套管材配置，兼顾承压、环刚度与施工效率。",
    pain: ["老城区管网漏损率高，爆管频发", "雨污混接，改造需分系统选材", "道路开挖受限，要求施工快、接口可靠"],
    system: [
      { title: "输配水干管", desc: "PE100 给水管 DN200–DN800，热熔/电熔连接，适应软基与不均匀沉降。" },
      { title: "街区配水", desc: "PE 给水管 DN63–DN200 + 阀门井、水表箱配套。" },
      { title: "雨污分流", desc: "HDPE 双壁波纹管 SN8/SN12.5 + 塑料检查井，柔性接口密封防渗。" },
      { title: "深埋主干", desc: "钢带增强 PE 螺旋波纹管 DN800–DN2200，替代混凝土管。" },
    ],
    products: ["pe-water-pipe", "hdpe-double-wall-corrugated", "steel-reinforced-spiral", "plastic-inspection-well"],
    cases: ["yongxiu-water-network", "jiujiang-park-drainage"],
    icon: "water",
  },
  {
    slug: "building-water",
    name: "建筑给排水",
    en: "Building Plumbing",
    summary: "住宅、公建与厂房的室内给水、排水、雨水系统管材，注重卫生性能、噪音与安装效率。",
    pain: ["立管噪音影响住户体验", "冷热水管材混用导致隐患", "精装交付要求施工周期短"],
    system: [
      { title: "室内给水", desc: "PP-R 冷热水管 DN20–DN110，热熔承插，一体成型无渗漏。" },
      { title: "室内排水", desc: "PVC-U 排水管 DN50–DN160 + 配套管件，内壁光滑降噪。" },
      { title: "小区供水", desc: "PE 给水管 + 高分子水表箱，分区计量。" },
      { title: "屋面雨水", desc: "PVC-U 雨水管与虹吸雨水系统配套管件。" },
    ],
    products: ["ppr-pipe", "pvc-u-drain-pipe", "pe-water-pipe", "water-meter-box"],
    cases: [],
    icon: "building",
  },
  {
    slug: "power-telecom",
    name: "电力通讯管网",
    en: "Power & Telecom Duct",
    summary: "电缆入地、变电站出线、通信主干与园区管廊的护套管配置，抗外压、耐热、穿缆顺畅。",
    pain: ["道路下排管承受车辆荷载，易压扁", "电缆发热导致套管软化变形", "多运营商共用管位，需要多孔方案"],
    system: [
      { title: "电力排管", desc: "MPP 电力护套管 DN90–DN250，热熔对接，环刚度高。" },
      { title: "变电站内", desc: "CPVC 护套管，耐高温阻燃，适配电缆沟与穿墙。" },
      { title: "通信主干", desc: "PVC-U 通信管 DN40–DN110 + 七孔梅花管，一沟多孔。" },
      { title: "管线综合", desc: "按管廊断面出具排管组合与间距建议。" },
    ],
    products: ["mpp-power-pipe", "cpvc-power-pipe", "pvc-u-telecom-pipe", "seven-hole-pipe"],
    cases: ["yongxiu-power-duct"],
    icon: "power",
  },
  {
    slug: "gas-network",
    name: "燃气输配",
    en: "Gas Distribution",
    summary: "城镇中低压燃气管网与庭院入户的 PE 管材与电熔连接方案，强调接口可追溯。",
    pain: ["燃气管网对接口质量要求极高", "老城区改造空间狭窄，需柔性敷设", "第三方破坏预警与管线标识要求"],
    system: [
      { title: "中压干管", desc: "PE 燃气管 DN110–DN400，SDR11/17，电熔连接。" },
      { title: "庭院与入户", desc: "PE 燃气管 DN32–DN63 + 钢塑转换接头。" },
      { title: "接口质量", desc: "电熔焊机记录焊接参数，可追溯至焊口编号。" },
    ],
    products: ["pe-gas-pipe"],
    cases: ["town-gas-pipeline"],
    icon: "gas",
  },
  {
    slug: "agriculture-irrigation",
    name: "农业节水灌溉",
    en: "Agricultural Irrigation",
    summary: "高标准农田、果园与大田的输配水与滴灌系统，盘卷供货减少接头、降低漏损。",
    pain: ["田块分散，管道接头多、漏水点多", "露天敷设需抗紫外线老化", "水肥一体化对滴头均匀度要求高"],
    system: [
      { title: "输配水", desc: "PE 灌溉管 DN63–DN315，盘管或直管敷设。" },
      { title: "田间管网", desc: "PE 灌溉管 DN16–DN63 + 快接件，随地形铺设。" },
      { title: "滴灌末端", desc: "内镶贴片滴灌管（带），流量 1.6–3.0 L/h。" },
    ],
    products: ["pe-irrigation-pipe", "drip-tape"],
    cases: ["farmland-irrigation"],
    icon: "irrigation",
  },
  {
    slug: "sponge-city",
    name: "海绵城市",
    en: "Sponge City",
    summary: "雨水收集、蓄存、回用与检查井配套，服务小区、公园与道路的海绵化改造。",
    pain: ["内涝频发，需要调蓄空间", "改造场地紧张，要求开挖量小", "雨水回用需要成套过滤与消毒"],
    system: [
      { title: "雨水调蓄", desc: "PP 雨水收集模块拼装蓄水池，孔隙率≥95%。" },
      { title: "转输与检查", desc: "HDPE 波纹管 + 塑料检查井，密封防渗。" },
      { title: "计量配套", desc: "高分子水表箱与井盖配套。" },
    ],
    products: ["rainwater-module", "hdpe-double-wall-corrugated", "plastic-inspection-well"],
    cases: ["yunshan-sponge"],
    icon: "sponge",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);