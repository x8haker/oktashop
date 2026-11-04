"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import { products, type Product } from "@/lib/products";

/** 01 — Новые поступления: сетка из 4 товаров + quick view. */
export default function NewArrivals() {
  const [quick, setQuick] = useState<Product | null>(null);
  const items = products.filter((p) => p.isNew).slice(0, 4);
  const list = items.length >= 4 ? items : products.slice(0, 4);

  return (
    <section id="new-drop" className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-32">
      <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
        <div>
          <p data-reveal className="font-bebas text-lg tracking-[0.3em] text-lime">
            01 / THE LATEST DROP
          </p>
          <h2
            data-reveal
            data-delay="0.1"
            className="mt-2 font-anton text-5xl leading-[0.9] tracking-tight md:text-8xl"
          >
            NEW ARRIVALS
          </h2>
        </div>
        <p data-reveal data-delay="0.2" className="max-w-xs text-sm text-concrete md:text-right">
          Fresh pieces. No compromises.
        </p>
      </div>

      <div
        data-stagger
        className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6"
      >
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
        ))}
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}
