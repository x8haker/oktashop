"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

/** Карточка товара: hover-смена фото, быстрый просмотр, добавление в корзину. */
export default function ProductCard({
  product,
  onQuickView,
  light = false,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  /** true — карточка на светлом фоне */
  light?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const t = light ? "text-void" : "text-dirty";
  const sub = light ? "text-void/55" : "text-concrete";

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product, product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div data-stagger-item className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-asphalt">
        {/* основное фото */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        {/* hover-фото (если есть второе фото) */}
        {product.images[1] && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.images[1]}
            alt=""
            aria-hidden
            loading="lazy"
            className="img-glitch absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="absolute left-3 top-3 bg-lime px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-void">
            НОВОЕ
          </span>
        )}

        <span className={`absolute right-3 top-3 font-mono text-[10px] uppercase tracking-widest mix-blend-difference ${light ? "text-void/70" : "text-dirty/70"}`}>
          {product.sku}
        </span>

        {/* растянутая ссылка на карточку: покрывает фото, но лежит ПОД кнопками
            действий — иначе <button> внутри <a> (React validateDOMNesting) */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={product.name}
        />

        {/* действия при наведении */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className={`flex-1 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                light
                  ? "bg-void/90 text-dirty hover:bg-lime hover:text-void"
                  : "bg-dirty/95 text-void hover:bg-lime"
              }`}
            >
              Быстрый просмотр
            </button>
          )}
          <button
            onClick={quickAdd}
            aria-label="Добавить в корзину"
            className={`flex items-center justify-center px-3 transition-colors ${
              light
                ? "bg-void text-dirty hover:bg-lime hover:text-void"
                : "bg-lime text-void hover:bg-dirty"
            }`}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                light ? "group-hover:text-void/60" : "group-hover:text-lime"
              }`}
            >
              {product.name}
            </h3>
          </Link>
          <p className={`mt-1 font-mono text-[10px] uppercase tracking-widest ${sub}`}>
            {product.sizes.join(" / ")}
          </p>
        </div>
        <p className={`shrink-0 font-mono text-sm tabular-nums ${t}`}>
          {formatPrice(product.price)}
        </p>
      </div>

      {added && (
        <span className="absolute -top-8 right-0 z-10 bg-lime px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-void">
          Добавлено
        </span>
      )}
    </div>
  );
}
