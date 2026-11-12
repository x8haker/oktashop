import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Truck, MapPin, MessageCircle } from "lucide-react";

import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import NewArrivals from "@/components/home/NewArrivals";
import Featured from "@/components/home/Featured";
import { categories, products } from "@/lib/products";
import { storeConfig } from "@/lib/config";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  alternates: { canonical: asset("/") },
};

const LOOKBOOK = [
  { src: asset("/lookbook/01.jpg"), cap: "ОБРАЗ 01 / НЬЮ-ЙОРК" },
  { src: asset("/lookbook/03.jpg"), cap: "ОБРАЗ 02 / УЛИЧНЫЕ СЛОИ" },
  { src: asset("/lookbook/05.jpg"), cap: "ОБРАЗ 03 / ЗЕРКАЛЬНЫЙ ОБРАЗ" },
  { src: asset("/lookbook/06.jpg"), cap: "ОБРАЗ 04 / ЗЕМЛЯНЫЕ ТОНА" },
  { src: asset("/lookbook/07.jpg"), cap: "ОБРАЗ 05 / ПРЕППИ-КЛУБ" },
  { src: asset("/lookbook/10.jpg"), cap: "ОБРАЗ 06 / ШИРОКИЙ КРОЙ" },
  { src: asset("/lookbook/02.jpg"), cap: "ОБРАЗ 07 / ГОРОДСКОЕ ДВИЖЕНИЕ" },
  { src: asset("/lookbook/04.jpg"), cap: "ОБРАЗ 08 / МОНОХРОМ" },
  { src: asset("/lookbook/08.jpg"), cap: "ОБРАЗ 09 / ВНЕ СМЕНЫ" },
  { src: asset("/lookbook/09.jpg"), cap: "ОБРАЗ 10 / ПОЗДНИЙ ВЫХОД" },
];

