# 江西惠洁管业科技有限公司 · 公司官网

江西惠洁管业科技有限公司（统一社会信用代码 91360425MAC95K05X0）官方网站源码与策划文档。
主营：PE / PVC-U / PPR / MPP / HDPE 结构壁等塑料管道，覆盖给水、排水排污、电力通讯、燃气、农业灌溉、海绵城市六大系列。

## 仓库结构

- `Main/`　Next.js 15 静态站点源码（App Router + TypeScript + Tailwind CSS）
- `策划案/`　01 官网策划案、02 内容与数据说明、03 技术与部署、04 上线检查清单、05 视觉优化建议、06 工程案例数据来源
- `资源/`　商标原图（项目合同目录已从仓库排除）
- `netlify.toml`　Netlify 构建配置

## 本地开发

```bash
cd Main
npm install
npm run dev      # http://localhost:3000
npm run build    # 静态导出到 Main/out
```

预览已构建产物（不起 dev server）：`node scripts/serve-out.cjs 4321` → http://localhost:4321/

## 部署（Netlify）

仓库已接入 `netlify.toml`：`base=Main`、`command=npm run build`、`publish=out`、`NODE_VERSION=20`。
在 Netlify 里选择本仓库即可自动构建；也可以直接把 `Main/out` 目录拖到 Netlify Deploys 页做临时预览。

## 内容维护

站点内容全部文件化，改文案不需要碰组件：

- `Main/src/content/site.ts`　公司信息、电话、地址、导航
- `Main/src/content/products.ts`　6 大类 16 款产品与规格表（`matrix()` / `corrugated()` 生成）
- `Main/src/content/solutions.ts`、`cases.ts`、`news.ts`　方案、工程案例、新闻

## 待企业确认

1. 16 款产品参数核实后把 `verified` 置为 `true`
2. 企业微信客服二维码（替换 `Main/public/images/wechat-qr.png`）
3. 正式域名、企业邮箱、ICP 备案号（现为占位）
4. 厂区/车间/检测实拍图与产品白底图（页面现为占位图位）
