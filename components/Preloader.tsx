"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "OKTASHOP".split("");

/** Кинематографичный прелоадер: буквы собираются в логотип. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-concrete"
      >
        Independent street culture
      </motion.p>
    </motion.div>
  );
}
