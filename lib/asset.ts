// Базовый путь деплоя: GitHub Pages отдаёт сайт из https://<user>.github.io/oktashop/,
// поэтому публичные ассеты (/products/..., /lookbook/...) нуждаются в префиксе.
// В dev и при обычном деплое переменная не задана — путь остаётся "/...".
// Задаётся в CI: NEXT_PUBLIC_BASE_PATH=/oktashop (см. .github/workflows/deploy.yml).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Путь к публичному ассету с учётом базового пути деплоя. */
export const asset = (p: string) => `${BASE_PATH}${p}`;
