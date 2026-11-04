"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, count, setQty, remove, clear } = useCart();

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        YOUR BAG / {count} ITEM{count === 1 ? "" : "S"}
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
      >
        CART
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 border border-dashed border-dirty/20 py-24 text-center">
          <p className="font-anton text-4xl text-dirty/70 md:text-6xl">IT&apos;S EMPTY.</p>
          <p className="mt-3 text-sm text-concrete">
            В корзине пока ничего нет — загляни в дроп.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
          >
            SHOP THE DROP <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          {/* список */}
          <ul className="divide-y divide-dirty/10 border-y border-dirty/10">
            {items.map((i) => (
              <li key={`${i.productId}-${i.size}`} className="flex gap-4 py-5">
                <Link
                  href={`/product/${i.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden bg-asphalt"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${i.slug}`}
                        className="text-sm font-medium uppercase tracking-wide hover:text-lime"
                      >
                        {i.name}
                      </Link>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete">
                        SIZE: {i.size}
                      </p>
                    </div>
                    <p className="font-mono text-sm tabular-nums">
                      {formatPrice(i.price * i.qty)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-dirty/25">
                      <button
                        onClick={() => setQty(i.productId, i.size, i.qty - 1)}
                        aria-label="Уменьшить"
                        className="px-2.5 py-1.5 transition-colors hover:text-lime"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[30px] text-center font-mono text-xs tabular-nums">
                        {i.qty}
                      </span>
                      <button
                        onClick={() => setQty(i.productId, i.size, i.qty + 1)}
                        aria-label="Увеличить"
                        className="px-2.5 py-1.5 transition-colors hover:text-lime"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => remove(i.productId, i.size)}
                      aria-label={`Удалить ${i.name}`}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete transition-colors hover:text-blood"
                    >
                      <Trash2 size={13} /> REMOVE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* итог */}
          <aside className="h-fit border border-dirty/10 bg-asphalt p-6 lg:sticky lg:top-28">
            <h2 className="font-anton text-3xl tracking-tight">SUMMARY</h2>

            <dl className="mt-6 space-y-3 border-b border-dirty/10 pb-6 font-mono text-xs uppercase tracking-widest">
              <div className="flex justify-between">
                <dt className="text-concrete">Items</dt>
                <dd className="tabular-nums">{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-concrete">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-concrete">Delivery</dt>
                <dd className="text-lime">По Душанбе — 0 TJS</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-end justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-concrete">
                TOTAL
              </span>
              <span className="font-anton text-3xl text-lime tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty"
            >
              CHECKOUT <ArrowRight size={15} />
            </Link>

            <button
              onClick={clear}
              className="mt-3 w-full border border-dirty/20 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete transition-colors hover:border-blood hover:text-blood"
            >
              Очистить корзину
            </button>

            <Link
              href="/shop"
              className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete hover:text-lime"
            >
              <ArrowLeft size={13} /> Продолжить покупки
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
