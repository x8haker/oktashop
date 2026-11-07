"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Send } from "lucide-react";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { storeConfig } from "@/lib/config";

interface Form {
  name: string;
  phone: string;
  city: string;
  details: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const [f, setF] = useState<Form>({ name: "", phone: "", city: "Душанбе", details: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "prepared" | "copied">("idle");
  const [orderText, setOrderText] = useState("");

  const tgConfigured = Boolean(storeConfig.telegram.username);
  const tgHref = storeConfig.contacts.telegram;

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (f.name.trim().length < 2) e.name = "Введите имя";
    if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim()))
      e.phone = "Введите корректный номер телефона";
    if (!f.city.trim()) e.city = "Укажите город";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Ошибка поля исчезает, как только пользователь начал исправлять ввод.
  const update = (key: keyof Form, value: string) => {
    setF((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };
  const buildOrder = () => {
    const lines = items.map(
      (i, n) =>
        `${n + 1}. ${i.name} — размер ${i.size} — ${i.qty} шт × ${i.price} TJS = ${
          i.price * i.qty
        } TJS`
    );
    return [
      `ЗАКАЗ OKTASHOP®`,
      `Имя: ${f.name}`,
      `Телефон: ${f.phone}`,
      `Город: ${f.city}`,
      f.details.trim() ? `Комментарий: ${f.details}` : "",
      ``,
      ...lines,
      ``,
      `ИТОГО за товары: ${formatPrice(subtotal)}; ${storeConfig.delivery.dushanbe}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const text = buildOrder();
    setOrderText(text);

    if (tgConfigured) {
      // Открываем чат магазина: параметр ?text для обычного профиля/бота
      // не гарантирует подстановку, поэтому текст заказа остаётся на экране
      // и кнопка «Скопировать» рядом.
      window.open(`https://t.me/${storeConfig.telegram.username}`, "_blank", "noopener,noreferrer");
    }
    setStatus("prepared");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setStatus("copied");
      // Кнопка не должна навсегда оставаться в состоянии «Скопировано».
      setTimeout(() => setStatus((s) => (s === "copied" ? "prepared" : s)), 2000);
    } catch {
      /* clipboard недоступен — текст виден на экране */
    }
  };

  // До гидратации состав корзины неизвестен — иначе у покупателя с товарами
  // в localStorage мелькает экран «NO ITEMS.».
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
          STEP 01 / DELIVERY DETAILS
        </p>
        <div className="mt-4 h-[15vw] w-full max-w-[900px] animate-pulse bg-asphalt md:h-[9vw]" />
      </div>
    );
  }

  if (items.length === 0 && status === "idle") {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
        <h1 className="font-anton text-6xl tracking-tight md:text-8xl">NO ITEMS.</h1>
        <p className="mt-3 text-sm text-concrete">Сначала добавьте товары в корзину.</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-3 bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void hover:bg-dirty"
        >
          SHOP THE DROP <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        STEP 01 / DELIVERY DETAILS
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[13vw] leading-[0.85] tracking-tight md:text-[8vw]"
      >
        CHECKOUT
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* форма */}
        <form onSubmit={submit} noValidate className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                ИМЯ *
              </span>
              <input
                value={f.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ваше имя"
                className={`w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime ${
                  errors.name ? "border-blood" : "border-dirty/25"
                }`}
              />
              {errors.name && (
                <span className="mt-1 block font-mono text-[10px] text-blood">{errors.name}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                ТЕЛЕФОН *
              </span>
              <input
                value={f.phone}
                onChange={(e) => update("phone", e.target.value)}
                inputMode="tel"
                placeholder="+992 ..."
                className={`w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime ${
                  errors.phone ? "border-blood" : "border-dirty/25"
                }`}
              />
              {errors.phone && (
                <span className="mt-1 block font-mono text-[10px] text-blood">{errors.phone}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                ГОРОД *
              </span>
              <input
                value={f.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Душанбе"
                className={`w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime ${
                  errors.city ? "border-blood" : "border-dirty/25"
                }`}
              />
              {errors.city && (
                <span className="mt-1 block font-mono text-[10px] text-blood">{errors.city}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                ДЕТАЛИ ДОСТАВКИ
              </span>
              <input
                value={f.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="Район, адрес, удобное время"
                className="w-full border border-dirty/25 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime"
              />
            </label>
          </div>

          <div className="border border-dirty/10 bg-asphalt p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
              КАК ПРОХОДИТ ЗАКАЗ
            </p>
            <ol className="mt-3 space-y-2 text-sm text-dirty/70">
              <li>1. Заполните форму — нажмите «ОФОРМИТЬ ЗАКАЗ».</li>
              <li>
                2. {tgConfigured
                  ? "Откроется Telegram магазина — отправьте нам текст заказа."
                  : "Нажмите «Скопировать заказ» и передайте его магазину в Telegram."}
              </li>
              <li>3. Мы подтвердим наличие, размеры и доставку в ответном сообщении.</li>
              <li>4. Оплата при получении. Онлайн-оплаты на сайте нет.</li>
            </ol>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty sm:w-auto sm:px-10"
          >
            {tgConfigured ? <>ОФОРМИТЬ ЗАКАЗ <Send size={15} /></> : <>ПОДГОТОВИТЬ ЗАКАЗ <ArrowRight size={15} /></>}
          </button>
        </form>

        {/* сводка */}
        <aside className="h-fit border border-dirty/10 bg-asphalt p-6 lg:sticky lg:top-28">
          <h2 className="font-anton text-3xl tracking-tight">ВАШ ЗАКАЗ</h2>

          <ul className="mt-5 space-y-3 border-b border-dirty/10 pb-5">
            {items.map((i) => (
              <li
                key={`${i.productId}-${i.size}`}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-dirty/80">
                  {i.name}{" "}
                  <span className="font-mono text-concrete">×{i.qty} / {i.size}</span>
                </span>
                <span className="shrink-0 font-mono tabular-nums">
                  {formatPrice(i.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-concrete">TOTAL</span>
            <span className="font-anton text-3xl text-lime tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-concrete">
            Доставка: {storeConfig.delivery.dushanbe}
          </p>

          <Link
            href="/cart"
            className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete hover:text-lime"
          >
            <ArrowLeft size={13} /> Изменить корзину
          </Link>
        </aside>
      </div>

      {/* результат: заказ подготовлен */}
      {status !== "idle" && (
        <div className="mt-12 border border-lime bg-asphalt p-6">
          <p className="flex items-center gap-2 font-anton text-2xl text-lime md:text-3xl">
            <Check size={22} /> ЗАКАЗ СОБРАН
          </p>
          <p className="mt-2 text-sm text-dirty/70">
            {tgConfigured
              ? "Мы открыли Telegram магазина — отправьте текст заказа из поля ниже."
              : "Скопируйте текст заказа ниже и передайте его менеджеру в любом удобном канале."}
          </p>

          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap border border-dirty/15 bg-void p-4 font-mono text-xs leading-relaxed text-dirty/80">
            {orderText}
          </pre>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 border border-dirty/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:border-lime hover:text-lime"
            >
              {status === "copied" ? <Check size={14} /> : <Copy size={14} />}
              {status === "copied" ? "Скопировано" : "Скопировать заказ"}
            </button>

            {tgHref && (
              <a
                href={tgHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
              >
                Открыть Telegram магазина
              </a>
            )}

            <button
              onClick={() => {
                clear();
                setStatus("idle");
              }}
              className="inline-flex items-center gap-2 border border-dirty/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-concrete transition-colors hover:border-blood hover:text-blood"
            >
              Очистить корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
