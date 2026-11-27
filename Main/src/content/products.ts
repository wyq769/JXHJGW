export type Category = { slug: string; name: string; en: string; desc: string; useCases: string[] };

export type SpecTable = { columns: string[]; rows: (string | number)[][]; note?: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  material: string;
  standard: string;
  dnRange: [number, number];
  pressure?: string[];
  stiffness?: string[];
  connection: string[];
  length: string;
  colorDesc: string;
  summary: string;
  features: string[];
  applications: string[];
  spec: SpecTable;
  verified: boolean;
};

export const categories: Category[] = [
  { slug: "water-supply", name: "给水管系列", en: "Water Supply", desc: "饮用水、市政给水与建筑给水用管材，卫生性能与承压能力并重。", useCases: ["市政给水", "建筑给水", "农村饮水"] },
  { slug: "drainage", name: "排水排污系列", en: "Drainage & Sewer", desc: "建筑排水、市政排污、雨污分流与检查井配套，环刚度与密封性是关键。", useCases: ["市政排污", "雨污分流", "建筑排水"] },
  { slug: "power-telecom", name: "电力通讯系列", en: "Power & Telecom", desc: "电缆护套管、通信管道与多孔管，服务电网、通信与园区管线综合。", useCases: ["电力排管", "通信管网", "园区管廊"] },
  { slug: "gas", name: "燃气系列", en: "Gas", desc: "城镇燃气中低压输配用 PE 管材，执行 GB 15558 系列标准。", useCases: ["城镇燃气", "工业供气"] },
  { slug: "irrigation", name: "农业灌溉系列", en: "Irrigation", desc: "高标准农田、果园与大田节水灌溉用管材及滴灌产品。", useCases: ["高标准农田", "果园滴灌", "园林绿化"] },
  { slug: "sponge-city", name: "海绵城市配套", en: "Sponge City", desc: "雨水收集、蓄水与检查井盖等配套制品，服务海绵化改造项目。", useCases: ["雨水收集", "海绵改造", "小区配套"] },
];

const ring = (od: number, en: number, density: number) => {
  const d = od / 1000;
  const di = (od - 2 * en) / 1000;
  return (Math.PI / 4) * (d * d - di * di) * density * 1000;
};

const SDR_PN: Record<string, number> = { "PN0.6": 26, "PN0.8": 21, "PN1.0": 17, "PN1.25": 13.6, "PN1.6": 11, "PN2.0": 9, "PN2.5": 7.4 };

/** 生成「口径 × 压力等级」的壁厚矩阵 */
function matrix(dns: number[], pns: string[], density: number): SpecTable {
  const rows: (string | number)[][] = [];
  dns.forEach((dn) => {
    pns.forEach((pn) => {
      const sdr = SDR_PN[pn];
      if (!sdr) return;
      const en = Math.round((dn / sdr) * 10) / 10;
      rows.push([dn, en.toFixed(1), "SDR" + (Number.isInteger(sdr) ? sdr : sdr.toFixed(1)), pn, ring(dn, en, density).toFixed(2)]);
    });
  });
  return { columns: ["公称外径 DN", "壁厚 en mm", "尺寸比", "压力等级", "理论米重 kg/m"], rows, note: "壁厚按 GB/T 标准尺寸比推算，实际以出厂检测报告为准。" };
}

/** 波纹管：口径 × 环刚度 */
function corrugated(dns: number[], sns: string[]): SpecTable {
  const rows: (string | number)[][] = [];
  dns.forEach((dn) => {
    sns.forEach((sn) => {
      const od = Math.round(dn * 1.06);
      const weight = (dn * 0.11 + Number(sn.replace("SN", "")) * 0.9).toFixed(2);
      rows.push([dn, dn, od, sn, weight]);
    });
  });
  return { columns: ["公称内径 DN/ID", "内径 mm", "外径 mm", "环刚度", "参考重量 kg/m"], rows, note: "环刚度等级按 GB/T 19472.1 选用，埋深与荷载条件请咨询技术支持。" };
}

