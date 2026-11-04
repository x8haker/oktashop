"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import { products, type Product } from "@/lib/products";

/** 08 — Избранные товары в premium editorial-подаче. */
export default function Featured() {
  const [quick, setQuick] = useState<Product | null>(null);
  const list = products.filter((p) => !p.isNew).slice(0, 3);

  return (
    <section className="bg-dirty py-20 text-void md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <p data-reveal className="font-bebas text-lg tracking-[0.3em] text-void/60">
              03 / CURATED
            </p>
            <h2
              data-reveal
              data-delay="0.1"
              className="mt-2 font-anton text-5xl leading-[0.9] tracking-tight md:text-8xl"
            >
              ESSENTIALS
            </h2>
          </div>
          <p data-reveal data-delay="0.2" className="hidden max-w-xs text-right text-sm text-void/60 md:block">
            Вещи, которые работают в любом образе. Без логотипов, без компромиссов.
          </p>
        </div>

        <div data-stagger className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuick} light />
          ))}
        </div>
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}
