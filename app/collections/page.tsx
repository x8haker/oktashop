import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Marquee from "@/components/Marquee";
import { categories, products } from "@/lib/products";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Коллекции",
  description: "Коллекции OKTASHOP®: hoodies, baggy jeans, jackets, accessories.",
  alternates: { canonical: asset("/collections/") },
};

export default function CollectionsPage() {
  return (
    <>
      <header className="mx-auto max-w-[1600px] px-5 pb-10 pt-32 md:px-8 md:pt-44">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
          DROP 001 — FALL / WINTER
        </p>
        <h1
          data-reveal="mask"
          className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
        >
          COLLECTIONS
        </h1>
        <p className="mt-4 max-w-xl text-sm text-concrete">
          Линии каталога — один язык. Каждая собрана вокруг силуэта, а не вокруг
          логотипа.
        </p>
      </header>

      <Marquee text="DROP 001 — NOT FOR EVERYONE — FIND YOUR OWN UNIFORM — STREET CULTURE NEVER DIES —" />

      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 md:py-20">
        <div data-stagger className="grid gap-px bg-dirty/10 md:grid-cols-2">
          {categories.map((c, i) => {
            const items = products.filter((p) => p.category === c.name);
            return (
              <Link
                key={c.name}
                href={`/shop?category=${encodeURIComponent(c.name)}`}
                data-stagger-item
                className="group relative block overflow-hidden bg-void"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-void/50 transition-colors group-hover:bg-void/30" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
                      {String(i + 1).padStart(2, "0")} / {items.length}{" "}
                      {items.length === 1 ? "ITEM" : "ITEMS"}
                    </span>
                    <h2 className="mt-2 font-anton text-4xl leading-none tracking-tight md:text-6xl">
                      {c.label}
                    </h2>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dirty/40 transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-void">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
