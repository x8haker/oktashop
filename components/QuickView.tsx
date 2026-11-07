"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { popBodyLock, pushBodyLock } from "@/lib/body-lock";

/** Модальное окно быстрого просмотра товара. */
export default function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);

  // Сбрасываем выбранный размер при открытии другого товара.
  useEffect(() => {
    if (product) setSize(product.sizes[0] ?? "");
  }, [product]);

  // Блокируем прокрутку страницы под модалкой (общий счётчик с Navbar:
  // закрытие одного не должно снимать блокировку другого).
  useEffect(() => {
    if (!product) return;
    pushBodyLock();
    closeRef.current?.focus();
    return popBodyLock;
  }, [product]);

  // Закрытие по Escape.
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[9600] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Быстрый просмотр: ${product.name}`}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-asphalt md:grid-cols-2"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-10 bg-void/70 p-2 text-dirty transition-colors hover:text-lime"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
                  {product.category} / {product.sku}
                </p>
                <h2 className="mt-3 font-anton text-3xl leading-none md:text-4xl">
                  {product.name}
                </h2>
                <p className="mt-4 font-mono text-xl text-lime">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-dirty/70">
                  {product.description}
                </p>

                {/* выбор размера — раньше размер молча брался первым */}
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                    Размер
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Выбор размера">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                          size === s
                            ? "border-lime bg-lime text-void"
                            : "border-dirty/25 text-dirty hover:border-lime hover:text-lime"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => {
                    add(product, size || product.sizes[0]);
                    onClose();
                  }}
                  className="w-full bg-lime py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
                >
                  Add to cart{size ? ` — ${size}` : ""}
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="w-full border border-dirty/25 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-lime hover:text-lime"
                >
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
