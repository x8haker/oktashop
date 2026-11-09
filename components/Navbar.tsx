"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, Search, UserRound } from "lucide-react";
import { useCart } from "@/lib/cart";
import { popBodyLock, pushBodyLock } from "@/lib/body-lock";

const LINKS = [
  { href: "/shop", label: "МАГАЗИН", match: (p: string, q: string) => p === "/shop" && q !== "new=1" },
  { href: "/shop?new=1", label: "НОВЫЙ ДРОП", match: (p: string, q: string) => p === "/shop" && q === "new=1" },
  { href: "/collections", label: "КОЛЛЕКЦИИ", match: (p: string) => p === "/collections" },
  { href: "/about", label: "О НАС", match: (p: string) => p === "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { count } = useCart();
  const [open, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  // Navbar гидратируется внутри Suspense позже CartProvider, поэтому
  // локальный флаг гарантирует: первый клиентский рендер = 0 (как на сервере).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? count : 0;

  const search = searchParams.toString();

  useEffect(() => {
    // rAF-троттлинг: без него каждый scroll-событие меняло state
    // и перерисовывало шапку (включая счётчик корзины) на кадр.
    let ticking = false;
    const apply = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    pushBodyLock();
    return popBodyLock;
  }, [open]);

  // Закрытие мобильного меню по Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* индикатор прокрутки */}
      <div className="fixed left-0 top-0 z-[9000] h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-lime transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[8000] transition-colors duration-500 ${
          scrolled ? "bg-void/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="group relative font-anton text-xl tracking-tight md:text-2xl"
            aria-label="OKTASHOP — главная"
          >
            OKTASHOP
            <span className="ml-0.5 align-super font-mono text-[9px] text-lime">®</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={l.match(pathname, search) ? "page" : undefined}
                className={`link-underline font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:text-lime ${
                  l.match(pathname, search) ? "text-lime" : "text-dirty"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/shop#filters"
              aria-label="Поиск"
              className="hidden text-dirty transition-colors hover:text-lime md:block"
            >
              <Search size={18} strokeWidth={1.5} />
            </Link>

            <Link
              href="/profile"
              aria-label="Профиль"
              className="hidden text-dirty transition-colors hover:text-lime md:block"
            >
              <UserRound size={18} strokeWidth={1.5} />
            </Link>

            <Link
              href="/cart"
              aria-label={`Корзина, товаров: ${cartCount}`}
              className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-lime"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="tabular-nums">КОРЗИНА ({cartCount})</span>
              {mounted && count > 0 && (
                <span className="absolute -right-2 -top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              )}
            </Link>

            <button
              onClick={() => setOpenMenu(true)}
              aria-label="Открыть меню"
              className="text-dirty transition-colors hover:text-lime md:hidden"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
        <div
          className={`h-px w-full transition-colors duration-500 ${
            scrolled ? "bg-dirty/10" : "bg-transparent"
          }`}
        />
      </header>

      {/* полноэкранное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Меню навигации"
            className="fixed inset-0 z-[9500] flex flex-col bg-void md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-anton text-xl">OKTASHOP</span>
              <button onClick={() => setOpenMenu(false)} aria-label="Закрыть меню">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-5">
              {[...LINKS, { href: "/shop#filters", label: "ПОИСК" }, { href: "/cart", label: "КОРЗИНА" }, { href: "/profile", label: "АККАУНТ" }, { href: "/delivery", label: "ДОСТАВКА" }, { href: "/contact", label: "КОНТАКТЫ" }].map(
                (l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                  >
                    <Link
                      href={l.href}
                      className="block font-anton text-[13vw] leading-[1.05] tracking-tight hover:text-lime"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <div className="flex items-center justify-between px-5 py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
              <span>Душанбе</span>
              <span className="text-lime">NOT MADE TO FIT IN.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
