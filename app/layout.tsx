import type { Metadata } from "next";
import { Suspense } from "react";
import { Anton, Space_Grotesk, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/lib/cart";
import { BASE_PATH } from "@/lib/asset";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
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
  metadataBase: new URL("https://oktashop.tj"),
  title: {
    default: "OKTASHOP® — NOT MADE TO FIT IN.",
    template: "%s — OKTASHOP®",
  },
  description:
    "OKTASHOP® — независимый streetwear-магазин из Душанбе. Худи, baggy jeans, куртки и аксессуары. Уличная культура, 90s skate, underground style.",
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
      "Independent streetwear store. Drop 001 — hoodies, baggy jeans, jackets, accessories.",
    type: "website",
    locale: "ru_RU",
    siteName: "OKTASHOP®",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OKTASHOP®" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OKTASHOP®",
    description: "NOT MADE TO FIT IN. Independent streetwear store.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  icons: { icon: `${BASE_PATH}/icon.svg` },
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
        <SmoothScroll />
        <ScrollEffects />
        <Cursor />

        <CartProvider>
          {/* Navbar использует useSearchParams (active-состояние пунктов меню) —
              в Next 15 это требует Suspense-границы. */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
