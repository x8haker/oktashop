"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, Package, User as UserIcon } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { formatPrice } from "@/lib/products";

interface Order {
  id: string;
  createdAt: number;
  items: { name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  city: string;
  status: string;
}

const STATUS_RU: Record<string, string> = {
  new: "НОВЫЙ",
  confirmed: "ПОДТВЕРЖДЁН",
  done: "ВЫДАН",
  cancelled: "ОТМЕНЁН",
};

function toOrder(snap: QueryDocumentSnapshot<DocumentData>): Order {
  const d = snap.data();
  const ts = d.createdAt;
  return {
    id: snap.id,
    createdAt:
      ts && typeof ts.toMillis === "function" ? ts.toMillis() : Date.now(),
    items: Array.isArray(d.items) ? d.items : [],
    subtotal: Number(d.subtotal) || 0,
    city: String(d.city || ""),
    status: String(d.status || "new"),
  };
}

export default function ProfileView() {
  const { user, profile, loading, ready, logout } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [ordersError, setOrdersError] = useState(false);

  useEffect(() => {
    if (!user || !db) return;
    let alive = true;
    (async () => {
      try {
        const q = query(collection(db, "orders"), where("uid", "==", user.uid));
        const snap = await getDocs(q);
        if (!alive) return;
        setOrders(
          snap.docs
            .map(toOrder)
            .sort((a, b) => b.createdAt - a.createdAt)
        );
      } catch {
        if (alive) setOrdersError(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="h-[15vw] w-full max-w-[600px] animate-pulse bg-asphalt md:h-[6vw]" />
    );
  }

  if (!ready) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete">
        Аккаунты временно недоступны — напишите нам в Telegram, мы найдём ваш
        заказ.
      </p>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md space-y-6">
        <p className="text-sm text-dirty/70">
          Войдите, чтобы видеть историю заказов и не вводить данные каждый раз.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/login"
            className="bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
          >
            ВОЙТИ
          </Link>
          <Link
            href="/register"
            className="border border-dirty/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-lime hover:text-lime"
          >
            РЕГИСТРАЦИЯ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* профиль */}
      <section className="border border-dirty/10 bg-asphalt p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-anton text-2xl tracking-tight">
              <UserIcon size={20} className="text-lime" />
              {profile?.name || user.displayName || "ПОКУПАТЕЛЬ"}
            </p>
            <p className="mt-2 font-mono text-xs text-concrete">
              {profile?.email || user.email}
            </p>
            {profile?.phone && (
              <p className="font-mono text-xs text-concrete">{profile.phone}</p>
            )}
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 border border-dirty/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:border-blood hover:text-blood"
          >
            <LogOut size={13} /> ВЫЙТИ
          </button>
        </div>
      </section>

      {/* заказы */}
      <section>
        <h2 className="font-anton text-3xl tracking-tight">МОИ ЗАКАЗЫ</h2>

        {ordersError && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-blood">
            Не удалось загрузить заказы — обновите страницу.
          </p>
        )}

        {orders && orders.length === 0 && (
          <p className="mt-4 flex items-center gap-3 text-sm text-dirty/70">
            <Package size={16} /> Заказов пока нет.{" "}
            <Link href="/shop" className="text-lime hover:underline">
              В магазин →
            </Link>
          </p>
        )}

        <ul className="mt-6 space-y-4">
          {(orders ?? []).map((o) => (
            <li key={o.id} className="border border-dirty/10 bg-asphalt p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete">
                  {new Date(o.createdAt).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span
                  className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                    o.status === "cancelled"
                      ? "border-blood text-blood"
                      : "border-lime text-lime"
                  }`}
                >
                  {STATUS_RU[o.status] ?? o.status}
                </span>
              </div>

              <ul className="mt-4 space-y-2 border-b border-dirty/10 pb-4">
                {o.items.map((i, n) => (
                  <li
                    key={n}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="text-dirty/80">
                      {i.name}{" "}
                      <span className="font-mono text-concrete">
                        ×{i.qty} / {i.size}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono tabular-nums">
                      {formatPrice(i.price * i.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
                  {o.city}
                </span>
                <span className="font-anton text-xl text-lime tabular-nums">
                  {formatPrice(o.subtotal)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
