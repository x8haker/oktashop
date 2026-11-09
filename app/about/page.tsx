import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Marquee from "@/components/Marquee";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "OKTASHOP® — независимый streetwear-магазин из Душанбе. NOT MADE TO FIT IN.",
  alternates: { canonical: asset("/about/") },
};

const VALUES = [
  ["ЖИВОЕ", "Мы не вылизываем вещи до состояния витрины. Улица — не студия."],
  ["НЕЗАВИСИМЫЕ", "Никаких корпоративных партнёров и чужих дресс-кодов."],
  ["ЧЕСТНЫЕ", "Реальные фото, реальные размеры, честное описание."],
  ["СВОИ", "Душанбе — наша база. Отсюда растёт вся идея."],
];

export default function AboutPage() {
  return (
    <>
      <header className="mx-auto max-w-[1600px] px-5 pb-12 pt-32 md:px-8 md:pt-44">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
          О НАС / МАНИФЕСТ
        </p>
        <h1
          data-reveal="mask"
          className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
        >
          МЫ НЕ ВПИСЫВАЕМСЯ
        </h1>
      </header>

      <Marquee text="НЕЗАВИСИМЫЙ СТИЛЬ — АНДЕРГРАУНД — СКЕЙТ-КУЛЬТУРА — ЭСТЕТИКА 90-Х —" />

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div data-reveal className="space-y-5 text-base leading-relaxed text-dirty/75 md:text-lg">
            <p>
              OKTASHOP® — это независимый магазин стритвира из Душанбе. Мы собираем вещи,
              которые не просят разрешения быть замеченными: широкие силуэты, плотные
              ткани, крой в духе нулевых и ничего лишнего.
            </p>
            <p>
              Мы — реселлер и магазин, а не бренд-производитель. Логотип OKTASHOP живёт на
              сайте, в упаковке и маркетинге — но никогда не печатается на одежде, которую
              мы продаём.
            </p>
            <p className="font-anton text-3xl leading-tight text-lime md:text-4xl">
              NOT MADE TO FIT IN.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
            >
              СМОТРЕТЬ КОЛЛЕКЦИЮ <ArrowRight size={15} />
            </Link>
          </div>

          <div data-stagger className="grid gap-px self-start bg-dirty/10 sm:grid-cols-2">
            {VALUES.map(([t, d]) => (
              <div key={t} data-stagger-item className="bg-void p-6 transition-colors hover:bg-asphalt">
                <h3 className="font-anton text-3xl tracking-tight text-lime">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
