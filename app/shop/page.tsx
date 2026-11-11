"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import Marquee from "@/components/Marquee";
import {
  allSizes,
  products,
  type Category,
  type Product,
} from "@/lib/products";

const CATS: (Category | "ALL")[] = [
  "ALL",
  "HOODIES",
  "SWEATSHIRTS",
  "SETS",
  "BAGGY JEANS",
  "JACKETS",
  "SHOES",
  "ACCESSORIES",
  "ASTRE",
  "OTAKUWEAR",
];

/** Русские названия категорий для кнопок фильтра (значения URL — английские). */
const CAT_LABELS: Record<string, string> = {
  ALL: "ВСЕ",
  HOODIES: "ХУДИ",
  SWEATSHIRTS: "СВИТШОТЫ",
  SETS: "КОМПЛЕКТЫ",
  "BAGGY JEANS": "ДЖИНСЫ",
  JACKETS: "КУРТКИ",
  SHOES: "ОБУВЬ",
  ACCESSORIES: "АКСЕССУАРЫ",
  ASTRE: "ASTRÉ",
  OTAKUWEAR: "OTAKUWEAR",
};

type Sort = "new" | "price-asc" | "price-desc" | "name";

function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Категория и «только new» живут в URL: ссылки вида /shop?category=JACKETS
  // работают при уже открытой странице, кнопка «назад» восстанавливает
  // фильтры, а reset() чистит query. Невалидное значение → ALL.
  const rawCat = params.get("category");
  const cat: Category | "ALL" =
    rawCat && CATS.includes(rawCat as Category) ? (rawCat as Category) : "ALL";
  const onlyNew = params.get("new") === "1";

  const [size, setSize] = useState<string>("ALL");
  const [sort, setSort] = useState<Sort>("new");
  const [q, setQ] = useState("");
  const [quick, setQuick] = useState<Product | null>(null);

  /** Патчит query-параметры фильтров, не трогая остальные. */
  const setParam = (key: string, value: string | null) => {
    const sp = new URLSearchParams(params.toString());
    if (value === null) sp.delete(key);
    else sp.set(key, value);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const list = useMemo(() => {
    let l = products.filter((p) => {
      if (cat !== "ALL" && p.category !== cat) return false;
      if (onlyNew && !p.isNew) return false;
      if (size !== "ALL" && !p.sizes.includes(size)) return false;
      if (q && !`${p.name} ${p.sku} ${p.description}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });

    l = [...l].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(b.isNew) - Number(a.isNew);
    });
    return l;
  }, [cat, onlyNew, size, sort, q]);

  const setCat = (c: Category | "ALL") =>
    setParam("category", c === "ALL" ? null : c);
  const setOnlyNew = (v: boolean) => setParam("new", v ? "1" : null);

  const reset = () => {
    setSize("ALL");
    setSort("new");
    setQ("");
    // Чистим query целиком — иначе после сброса URL держит ?new=1/category.
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      <header className="mx-auto max-w-[1600px] px-5 pb-8 pt-32 md:px-8 md:pt-44">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
          OKTASHOP® / КАТАЛОГ
        </p>
        <h1
          data-reveal="mask"
          className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
        >
          МАГАЗИН
        </h1>
        <p className="mt-4 max-w-md text-sm text-concrete">
          {products.length} позиций с реальными фото товаров. Наличие и размеры
          подтверждаем при заказе.
        </p>
      </header>

      <Marquee
        text="ДРОП 001 — ОСЕНЬ / ЗИМА — НОСИ СВОЁ ОТНОШЕНИЕ — БЕЗ ПРАВИЛ. БЕЗ ФОРМЫ. — УЛИЧНАЯ КУЛЬТУРА НИКОГДА НЕ УМИРАЕТ —"
        className="mb-10"
      />

      <div
        id="filters"
        className="mx-auto max-w-[1600px] scroll-mt-24 px-5 pb-24 md:px-8"
      >
        {/* панель фильтров */}
        <div className="sticky top-16 z-[7000] -mx-5 mb-10 border-y border-dirty/10 bg-void/95 px-5 py-4 backdrop-blur md:top-20 md:mx-0 md:px-0 md:pl-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    cat === c
                      ? "border-lime bg-lime text-void"
                      : "border-dirty/20 text-dirty hover:border-lime hover:text-lime"
                  }`}
                >
                  {CAT_LABELS[c] ?? c}
                </button>
              ))}

              <button
                onClick={() => setOnlyNew(!onlyNew)}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  onlyNew
                    ? "border-lime bg-lime text-void"
                    : "border-dirty/20 text-dirty hover:border-lime hover:text-lime"
                }`}
              >
                ТОЛЬКО НОВОЕ
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border border-dirty/20 px-3 py-1.5 focus-within:border-lime">
                <Search size={14} className="text-concrete" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Поиск..."
                  aria-label="Поиск по каталогу"
                  className="w-32 bg-transparent font-mono text-[11px] uppercase tracking-widest outline-none placeholder:text-concrete"
                />
                {q && (
                  <button onClick={() => setQ("")} aria-label="Очистить поиск">
                    <X size={13} className="text-concrete hover:text-lime" />
                  </button>
                )}
              </div>

              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                aria-label="Фильтр по размеру"
                className="border border-dirty/20 bg-void px-3 py-2 font-mono text-[11px] uppercase tracking-widest outline-none focus:border-lime"
              >
                <option value="ALL">РАЗМЕР: ВСЕ</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    РАЗМЕР: {s}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Сортировка"
                className="border border-dirty/20 bg-void px-3 py-2 font-mono text-[11px] uppercase tracking-widest outline-none focus:border-lime"
              >
                <option value="new">СПЕРВА НОВЫЕ</option>
                <option value="price-asc">ЦЕНА: ПО ВОЗРАСТ.</option>
                <option value="price-desc">ЦЕНА: ПО УБЫВ.</option>
                <option value="name">НАЗВАНИЕ: А → Я</option>
              </select>

              <button
                onClick={reset}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete underline-offset-4 hover:text-lime hover:underline"
              >
                СБРОС
              </button>
            </div>
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
            НАЙДЕНО: {list.length} / ВСЕГО: {products.length}
          </p>
        </div>

        {/* сетка товаров */}
        {list.length > 0 ? (
          <div
            data-stagger
            className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4"
          >
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuick} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-dirty/20 py-24 text-center">
            <p className="font-anton text-3xl text-dirty/70">ЗДЕСЬ ПОКА ПУСТО.</p>
            <p className="mt-2 text-sm text-concrete">
              Попробуйте изменить фильтры или сбросить их.
            </p>
            <button
              onClick={reset}
              className="mt-6 bg-lime px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-void hover:bg-dirty"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Catalog />
    </Suspense>
  );
}