export default function HomePage() {
  return (
    <>
      {/* ============ 01 HERO ============ */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24">
        {/* фоновое фото */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            {/* Реальное фото магазина вместо стокового Unsplash (style.md запрещает
                дешёвые стоковые фото); loading eager — это hero первого экрана. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/lookbook/09.jpg")}
              alt="Фото лукбука OKTASHOP"
              data-parallax="0.25"
              loading="eager"
              decoding="async"
              className="h-[120%] w-full object-cover object-center opacity-55 grayscale"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/70" />
        </div>

        {/* огромный вордмарк на фоне */}
        <div
          data-reveal="mask"
          className="pointer-events-none absolute inset-x-0 top-[18%] select-none text-center"
        >
          <h1 className="whitespace-nowrap font-anton text-[22vw] leading-none tracking-tighter text-dirty/[0.07]">
            OKTASHOP
          </h1>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-8 md:pb-24">
          <p
            data-reveal
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime md:text-xs"
          >
            OKTASHOP® / НЕЗАВИСИМАЯ УЛИЧНАЯ КУЛЬТУРА / ДРОП 001 — 2026
          </p>

          <h2 className="mt-5 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[11vw]">
            <span data-reveal="mask" className="block">
              НЕ СОЗДАНО
            </span>
            <span data-reveal="mask" data-delay="0.15" className="block">
              ЧТОБЫ ВПИСАТЬСЯ<span className="text-lime">.</span>
            </span>
          </h2>

          <div data-reveal data-delay="0.3" className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href="/shop"
              className="bg-lime px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void hover:bg-dirty"
            >
              СМОТРЕТЬ КОЛЛЕКЦИЮ
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#new-drop"
              className="border border-dirty/30 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-dirty hover:border-lime hover:text-lime"
            >
              УВИДЕТЬ ДРОП
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ============ 03 MARQUEE ============ */}
      <Marquee />

      {/* ============ 04 NEW ARRIVALS ============ */}
      <NewArrivals />

      {/* ============ 05 CATEGORIES ============ */}
      <section className="border-t border-dirty/10">
        <div className="mx-auto max-w-[1600px] px-5 pt-6 md:px-8">
          <p data-reveal className="font-bebas text-lg tracking-[0.3em] text-lime">
            ВЫБОР ПО КАТЕГОРИИ
          </p>
        </div>

        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px px-5 py-10 md:grid-cols-2 md:px-8">
          {categories.map((c, i) => (
            <Link
              key={c.name}
              href={`/shop?category=${encodeURIComponent(c.name)}`}
              data-reveal="mask"
              className={`group relative block overflow-hidden ${
                i % 2 === 1 ? "md:mt-16" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-void/45 transition-colors duration-500 group-hover:bg-void/20" />
                <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
                  <h3 className="font-anton text-[10vw] leading-none tracking-tight transition-colors group-hover:text-lime md:text-[4.5vw]">
                    {c.label}
                  </h3>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dirty/40 transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-void md:h-14 md:w-14">
                    <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" size={20} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 06 MANIFESTO ============ */}
      <section className="relative overflow-hidden border-y border-dirty/10 bg-void py-24 md:py-40">
        {/* декоративная паутина */}
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] animate-spin-slow opacity-20 text-lime md:-right-40 md:-top-40 md:h-[640px] md:w-[640px]"
          viewBox="0 0 200 200"
          aria-hidden
        >
          {[30, 55, 80, 105].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 105 * Math.cos((i * Math.PI) / 6)}
              y2={100 + 105 * Math.sin((i * Math.PI) / 6)}
              stroke="currentColor"
              strokeWidth="0.6"
            />
          ))}
        </svg>

        <div className="relative mx-auto max-w-[1600px] px-5 md:px-8">
          <p data-reveal className="font-bebas text-lg tracking-[0.3em] text-lime">
            МАНИФЕСТ / 001
          </p>
          <p
            data-reveal
            data-delay="0.1"
            className="mt-6 font-anton text-[9vw] leading-[1.02] tracking-tight md:text-[5.5vw]"
          >
            МЫ НЕ СЛЕДУЕМ ЗА ТРЕНДАМИ<span className="text-lime">.</span>
          </p>
          <p
            data-reveal
            data-delay="0.25"
            className="stroke-text font-anton text-[9vw] leading-[1.02] tracking-tight md:text-[5.5vw]"
          >
            МЫ СОЗДАЁМ СВОЮ ФОРМУ.
          </p>

          <div className="mt-12 grid gap-8 border-t border-dirty/10 pt-8 md:grid-cols-3">
            {[
              ["БЕЗ ПРАВИЛ.", "Мы не подстраиваемся под чужие витрины и тренды."],
              ["НЕ ОДИН ОБРАЗ.", "Каждый собирает образ сам — мы даём только основу."],
              ["НЕ ДЛЯ ВСЕХ.", "Это нормально. Уличная культура всегда была такой."],
            ].map(([t, d], i) => (
              <div key={t} data-reveal data-delay={`${i * 0.12}`}>
                <h3 className="font-bebas text-2xl tracking-wide text-lime">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 07 LOOKBOOK — горизонтальная галерея ============ */}
      <section data-horizontal className="relative overflow-hidden bg-void">
        <div className="px-5 pt-14 md:px-8">
          <p className="font-bebas text-lg tracking-[0.3em] text-lime">02 / УЛИЧНЫЙ ВЫБОР</p>
        </div>

        <div data-horizontal-track className="flex gap-5 px-5 py-10 md:gap-8 md:px-8">
          {LOOKBOOK.map((l) => (
            <figure key={l.src} className="relative h-[55vh] w-[80vw] shrink-0 md:h-[70vh] md:w-[42vw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.src}
                alt={l.cap}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[0.4] transition-all duration-700 hover:grayscale-0"
              />
              <figcaption className="absolute bottom-3 left-3 bg-void/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
                {l.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ 08 FEATURED ============ */}
      <Featured />

      {/* ============ 09 DELIVERY ============ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p data-reveal className="font-bebas text-lg tracking-[0.3em] text-lime">
              ДОСТАВКА / КАК ЭТО РАБОТАЕТ
            </p>
            <h2
              data-reveal
              data-delay="0.1"
              className="mt-3 font-anton text-5xl leading-[0.9] tracking-tight md:text-7xl"
            >
              ЗАБИРАЙ
              <br />
              НА УЛИЦУ
            </h2>
          </div>

          <div data-stagger className="grid gap-px bg-dirty/10 sm:grid-cols-3">
            {[
              {
                icon: Truck,
                t: "БЕСПЛАТНО В ДУШАНБЕ",
                d: storeConfig.delivery.dushanbe,
              },
              {
                icon: MapPin,
                t: "ДРУГИЕ ГОРОДА",
                d: storeConfig.delivery.otherCities,
              },
              {
                icon: MessageCircle,
                t: "СНАЧАЛА ПОДТВЕРДИМ",
                d: storeConfig.delivery.note,
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} data-stagger-item className="bg-void p-6 transition-colors hover:bg-asphalt">
                <Icon size={22} className="text-lime" strokeWidth={1.5} />
                <h3 className="mt-4 font-bebas text-xl tracking-wide">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 10 FINAL CTA ============ */}
      <section className="relative overflow-hidden border-t border-dirty/10 py-24 md:py-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #B6FF00 0 1px, transparent 1px 26px)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1600px] px-5 text-center md:px-8">
          <h2
            data-reveal="mask"
            className="font-anton text-[12vw] leading-[0.88] tracking-tight md:text-[8vw]"
          >
            ТВОЙ СТИЛЬ.
            <br />
            ТВОИ ПРАВИЛА<span className="text-lime">.</span>
          </h2>

          <div data-reveal data-delay="0.2" className="mt-10">
            <MagneticButton
              as="a"
              href="/shop"
              className="mx-auto bg-lime px-10 py-5 font-mono text-xs uppercase tracking-[0.3em] text-void hover:bg-dirty"
            >
              В МАГАЗИН
              <ArrowRight size={16} />
            </MagneticButton>
          </div>

          <p data-reveal data-delay="0.3" className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-concrete">
            {products.length} позиций в наличии / дроп 001 / {storeConfig.location}
          </p>
        </div>
      </section>
    </>
  );
}
