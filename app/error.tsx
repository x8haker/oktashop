"use client";

import { useEffect } from "react";
import Link from "next/link";

import { asset } from "@/lib/asset";
import {
  isStaleAssetError,
  reloadUrl,
  takeAutoReloadPermission,
} from "@/lib/client-recovery";

/** Корневая граница ошибок: ловит падения страниц (гидрация, рендер,
 *  эффекты, устаревшие чанки после деплоя), сохраняя шапку и подвал сайта
 *  вместо голого экрана Next «Application error: a client-side exception». */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const stale = isStaleAssetError(error);

  // Устаревшие файлы после деплоя повторным рендером не вылечить —
  // перезагружаем один раз за сессию с cache-bust.
  useEffect(() => {
    if (!stale) return;
    if (takeAutoReloadPermission()) window.location.replace(reloadUrl());
  }, [stale, error]);

  const reload = () => window.location.replace(reloadUrl());

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-[1600px] flex-col justify-center px-5 py-32 md:px-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        ERROR{error.digest ? ` / ${error.digest}` : ""}
      </p>

      <h1 className="mt-4 font-anton text-[13vw] leading-[0.85] tracking-tight md:text-[7vw]">
        ЧТО-ТО СЛОМАЛОСЬ.
      </h1>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-concrete">
        {stale
          ? "Страница устарела после обновления сайта — сейчас перезагрузим с новыми файлами."
          : "Страница упала с ошибкой. Обычно помогает обновление — попробуйте ещё раз."}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reload}
          className="border border-lime bg-lime px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-void transition-colors hover:bg-transparent hover:text-lime"
        >
          Обновить страницу
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-dirty/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-dirty transition-colors hover:border-lime hover:text-lime"
        >
          Попробовать снова
        </button>
        <Link
          href={asset("/")}
          className="border border-dirty/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-dirty transition-colors hover:border-lime hover:text-lime"
        >
          На главную
        </Link>
      </div>

      {stale && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          Если страница не открылась — нажмите «Обновить страницу» ещё раз.
        </p>
      )}
    </section>
  );
}
