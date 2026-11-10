"use client";

import { useEffect, useState } from "react";

// Последний рубеж: заменяет корневой layout целиком, поэтому экран
// самодостаточный (инлайн-стили, без Tailwind/шрифтов) — он обязан
// отрисоваться даже при полностью разорванной загрузке.
//
// Вместо английского «Application error: a client-side exception…» — русский
// экран OKTASHOP с кнопкой восстановления. Если виновник — устаревшие чанки
// после деплоя (открытая вкладка), страница перезагружается сама.

const LIME = "#b6ff00";
const VOID = "#0a0a0a";
const DIRTY = "#f2f0e9";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const text = `${error?.message ?? ""} ${error?.digest ?? ""}`;
    const stale = /chunk|dynamically imported module|importing the module|error loading dynamically|failed to fetch/i.test(
      text,
    );
    if (!stale) return;
    try {
      if (sessionStorage.getItem("oktashop_auto_reload")) {
        setMsg("Страница устарела после обновления сайта — нажмите «Обновить».");
        return;
      }
      sessionStorage.setItem("oktashop_auto_reload", String(Date.now()));
    } catch {
      /* приватный режим — только ручная кнопка */
    }
    const t = window.setTimeout(() => {
      const sep = window.location.search ? "&" : "?";
      window.location.replace(
        `${window.location.pathname}${window.location.search}${sep}_r=${Date.now()}${window.location.hash}`,
      );
    }, 500);
    return () => window.clearTimeout(t);
  }, [error]);

  const reload = () => {
    const sep = window.location.search ? "&" : "?";
    window.location.replace(
      `${window.location.pathname}${window.location.search}${sep}_r=${Date.now()}${window.location.hash}`,
    );
  };

  const btn: React.CSSProperties = {
    display: "inline-block",
    padding: "14px 26px",
    border: `1px solid ${LIME}`,
    background: LIME,
    color: VOID,
    font: "600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
  };
  const btnGhost: React.CSSProperties = {
    ...btn,
    background: "transparent",
    color: DIRTY,
    border: `1px solid rgba(242,240,233,0.3)`,
  };

  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OKTASHOP® — ошибка</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          padding: "24px",
          background: VOID,
          color: DIRTY,
          textAlign: "center",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <p
          style={{
            margin: 0,
            color: LIME,
            font: "11px/1 ui-monospace, SFMono-Regular, Menlo, monospace",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          OKTASHOP® / ERROR
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(38px, 9vw, 96px)",
            lineHeight: 0.9,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          ЧТО-ТО СЛОМАЛОСЬ.
        </h1>

        <p style={{ margin: 0, maxWidth: 520, fontSize: 14, lineHeight: 1.6, opacity: 0.8 }}>
          {msg ||
            "Страница упала с ошибкой. Обновите её — обычно этого хватает."}
        </p>

        {error?.digest && (
          <p
            style={{
              margin: 0,
              font: "11px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace",
              opacity: 0.5,
            }}
          >
            Digest: {error.digest}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <button type="button" onClick={reload} style={btn}>
            Обновить страницу
          </button>
          <button
            type="button"
            onClick={() => reset()}
            style={btnGhost}
          >
            Попробовать снова
          </button>
          <button
            type="button"
            onClick={() => {
              const base = window.location.pathname.startsWith("/oktashop")
                ? "/oktashop/"
                : "/";
              window.location.replace(base);
            }}
            style={btnGhost}
          >
            На главную
          </button>
        </div>

        <p
          style={{
            margin: 0,
            font: "10px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.45,
          }}
        >
          NOT MADE TO FIT IN.
        </p>
      </body>
    </html>
  );
}
