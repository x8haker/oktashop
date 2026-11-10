import type { Metadata } from "next";
import { Suspense } from "react";
import { Roboto_Condensed, Manrope, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/lib/cart";
import { BASE_PATH, asset } from "@/lib/asset";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Шрифты с кириллицей (в прежних Anton/Space Grotesk/Bebas её нет —
// русские заголовки падали в системный Impact).
// Имена CSS-переменных и Tailwind-классов оставлены прежними,
// чтобы не переписывать сотни разметок.
const anton = Roboto_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"], // display-заголовки: Anton был ultra-black
  variable: "--font-anton",
  display: "swap",
});

const grotesk = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const bebas = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"], // узкий капс для микро-лейблов вместо Bebas Neue
  variable: "--font-bebas",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Реальный адрес деплоя (GitHub Pages). Раньше здесь был несуществующий
  // oktashop.tj — все OG/canonical-URL уходили в никуда.
  // metadataBase — только origin: абсолютные пути ниже содержат basePath сами.
  metadataBase: new URL("https://x8haker.github.io"),
  title: {
    default: "OKTASHOP® — NOT MADE TO FIT IN.",
    template: "%s — OKTASHOP®",
  },
  description:
    "OKTASHOP® — независимый магазин стритвира из Душанбе. Худи, багги-джинсы, куртки и аксессуары. Уличная культура, стиль 90-х и скейт-культура.",
  keywords: [
    "streetwear Dushanbe",
    "OKTASHOP",
    "худи Душанбе",
    "baggy jeans",
    "одежда Таджикистан",
  ],
  openGraph: {
    title: "OKTASHOP® — NOT MADE TO FIT IN.",
    description:
      "Независимый магазин стритвира. Дроп 001 — худи, багги джинсы, куртки и аксессуары.",
    type: "website",
    locale: "ru_RU",
    siteName: "OKTASHOP®",
    // og.png не существовал (ссылка давала 404) — используем реальное фото лукбука.
    images: [{ url: asset("/lookbook/01.jpg"), alt: "OKTASHOP®" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OKTASHOP®",
    description: "NOT MADE TO FIT IN. Независимый магазин стритвира из Душанбе.",
    images: [asset("/lookbook/01.jpg")],
  },
  // canonical здесь НЕ задаётся: он применялся бы ко всем страницам сразу
  // (/about и др. объявляли бы canonical на главную). Свой — в каждой странице.
  icons: { icon: `${BASE_PATH}/icon.svg`, shortcut: `${BASE_PATH}/favicon.ico` },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: инлайн-скрипт ниже добавляет класс "js"
    // до гидрации — React иначе жалуется на расхождение атрибута className.
    <html lang="ru" suppressHydrationWarning>
      {/* Класс .js включает CSS-гейт скрытия [data-reveal] до первой отрисовки React.
          Без JS (или при ошибке) весь контент остаётся видимым. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
      </head>
      <body
        className={`${anton.variable} ${grotesk.variable} ${bebas.variable} ${mono.variable} grain`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10001] focus:bg-lime focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-void"
        >
          Перейти к содержимому
        </a>

        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <ScrollEffects />
        <Cursor />

        <CartProvider>
          {/* Navbar использует useSearchParams (active-состояние пунктов меню) —
              в Next 15 это требует Suspense-границы. */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {/* tabindex=-1: skip-link передаёт фокус на main (a11y) */}
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
