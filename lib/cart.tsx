"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "./products";
import { getBySlug } from "./products";

/** Максимум штук одной позиции в корзине. */
const MAX_QTY = 99;

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** false до восстановления из localStorage — счётчик ещё не достоверен. */
  hydrated: boolean;
  add: (product: Product, size: string, qty?: number) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

const STORAGE_KEY = "oktashop_cart_v1";
const CartContext = createContext<CartCtx | null>(null);

/** Приводит произвольные данные из localStorage к валидным позициям корзины.
 *  Отбрасывает мусор и NaN-количества, чтобы итоги не превращались в NaN. */
function sanitizeItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const out: CartItem[] = [];
  for (const it of raw) {
    if (!it || typeof it !== "object") continue;
    const v = it as Record<string, unknown>;
    if (typeof v.productId !== "string" || typeof v.slug !== "string") continue;
    if (typeof v.name !== "string" || typeof v.size !== "string") continue;
    if (typeof v.image !== "string") continue;
    const price = Number(v.price);
    const qty = Math.floor(Number(v.qty));
    if (!Number.isFinite(price) || price < 0) continue;
    if (!Number.isFinite(qty) || qty < 1) continue;
    out.push({
      productId: v.productId,
      slug: v.slug,
      name: v.name,
      price,
      size: v.size,
      image: v.image,
      qty: Math.min(qty, 99),
    });
    if (out.length >= 50) break; // разумный предел от мусора в storage
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const loaded = sanitizeItems(JSON.parse(raw));
        // Сверяем цену с актуальным каталогом: в storage она могла «залипнуть»
        // после изменения прайса. Товар, исчезнувший из каталога, не трогаем —
        // покупатель уже его выбрал.
        setItems(
          loaded.map((i) => {
            const fresh = getBySlug(i.slug);
            return fresh && fresh.price !== i.price
              ? { ...i, price: fresh.price, name: fresh.name }
              : i;
          })
        );
      }
    } catch {
      /* ignore corrupted cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked */
    }
  }, [items, hydrated]);

  const add = useCallback((product: Product, size: string, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.size === size
      );
      if (idx >= 0) {
        const next = [...prev];
        // Лимит количества: без него «+» на странице товара копил 500 шт.
        next[idx] = {
          ...next[idx],
          qty: Math.min(MAX_QTY, next[idx].qty + Math.max(1, Math.floor(qty))),
        };
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          size,
          image: product.images[0],
          qty: Math.min(MAX_QTY, Math.max(1, Math.floor(qty))),
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const setQty = useCallback(
    (productId: string, size: string, qty: number) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, qty: Math.min(MAX_QTY, Math.floor(qty)) }
              : i
          )
          // Кнопка «−» при qty=1 удаляет позицию — иначе она была бы мёртвой.
          .filter((i) => i.qty > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      hydrated,
      add,
      remove,
      setQty,
      clear,
      isOpen,
      setOpen,
    };
  }, [items, hydrated, add, remove, setQty, clear, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
