import type { Metadata } from "next";

import { asset } from "@/lib/asset";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в аккаунт OKTASHOP® — история заказов и быстрое оформление.",
  alternates: { canonical: asset("/login/") },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        ACCOUNT / WELCOME BACK
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[8vw]"
      >
        ВХОД
      </h1>
      <div className="mt-12">
        <LoginForm />
      </div>
    </div>
  );
}