export const products: Product[] = [
  {
    slug: "pe-water-pipe",
    name: "PE 给水管（PE100）",
    category: "water-supply",
    material: "PE100",
    standard: "GB/T 13663.2-2018",
    dnRange: [20, 800],
    pressure: ["PN0.6", "PN0.8", "PN1.0", "PN1.25", "PN1.6"],
    connection: ["热熔对接", "电熔连接", "法兰连接"],
    length: "直管 6m / 9m / 12m，盘管 100m / 200m",
    colorDesc: "黑色管材 + 蓝色色条（饮用水用）",
    summary: "以 PE100 级聚乙烯为原料，韧性好、耐腐蚀、内壁光滑不结垢，是市政给水与农村饮水工程的主力管材。",
    features: ["卫生性能符合生活饮用水输配水设备要求", "断裂伸长率≥350%，抗地基不均匀沉降", "内壁粗糙度低，同等口径输水能力优于钢管", "热熔接口与管材本体等强度，接口不渗漏"],
    applications: ["市政给水管网", "农村饮水安全工程", "建筑给水立管", "工业输水"],
    spec: matrix([20, 32, 50, 63, 90, 110, 160, 200, 250, 315, 400, 500, 630, 800], ["PN0.6", "PN0.8", "PN1.0", "PN1.25", "PN1.6"], 0.95),
    verified: false,
  },
  {
    slug: "pvc-u-water-pipe",
    name: "PVC-U 给水管",
    category: "water-supply",
    material: "PVC-U",
    standard: "GB/T 10002.1-2006",
    dnRange: [20, 400],
    pressure: ["PN0.63", "PN0.8", "PN1.0", "PN1.6"],
    connection: ["承插粘接", "弹性密封圈", "法兰连接"],
    length: "直管 4m / 6m",
    colorDesc: "灰色（常规）/ 白色",
    summary: "硬聚氯乙烯给水管，耐压稳定、施工便捷，适用于建筑给水、小区管网与工业常温输水。",
    features: ["耐化学腐蚀，使用寿命可达 50 年", "重量轻，运输与安装成本低", "承插粘接施工速度快", "内壁光滑，水头损失小"],
    applications: ["建筑给水", "小区供水管网", "工业常温输水"],
    spec: matrix([20, 25, 32, 40, 50, 63, 75, 90, 110, 160, 200, 250, 315, 400], ["PN0.63", "PN0.8", "PN1.0", "PN1.6"], 1.4),
    verified: false,
  },
  {
    slug: "ppr-pipe",
    name: "PP-R 给水管",
    category: "water-supply",
    material: "PPR",
    standard: "GB/T 18742.2-2017",
    dnRange: [20, 110],
    pressure: ["PN1.6", "PN2.0", "PN2.5"],
    connection: ["热熔承插", "螺纹连接"],
    length: "直管 4m",
    colorDesc: "白色 / 绿色",
    summary: "无规共聚聚丙烯管材，热熔连接一体成型，主要用于建筑室内冷热水与家装给水系统。",
    features: ["可耐 70℃ 长期热水，短时 95℃", "热熔连接无渗漏隐患", "卫生无毒，符合饮用水要求", "保温性能优于金属管"],
    applications: ["住宅冷热水", "家装给水", "医院与酒店给水"],
    spec: matrix([20, 25, 32, 40, 50, 63, 75, 90, 110], ["PN1.6", "PN2.0", "PN2.5"], 0.91),
    verified: false,
  },
  {
    slug: "pvc-u-drain-pipe",
    name: "PVC-U 排水管",
    category: "drainage",
    material: "PVC-U",
    standard: "GB/T 5836.1-2018",
    dnRange: [32, 400],
    connection: ["承插粘接", "弹性密封圈"],
    length: "直管 4m / 6m",
    colorDesc: "白色 / 灰色",
    summary: "建筑排水用硬聚氯乙烯管材，配套管件齐全，用于生活污水、雨水与通气管道。",
    features: ["内壁光滑，排水阻力小", "耐酸碱腐蚀", "质轻，安装便捷", "与 PVC-U 管件配套完整"],
    applications: ["建筑排水", "雨水排放", "阳台与空调冷凝水"],
    spec: matrix([32, 40, 50, 75, 90, 110, 160, 200, 250, 315, 400], ["PN0.6"], 1.4),
    verified: false,
  },
  {
    slug: "hdpe-double-wall-corrugated",
    name: "HDPE 双壁波纹管",
    category: "drainage",
    material: "HDPE",
    standard: "GB/T 19472.1-2019",
    dnRange: [110, 1200],
    stiffness: ["SN4", "SN8", "SN12.5"],
    connection: ["承插式电熔", "弹性密封圈（承插）"],
    length: "直管 6m（大口径可定制）",
    colorDesc: "黑色（可加色条）",
    summary: "外壁波纹、内壁光滑的结构壁管，环刚度高、重量轻，是市政雨污水与埋地排水的主流选择。",
    features: ["同环刚度下重量约为混凝土管的 1/8", "内壁光滑，曼宁系数 0.009", "柔性管适应地基变形，接口密封可靠", "施工速度快，综合造价低"],
    applications: ["市政雨水管", "市政污水管", "小区排水", "工业废水"],
    spec: corrugated([110, 160, 200, 300, 400, 500, 600, 800, 1000, 1200], ["SN4", "SN8", "SN12.5"]),
    verified: false,
  },
  {
    slug: "steel-reinforced-spiral",
    name: "钢带增强 PE 螺旋波纹管",
    category: "drainage",
    material: "HDPE",
    standard: "CJ/T 225-2011",
    dnRange: [300, 2200],
    stiffness: ["SN8", "SN12.5", "SN16"],
    connection: ["热熔挤出焊接", "电熔连接"],
    length: "直管 6m / 12m",
    colorDesc: "黑色",
    summary: "以钢带为增强体的螺旋结构壁管，环刚度可达 SN16，适用于大口径、深埋与重载条件的市政主干管。",
    features: ["大口径 2200mm 覆盖，替代混凝土管", "环刚度高，深埋与重载工况适用", "重量轻，吊装与安装效率高", "内壁光滑，流量大"],
    applications: ["市政主干排水", "深埋排污管", "机场与堆场排水"],
    spec: corrugated([300, 400, 500, 600, 800, 1000, 1200, 1500, 1800, 2200], ["SN8", "SN12.5", "SN16"]),
    verified: false,
  },
  {
    slug: "plastic-inspection-well",
    name: "塑料检查井",
    category: "drainage",
    material: "PP",
    standard: "CJ/T 233-2006",
    dnRange: [315, 1000],
    connection: ["承插式密封", "与管道胶圈连接"],
    length: "按井深组合（井筒可切割）",
    colorDesc: "黑色 / 灰色",
    summary: "以 PP/PE 为原料的组装式检查井，替代砖砌井，施工快、密封好、不渗漏。",
    features: ["工厂预制，现场组装，工期缩短 60% 以上", "整体密封，杜绝地下水渗入与污水外渗", "耐腐蚀，使用寿命长", "井筒可现场切割，适配不同埋深"],
    applications: ["市政排水检查井", "小区雨污水井", "道路配套"],
    spec: {
      columns: ["井座规格", "适配管径 mm", "井筒内径 mm", "最大埋深 m"],
      rows: [["Φ315", "≤225", "315", "4"], ["Φ450", "≤400", "450", "5"], ["Φ630", "≤600", "630", "6"], ["Φ700", "≤800", "700", "6"], ["Φ1000", "≤1000", "1000", "8"]],
      note: "井座与井筒按项目埋深与荷载组合选型，可由技术支持出具配置方案。",
    },
    verified: false,
  },
  {
    slug: "mpp-power-pipe",
    name: "MPP 电力电缆护套管",
    category: "power-telecom",
    material: "MPP",
    standard: "DL/T 802.7-2010",
    dnRange: [90, 250],
    pressure: ["PN1.0", "PN1.25"],
    connection: ["热熔对接", "承插式连接"],
    length: "直管 6m / 9m / 12m",
    colorDesc: "橙色 / 红色（电力标识）",
    summary: "改性聚丙烯电力护套管，耐高温、抗外压，用于城市电网入地、变电站出线与园区电力排管。",
    features: ["维卡软化温度≥120℃，适应电缆发热", "环刚度高，抗施工机械碾压", "可热熔对接，接口强度高", "绝缘性能好，不产生电腐蚀"],
    applications: ["城市电网入地", "变电站出线", "园区电力排管", "高速公路机电管线"],
    spec: matrix([90, 110, 125, 160, 175, 200, 225, 250], ["PN1.0", "PN1.25"], 0.91),
    verified: false,
  },
  {
    slug: "cpvc-power-pipe",
    name: "CPVC 电力护套管",
    category: "power-telecom",
    material: "PVC-C",
    standard: "DL/T 802.3-2007",
    dnRange: [50, 200],
    connection: ["承插粘接", "弹性密封圈"],
    length: "直管 6m",
    colorDesc: "橙红色",
    summary: "氯化聚氯乙烯电力套管，耐热与阻燃性能突出，适用于高温环境与变电站内电缆保护。",
    features: ["热变形温度高，耐候性好", "氧指数高，阻燃自熄", "内壁光滑，穿缆顺畅", "抗老化，埋地与户外均可"],
    applications: ["变电站电缆保护", "高温区域排管", "通信基站管线"],
    spec: matrix([50, 63, 75, 90, 110, 140, 160, 200], ["PN1.0", "PN1.6"], 1.55),
    verified: false,
  },
  {
    slug: "pvc-u-telecom-pipe",
    name: "PVC-U 通信管",
    category: "power-telecom",
    material: "PVC-U",
    standard: "YD/T 841.2-2016",
    dnRange: [40, 110],
    connection: ["承插粘接", "套管接头"],
    length: "直管 6m",
    colorDesc: "白色 / 灰色",
    summary: "通信管道用硬聚氯乙烯管材，用于运营商主干管道、小区弱电管网与园区通信排管。",
    features: ["内壁光滑，穿缆阻力小", "抗外压性能满足管道埋深要求", "耐腐蚀、不虫蛀", "接口密封，防止泥砂进入"],
    applications: ["运营商通信管道", "小区弱电管网", "园区通信排管"],
    spec: matrix([40, 50, 63, 75, 90, 110], ["PN0.6", "PN1.0"], 1.4),
    verified: false,
  },
  {
    slug: "seven-hole-pipe",
    name: "七孔梅花管",
    category: "power-telecom",
    material: "PVC-U",
    standard: "YD/T 841.5-2016",
    dnRange: [32, 40],
    connection: ["承插式套管连接"],
    length: "直管 6m",
    colorDesc: "白色 / 灰色",
    summary: "一体多孔的梅花形通信管，一次敷设提供 7 个独立子孔，节省管位与土建投资。",
    features: ["7 孔一体，光缆分孔穿放互不干扰", "同心度高，接口对接顺畅", "抗压强度高，适合车行道下敷设", "施工效率高，节省管沟断面"],
    applications: ["城市通信主干管道", "光缆分支管网", "园区弱电"],
    spec: {
      columns: ["规格", "子孔数", "单孔内径 mm", "外径 mm", "长度 m"],
      rows: [["Φ32×7", "7", "32", "98", "6"], ["Φ40×7", "7", "40", "122", "6"]],
      note: "多孔管可按客户要求定制孔数与排列形式。",
    },
    verified: false,
  },
  {
    slug: "pe-gas-pipe",
    name: "PE 燃气管（PE80/PE100）",
    category: "gas",
    material: "PE100",
    standard: "GB 15558.1-2015",
    dnRange: [20, 400],
    pressure: ["PN0.4", "PN0.8"],
    connection: ["电熔连接", "热熔对接"],
    length: "盘管 100m / 200m，直管 6m / 12m",
    colorDesc: "黄色（或黑色 + 黄色色条）",
    summary: "城镇燃气用聚乙烯管材，柔韧性好、接口可靠，适用于中低压燃气输配与入户管道。",
    features: ["专用燃气料，耐燃气组分腐蚀", "电熔接口质量可记录、可追溯", "柔性敷设适应地质变形", "黄色标识，便于管线识别"],
    applications: ["城镇中压燃气管网", "小区庭院燃气", "工业供气"],
    spec: matrix([20, 32, 63, 90, 110, 160, 200, 250, 315, 400], ["PN0.4", "PN0.8"], 0.95),
    verified: false,
  },
  {
    slug: "pe-irrigation-pipe",
    name: "PE 灌溉管",
    category: "irrigation",
    material: "PE80",
    standard: "GB/T 13663.2-2018",
    dnRange: [16, 315],
    pressure: ["PN0.4", "PN0.6", "PN1.0"],
    connection: ["承插快接", "热熔对接", "内嵌式接头"],
    length: "盘管 100m / 200m / 500m",
    colorDesc: "黑色 / 蓝色",
    summary: "高标准农田与果园灌溉用 PE 管材，盘卷供货、接头少，适配喷灌、滴灌与输配水系统。",
    features: ["盘卷长度大，田间接头少，漏水点少", "耐紫外线配方，露天敷设寿命长", "柔韧易弯曲，适应地形起伏", "配套快接件，安装无需专用设备"],
    applications: ["高标准农田输水", "果园滴灌", "园林绿化", "大棚灌溉"],
    spec: matrix([16, 20, 25, 32, 40, 50, 63, 75, 90, 110, 160, 200, 250, 315], ["PN0.4", "PN0.6", "PN1.0"], 0.95),
    verified: false,
  },
  {
    slug: "drip-tape",
    name: "内镶贴片滴灌管（带）",
    category: "irrigation",
    material: "PE80",
    standard: "GB/T 19812.1-2017",
    dnRange: [16, 20],
    connection: ["旁通阀", "快速接头", "堵头"],
    length: "盘卷 500m / 1000m",
    colorDesc: "黑色",
    summary: "内镶扁平滴头的滴灌产品，出水均匀、抗堵塞，是水肥一体化系统的末端设备。",
    features: ["滴头流量 1.6–3.0 L/h 可选", "滴头间距 20/30/40cm 可定制", "抗堵塞流道设计，支持水肥一体化", "铺设长度长，降低系统投资"],
    applications: ["果园滴灌", "大棚蔬菜", "大田经济作物"],
    spec: {
      columns: ["规格", "滴头流量 L/h", "滴头间距 cm", "工作压力 MPa", "盘卷长度 m"],
      rows: [["Φ16", "2.0", "30", "0.10", "500"], ["Φ16", "3.0", "20", "0.10", "500"], ["Φ20", "3.0", "30", "0.10", "1000"]],
      note: "流量与间距可按作物与地块条件定制。",
    },
    verified: false,
  },
  {
    slug: "rainwater-module",
    name: "PP 雨水收集模块",
    category: "sponge-city",
    material: "PP",
    standard: "参照 CJ/T 542",
    dnRange: [500, 1200],
    connection: ["卡扣拼装", "防渗膜包覆"],
    length: "单体 500×1000×500mm 等规格",
    colorDesc: "黑色",
    summary: "用于地下雨水蓄存与回用的拼装式模块，配合防渗膜、过滤与溢流系统，服务海绵城市建设。",
    features: ["承压≥300kN/m²，可覆土绿化或行车", "拼装灵活，蓄水率>95%", "施工周期短，开挖量小", "配合过滤消毒可回用于绿化浇洒"],
    applications: ["小区雨水调蓄", "海绵化改造", "公园与广场蓄水"],
    spec: {
      columns: ["单体规格 mm", "单块体积 m³", "孔隙率", "抗压强度 kN/m²"],
      rows: [["500×1000×500", "0.25", "≥95%", "≥300"]],
      note: "蓄水池容积按汇水面积与设计降雨量计算，可提供选型建议。",
    },
    verified: false,
  },
  {
    slug: "water-meter-box",
    name: "高分子水表箱",
    category: "sponge-city",
    material: "复合材料",
    standard: "参照 CJ/T 234",
    dnRange: [300, 1200],
    connection: ["埋地安装", "螺钉固定"],
    length: "单体/多表位组合",
    colorDesc: "黑色 / 灰色",
    summary: "SMC/复合高分子材料水表箱，耐腐蚀、防盗、便于抄表，用于小区与市政给水计量井。",
    features: ["不锈不腐，使用寿命长于金属箱体", "整体成型，密封防雨", "可开启翻盖，便于抄表与检修", "可定制表位数与标识"],
    applications: ["小区计量水表井", "市政给水计量", "农村饮水计量"],
    spec: {
      columns: ["表位", "外形尺寸 mm", "材质", "承压"],
      rows: [["单表位", "400×300×250", "SMC", "可上人"], ["四表位", "800×400×300", "SMC", "可上人"], ["六表位", "1100×450×300", "SMC", "可上人"]],
      note: "表位与尺寸按水司要求定制。",
    },
    verified: false,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: string) => products.filter((p) => p.category === cat);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const allMaterials = Array.from(new Set(products.map((p) => p.material)));