// Базовый путь деплоя: GitHub Pages отдаёт сайт из https://<user>.github.io/oktashop/,
// поэтому публичные ассеты (/products/..., /lookbook/...) нуждаются в префиксе.
// В dev и при обычном деплое переменная не задана — путь остаётся "/...".
// Задаётся в CI: NEXT_PUBLIC_BASE_PATH=/oktashop (см. .github/workflows/deploy.yml).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Путь к публичному ассету с учётом базового пути деплоя. */
export const asset = (p: string) => `${BASE_PATH}${p}`;

/** Публичный адрес сайта для metadataBase/OG/canonical/sitemap.
 *  В CI задаётся NEXT_PUBLIC_BASE_PATH=/oktashop → https://x8haker.github.io/oktashop.
 *  Локально (без basePath) — просто origin. Домен oktashop.tj не существует,
 *  поэтому раньше все абсолютные URL указывали в никуда. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://x8haker.github.io${BASE_PATH}`;
