export type InquiryPayload = {
  name: string;
  company?: string;
  phone: string;
  demand: "pipe" | "solution" | "sample" | "other";
  product?: string;
  dn?: string;
  pn?: string;
  quantity?: string;
  message?: string;
  pageUrl?: string;
  ts?: number;
};

export type InquiryResult = { ok: boolean; id?: string; error?: string };

/**
 * 询价提交入口。当前实现：若配置了企业微信机器人 Webhook 则直接 POST；
 * 否则回退为「演示模式」，仅打印到控制台并返回成功，便于设计阶段验证交互。
 *
 * 后端上线时，把下面的实现替换为 POST /api/inquiry，请求/响应契约保持不变。
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  const body = { ...payload, ts: Date.now(), pageUrl: typeof window !== "undefined" ? window.location.href : "" };
  const webhook = process.env.NEXT_PUBLIC_WECOM_WEBHOOK;

  if (!webhook) {
    console.info("[inquiry:demo]", body);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, id: "demo" };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msgtype: "markdown",
        markdown: {
          content: [
            "**官网询价**",
            `> 姓名：${body.name}`,
            `> 公司：${body.company || "-"}`,
            `> 电话：${body.phone}`,
            `> 需求：${body.demand}`,
            `> 产品：${body.product || "-"} ${body.dn || ""} ${body.pn || ""}`,
            `> 数量：${body.quantity || "-"}`,
            `> 留言：${body.message || "-"}`,
            `> 来源：${body.pageUrl}`,
          ].join("\n"),
        },
      }),
    });
    if (!res.ok) return { ok: false, error: "提交失败，请致电 " + "18178925551" };
    return { ok: true, id: String(Date.now()) };
  } catch (e) {
    return { ok: false, error: "网络异常，请稍后重试或直接致电" };
  }
}