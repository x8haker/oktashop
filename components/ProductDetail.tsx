"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight, Minus, Plus } from "lucide-react";

import { formatPrice, getRelated, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  const related = getRelated(product, 4);

  const onAdd = () => {
    add(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pt-28 md:px-8 md:pt-36">
        {/* хлебные крошки */}
        <nav aria-label="Хлебные крошки" className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          <Link href="/" className="hover:text-lime">HOME</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-lime">SHOP</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-lime">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-dirty">{product.sku}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* галерея */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden bg-asphalt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={imgIdx}
                src={product.images[imgIdx]}
                alt={`${product.name} — фото ${imgIdx + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {product.isNew && (
                <span className="absolute left-4 top-4 bg-lime px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-void">
                  NEW
                </span>
              )}
            </div>

            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={`relative h-24 w-20 overflow-hidden border transition-colors ${
                    imgIdx === i ? "border-lime" : "border-dirty/20 hover:border-dirty/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* инфо */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-lime">
              {product.category} / {product.sku}
            </p>
            <h1 className="mt-3 font-anton text-5xl leading-[0.9] tracking-tight md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-4 font-mono text-2xl text-lime">{formatPrice(product.price)}</p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-dirty/70">
              {product.description}
            </p>

            {/* размеры */}
            <fieldset className="mt-8">
              <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                SIZE — выберите
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-w-[52px] border px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                      size === s
                        ? "border-lime bg-lime text-void"
                        : "border-dirty/25 hover:border-lime hover:text-lime"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* количество */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                QTY
              </span>
              <div className="flex items-center border border-dirty/25">
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  aria-label="Уменьшить количество"
                  className="px-3 py-2.5 text-dirty transition-colors hover:text-lime"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-[36px] text-center font-mono text-sm tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((v) => Math.min(99, v + 1))}
                  aria-label="Увеличить количество"
                  className="px-3 py-2.5 text-dirty transition-colors hover:text-lime"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Наличие не выдумываем: подтверждаем наличие в ответном сообщении. */}
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete">
                Наличие подтверждаем при заказе
              </span>
            </div>

            {/* в корзину */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onAdd}
                className="flex-1 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty"
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={15} /> ДОБАВЛЕНО
                  </span>
                ) : (
                  "ADD TO CART"
                )}
              </button>
              <Link
                href="/cart"
                className="flex-1 border border-dirty/25 py-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-lime hover:text-lime"
              >
                GO TO CART
              </Link>
            </div>

            <div className="mt-8 grid gap-3 border-t border-dirty/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
              <p>✓ Бесплатная доставка по Душанбе</p>
              <p>✓ Оплата при получении</p>
              <p>✓ Фото реальные — снято с товаров магазина</p>
            </div>
          </div>
        </div>

        {/* похожие товары */}
        {related.length > 0 && (
          <section className="mt-24 pb-16">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-anton text-4xl tracking-tight md:text-6xl">
                YOU MAY ALSO LIKE
              </h2>
              <Link href="/shop" className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime hover:underline">
                View all →
              </Link>
            </div>
            <div data-stagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuick} />
              ))}
            </div>
          </section>
        )}
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
