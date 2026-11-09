import type { Metadata } from "next";

import { asset } from "@/lib/asset";
import ProfileView from "@/components/auth/ProfileView";

export const metadata: Metadata = {
  title: "Профиль",
  description: "Личный кабинет OKTASHOP®: данные покупателя и история заказов.",
  alternates: { canonical: asset("/profile/") },
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        АККАУНТ / ТВОЁ ПРОСТРАНСТВО
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[8vw]"
      >
        ПРОФИЛЬ
      </h1>
      <div className="mt-12">
        <ProfileView />
      </div>
    </div>
  );
}
