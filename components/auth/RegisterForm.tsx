"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { storeConfig } from "@/lib/config";

const inputCls = (bad?: boolean) =>
  `w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime ${
    bad ? "border-blood" : "border-dirty/25"
  }`;

export default function RegisterForm() {
  const router = useRouter();
  const { register, ready, user } = useAuth();
  const [f, setF] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof f, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    if (f.name.trim().length < 2) return setError("Введите имя");
    if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim()))
      return setError("Введите корректный номер телефона");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      return setError("Введите корректный email");
    if (f.password.length < 6) return setError("Пароль — минимум 6 символов");

    setBusy(true);
    setError(null);
    try {
      await register(
        f.email.trim(),
        f.password,
        f.name.trim(),
        f.phone.trim()
      );
      // Уведомление в Telegram — фоном, не блокируем переход.
      // Ошибка не важна: аккаунт уже создан, а токен бота живёт в Worker.
      const workerUrl = storeConfig.telegram.workerUrl;
      if (workerUrl) {
        fetch(workerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "register",
            name: f.name.trim(),
            phone: f.phone.trim(),
            email: f.email.trim(),
          }),
        }).catch(() => {});
      }
      router.push("/profile");
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Ошибка регистрации");
      setBusy(false);
    }
  };

  if (user) {
    return (
      <p className="text-sm text-dirty/70">
        Вы уже вошли в аккаунт.{" "}
        <Link href="/profile" className="text-lime hover:underline">
          Перейти в профиль →
        </Link>
      </p>
    );
  }

  if (!ready) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete">
        Регистрация временно недоступна — напишите нам в Telegram.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md space-y-5">
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          ИМЯ *
        </span>
        <input
          value={f.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Ваше имя"
          autoComplete="name"
          className={inputCls()}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          ТЕЛЕФОН *
        </span>
        <input
          value={f.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+992 ..."
          inputMode="tel"
          autoComplete="tel"
          className={inputCls()}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          ПОЧТА *
        </span>
        <input
          value={f.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@mail.com"
          type="email"
          autoComplete="email"
          className={inputCls()}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          ПАРОЛЬ *
        </span>
        <input
          value={f.password}
          onChange={(e) => set("password", e.target.value)}
          placeholder="Минимум 6 символов"
          type="password"
          autoComplete="new-password"
          className={inputCls()}
        />
      </label>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-blood">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 size={15} className="animate-spin" /> СОЗДАЁМ АККАУНТ…
          </>
        ) : (
          <>
            ЗАРЕГИСТРИРОВАТЬСЯ <ArrowRight size={15} />
          </>
        )}
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-lime hover:underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
