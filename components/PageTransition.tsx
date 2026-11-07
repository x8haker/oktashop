"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Плавное открытие страниц (style.md: «Page transition»).
 *  При смене маршрута экран закрывается и раскрывается короткой
 *  шторкой Acid Lime. Ведёт себя один раз за переход, не блокирует
 *  контент дольше 0.5 с и отключается при prefers-reduced-motion. */
export default function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    // Первый рендер — не переход, а обычное открытие страницы.
    first.current = false;
  }, []);

  // prefers-reduced-motion: без анимации перехода.
  if (reduce) return null;

  return (
    <AnimatePresence>
      {!first.current && (
        <motion.div
          key={pathname}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9999] origin-top bg-lime"
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ["top", "top", "bottom", "bottom"],
          }}
          transition={{
            duration: 0.55,
            times: [0, 0.35, 0.4, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
