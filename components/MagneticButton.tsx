"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Магнитная кнопка (только десктоп). */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.innerWidth < 1025 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: "power3.out" });
    };
    const leave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.3)" });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  const Tag = as as "button";
  return (
    <Tag
      // @ts-expect-error — ref для button|a
      ref={ref}
      type={type}
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-3 transition-colors ${className}`}
    >
      {children}
    </Tag>
  );
}
