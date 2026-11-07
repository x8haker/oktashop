/** Централизованные настройки магазина. Все контакты — в одном месте. */

export const storeConfig = {
  name: "OKTASHOP®",
  slogan: "NOT MADE TO FIT IN.",
  location: "Dushanbe, Tajikistan",

  /** Адрес для отправки заказов в Telegram (username без @). Пустая строка = интеграция выключена. */
  telegram: {
    username: "",
  },

  contacts: {
    phone: "",
    email: "hello@oktashop.tj",
    /** Пустая строка = соцсеть не настроена, ссылка не рендерится (нет мёртвых ссылок).
     *  Формат — полный URL: https://instagram.com/<user> */
    instagram: "",
    /** Полный URL вида https://t.me/<username> — используется как href ссылки. */
    telegram: "",
    address: "Dushanbe, Tajikistan",
  },

  delivery: {
    dushanbe: "Бесплатная доставка по Душанбе.",
    otherCities: "В другие города — такси или согласованная доставка.",
    note: "Свяжитесь с нами, чтобы подтвердить детали доставки.",
  },
} as const;
