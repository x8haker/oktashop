"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";

import { useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";

const inputCls = (bad?: boolean) =>
  `w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-lime ${
    bad ? "border-blood" : "border-dirty/25"
  }`;

export default function LoginForm() {
  const router = useRouter();
  const { login, ready, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Введите корректный email");
    if (!password) return setError("Введите пароль");

    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
      router.push("/profile");
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Ошибка входа");
      setBusy(false);
    }
  };

  const reset = async () => {
    if (resetBusy || !auth) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Введите email — на него уйдёт ссылка для сброса");
    setResetBusy(true);
    setError(null);
    setNotice(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNotice("Письмо со ссылкой для сброса отправлено на " + email.trim());
    } catch {
      setError("Не удалось отправить письмо — попробуйте позже");
    } finally {
      setResetBusy(false);
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
        Вход временно недоступен — напишите нам в Telegram.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md space-y-5">
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
          ПОЧТА *
        </span>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder="Ваш пароль"
          type="password"
          autoComplete="current-password"
          className={inputCls()}
        />
      </label>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-blood">
          {error}
        </p>
      )}
      {notice && (
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-lime">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 size={15} className="animate-spin" /> ВХОДИМ…
          </>
        ) : (
          <>
            ВОЙТИ <ArrowRight size={15} />
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
        <button
          type="button"
          onClick={reset}
          disabled={resetBusy}
          className="transition-colors hover:text-lime disabled:opacity-50"
        >
          Забыли пароль?
        </button>
        <Link href="/register" className="text-lime hover:underline">
          Создать аккаунт
        </Link>
      </div>
    </form>
  );
}
