"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "OKTASHOP".split("");

/** Кинематографичный прелоадер: буквы собираются в логотип. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Показываем прелоадер один раз за сессию: без sessionStorage
    // каждый повторный заход ждал 2.3 с.
    let seen = false;
    try {
      seen = sessionStorage.getItem("oktashop_preloaded") === "1";
      sessionStorage.setItem("oktashop_preloaded", "1");
    } catch {
      /* приватный режим — показываем как обычно */
    }
    if (seen) {
      setHidden(true);
      return;
    }
    const t1 = setTimeout(() => setDone(true), 1500);
    const t2 = setTimeout(() => setHidden(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      animate={done ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      <div className="flex overflow-hidden font-anton text-[13vw] leading-none tracking-tight sm:text-[9vw]">
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: 0.12 + i * 0.06,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="ml-1 self-start font-mono text-base text-lime"
        >
          ®
        </motion.span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="mt-6 h-px w-48 origin-left bg-lime"
      />

      {/* Spider graphic (style.md): паук спускается по нити над логотипом. */}
      <motion.svg
        viewBox="0 0 40 48"
        width="26"
        height="32"
        aria-hidden
        className="absolute left-1/2 top-[26%] -translate-x-1/2 text-lime"
        initial={{ y: -46, opacity: 0 }}
        animate={{ y: -12, opacity: [0, 1, 1, 0.9] }}
        transition={{ duration: 1.6, ease: "easeIn", delay: 0.25 }}
      >
        <motion.line
          x1="20"
          y1="0"
          x2="20"
          y2="18"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeIn", delay: 0.25 }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
          style={{ transformOrigin: "20px 24px" }}
        >
          <ellipse cx="20" cy="24" rx="4" ry="5.5" fill="currentColor" />
          <path d="M17 20 C12 17, 9 14, 7 10" />
          <path d="M17 23 C11 22, 7 21, 4 19" />
          <path d="M17 26 C11 28, 7 30, 5 33" />
          <path d="M17 29 C13 33, 11 36, 10 40" />
          <path d="M23 20 C28 17, 31 14, 33 10" />
          <path d="M23 23 C29 22, 33 21, 36 19" />
          <path d="M23 26 C29 28, 33 30, 35 33" />
          <path d="M23 29 C27 33, 29 36, 30 40" />
        </motion.g>
      </motion.svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-concrete"
      >
        Independent street culture — независимая уличная культура
      </motion.p>
    </motion.div>
  );
}
