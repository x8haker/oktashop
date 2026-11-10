"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Dev-only: доступ к GSAP из консоли для отладки анимаций.
// typeof window — защита SSR: при серверном рендере window не существует.
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).gsap = gsap;
  (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
}
// На мобильных адресная строка меняет высоту вьюпорта — не даём ScrollTrigger
// бесконечно пересчитывать позиции из-за этого.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Layout-эффект вместо обычного useEffect: его cleanup выполняется в фазе
 *  мутаций React — ДО удаления уходящей страницы из DOM.
 *
 *  Почему это критично: ScrollTrigger с pin:true оборачивает секцию в
 *  pin-spacer, меняя ей родителя. Раньше cleanup (useEffect) выполнялся после
 *  удаления узлов, и ctx.revert() падал с NotFoundError «removeChild» — React
 *  ловил это и показывал «Application error: a client-side exception».
 *
 *  typeof window — защита SSR: на сервере useLayoutEffect предупреждает. */
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Глобальные scroll-эффекты (переподключаются при каждой смене страницы):
 *  - [data-reveal]        — появление блока при прокрутке (опц. data-reveal="mask|chars")
 *  - [data-parallax]      — параллакс, значение = сила (0.1…0.5)
 *  - [data-stagger]       — стаггер дочерних [data-stagger-item]
 *  - [data-horizontal]    — горизонтальная галерея внутри пина
 *
 * Начальные состояния скрытия заданы в globals.css под селектором html.js —
 * при отключённом JS весь контент остаётся видимым.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useBrowserLayoutEffect(() => {
    // reduced-motion: показываем весь контент без анимаций.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-stagger-item]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.clipPath = "none";
        });
      return;
    }

    let ctx: gsap.Context | undefined;
    let cleanupListeners: (() => void) | undefined;

    // Даём React завершить гидрацию, прежде чем GSAP пишет inline-стили.
    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < 1024;

        // --- базовое появление ---
        // once:true — блок остаётся видимым после первого показа (контент не
        // «мигает» обратно при скролле вверх).
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const mode = el.dataset.reveal;
          const delay = parseFloat(el.dataset.delay || "0");
          if (mode === "mask") {
            // CSS задаёт элементу translateY(40px) — сбрасываем его вместе с
            // clip-path, иначе блок навсегда остаётся смещённым на 40px вниз.
            gsap.fromTo(
              el,
              { clipPath: "inset(0 0 100% 0)", y: 40, opacity: 1 },
              {
                clipPath: "inset(0 0 0% 0)",
                y: 0,
                opacity: 1,
                duration: 1.1,
                delay,
                ease: "power4.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          } else if (mode === "chars") {
            // Родитель скрыт CSS (opacity: 0) — делаем его видимым и анимируем
            // только дочерние спаны, иначе буквы никогда не покажутся.
            gsap.set(el, { opacity: 1, y: 0 });
            const spans = el.querySelectorAll("span");
            gsap.fromTo(
              spans,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                delay,
                ease: "power4.out",
                stagger: 0.04,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          } else {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          }
        });

        // --- стаггер карточек ---
        // Скрытие делаем через gsap.set, а не через CSS: при смене фильтров на
        // /shop React добавляет новые карточки, и CSS-гейт оставил бы их
        // навсегда невидимыми (триггер once уже отработал).
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll("[data-stagger-item]");
          if (!items.length) return;
          gsap.set(items, { opacity: 0, y: 40 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        // --- параллакс ---
        if (!isMobile) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const strength = parseFloat(el.dataset.parallax || "0.2");
            gsap.fromTo(
              el,
              { yPercent: -strength * 50 },
              {
                yPercent: strength * 50,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
        }

        // --- горизонтальная галерея (lookbook) ---
        gsap.utils.toArray<HTMLElement>("[data-horizontal]").forEach((section) => {
          const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
          if (!track) return;
          const getDist = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -getDist(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDist()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
      });

      // Пересчёт позиций триггеров: сразу после создания (пин lookbook меняет
      // высоту документа), после загрузки шрифтов и картинок. Раньше refresh
      // вешался на событие load, которое к этому моменту уже срабатывало —
      // из-за этого триггеры ниже пина считались по устаревшей раскладке и
      // контент мог не появиться вовсе.
      ScrollTrigger.refresh();
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      if (document.readyState !== "complete") {
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad, { once: true });
      }
      // Шрифты/картинки меняют высоту блоков — тонкий пересчёт после раскладки.
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      cleanupListeners = () => {
        window.removeEventListener("resize", onResize);
      };
    }, 250);

    return () => {
      window.clearTimeout(timer);
      cleanupListeners?.();
      // Cleanup падает, если React уже удалил узлы (быстрый переход между
      // страницами): падение внутри cleanup ломало бы весь экран вплоть до
      // «Application error». Проглатываем — новый набор триггеров и так
      // пересоздаётся на следующем effect-run.
      try {
        ctx?.revert();
      } catch {
        /* узлы уже удалены из DOM */
      }
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch {
        /* триггер уже уничтожен */
      }
    };
  }, [pathname]);

  return null;
}
