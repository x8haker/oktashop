"use client";

import { useEffect, useRef } from "react";

/** Кастомный курсор — только десктоп. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.innerWidth < 1025 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const d = dot.current!;
    const r = ring.current!;
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[role='button'],input,select,textarea");
      r.classList.toggle("is-hover", Boolean(interactive));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
