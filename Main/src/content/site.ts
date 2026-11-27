export const site = {
  name: "江西惠洁管业科技有限公司",
  brand: "惠洁管业",
  brandEn: "HUIJIE TUBE INDUSTRY",
  slogan: "专注塑料管道制造 · 全口径 · 全材质",
  domain: "https://www.huijiejx.com", // TODO: 域名确定后修改这一处
  phone: "18178925551",
  phoneDisplay: "181-7892-5551",
  contactName: "江总",
  email: "sales@huijiejx.com", // 待确认
  address: "江西省九江市永修县云山经济开发区军山荣棋大道北侧6号",
  addressShort: "江西 · 九江 · 永修",
  founded: "2023",
  capital: "2800万元",
  icp: "赣ICP备XXXXXXXX号", // 备案下来后替换
  police: "赣公网安备 XXXXXXXX 号",
  wechatQr: "/images/wechat-qr.png",
  hours: "周一至周六 08:00–18:00",
};

export const nav = [
  { label: "首页", href: "/" },
  { label: "产品中心", href: "/products/" },
  { label: "解决方案", href: "/solutions/" },
  { label: "工程案例", href: "/cases/" },
  { label: "品质与研发", href: "/quality/", children: [
    { label: "品质与认证", href: "/quality/" },
    { label: "技术与研发", href: "/technology/" },
  ]},
  { label: "服务支持", href: "/service/" },
  { label: "关于我们", href: "/about/", children: [
    { label: "公司简介", href: "/about/" },
    { label: "新闻资讯", href: "/news/" },
    { label: "加入我们", href: "/careers/" },
  ]},
  { label: "联系我们", href: "/contact/" },
];

export const materialColor: Record<string, string> = {
  PE100: "#2B6FD4",
  PE80: "#4A87DE",
  HDPE: "#1E5FB8",
  "PVC-U": "#8A939C",
  "PVC-C": "#D08A2C",
  MPP: "#C4552B",
  PPR: "#2E9E6B",
  PP: "#5B7DB1",
  "复合材料": "#6B7B8C",
};