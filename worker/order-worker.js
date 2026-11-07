// Cloudflare Worker: приём заказов с сайта и отправка уведомления в Telegram.
//
// Деплой (через панель cloudflare.com):
//   1. Workers & Pages → Create → Hello World → Deploy.
//   2. Edit code — вставить это целиком → Deploy.
//   3. Settings → Variables → Add:
//        TG_BOT_TOKEN   (Secret)   — токен от @BotFather
//        TG_CHAT_ID     (Secret)   — твой chat_id в Telegram
//      (необязательно) ALLOWED_ORIGIN (text) — https://x8haker.github.io
//   4. Settings → Domains & Routes → Add route или оставить *.workers.dev.
//
// Сайт обращается: POST https://<worker>.workers.dev/order
// body: { name, phone, city, details, items: [...], subtotal, text }

const CORS = {
  "Access-Control-Allow-Origin": "*", // при желании сузить до ALLOWED_ORIGIN
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/order") {
      return json({ ok: false, error: "not found" }, 404);
    }

    // Опциональная проверка источника (защита от чужих форм).
    const allowed = env.ALLOWED_ORIGIN;
    if (allowed) {
      const origin = request.headers.get("Origin") || "";
      if (origin && origin !== allowed) {
        return json({ ok: false, error: "origin" }, 403);
      }
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: "bad json" }, 400);
    }

    // Базовая валидация — отсекаем спам и мусор.
    const name = String(data.name || "").trim().slice(0, 80);
    const phone = String(data.phone || "").trim().slice(0, 40);
    const city = String(data.city || "").trim().slice(0, 80);
    if (name.length < 2 || !/^[+\d][\d\s()-]{6,}$/.test(phone)) {
      return json({ ok: false, error: "validation" }, 400);
    }

    const text = buildMessage(data, name, phone, city);

    // Отправка в Telegram.
    const apiUrl = `https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TG_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      console.error("telegram error", await res.text());
      return json({ ok: false, error: "telegram" }, 502);
    }

    return json({ ok: true });
  },
};

function buildMessage(data, name, phone, city) {
  const items = Array.isArray(data.items) ? data.items.slice(0, 30) : [];
  const lines = items
    .map(
      (i, n) =>
        `${n + 1}. ${esc(String(i.name || "").slice(0, 120))} — ${esc(
          String(i.size || "")
        )} — ${Number(i.qty) || 1} шт × ${Number(i.price) || 0} TJS`
    )
    .join("\n");

  const details = String(data.details || "").trim().slice(0, 300);
  const total = Number(data.subtotal) || 0;

  return [
    "🛒 <b>НОВЫЙ ЗАКАЗ OKTASHOP®</b>",
    "",
    `👤 ${esc(name)}`,
    `📞 ${esc(phone)}`,
    `📍 ${esc(city)}`,
    details ? `📝 ${esc(details)}` : "",
    "",
    lines || "<i>состав не передан</i>",
    "",
    `💰 ИТОГО: ${total} TJS (+ доставка)`,
    "",
    `<i>${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</i>`,
  ]
    .filter(Boolean)
    .join("\n");
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
