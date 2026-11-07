# OKTASHOP® — NOT MADE TO FIT IN.

Сайт streetwear-магазина OKTASHOP (Душанбе): каталог, корзина и оформление
заказа с переходом в Telegram (оплата при получении).

**Демо-режим:** цены и размеры — временные, уточняются у поставщика.
Фото — реальные, из каталога магазина.

Список найденных проблем: `BUGS.md`. Что уже исправлено: `FIXES.md`.

## Стек

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS, GSAP/ScrollTrigger, Lenis, Framer Motion, Lucide
- Статический экспорт → GitHub Pages

## Локальный запуск

```bash
npm ci
npm run dev
```

## Публикация

Сайт собирается и публикуется автоматически GitHub Actions
(`.github/workflows/deploy.yml`) при пуше в ветку `main`:

1. `NEXT_PUBLIC_BASE_PATH=/oktashop` — базовый путь project site на GitHub Pages;
2. `npm run build` — статический экспорт в `out/`;
3. деплой артефакта на GitHub Pages.

Раз в репозитории: **Settings → Pages → Source: GitHub Actions**.

После первой публикации сайт доступен по адресу
`https://<логин>.github.io/oktashop/`.

## Структура

```
app/            страницы (главная, /shop, /product/[slug], /cart, /checkout, …)
components/     UI-компоненты (Navbar, ProductCard, QuickView, …)
lib/            данные каталога, корзина, конфиг, ассеты
public/         реальные фото товаров (products/) и лукбука (lookbook/)
```
