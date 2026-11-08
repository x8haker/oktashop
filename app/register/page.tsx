import type { Metadata } from "next";

import { asset } from "@/lib/asset";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Регистрация",
  description:
    "Создайте аккаунт OKTASHOP®: имя, телефон и email — чтобы оформлять заказы в один клик и видеть их историю.",
  alternates: { canonical: asset("/register/") },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        ACCOUNT / JOIN US
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[8vw]"
      >
        РЕГИСТРАЦИЯ
      </h1>
      <div className="mt-12">
        <RegisterForm />
      </div>
    </div>
  );
}
