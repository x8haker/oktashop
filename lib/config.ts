/** Централизованные настройки магазина. Все контакты — в одном месте. */

export const storeConfig = {
  name: "OKTASHOP®",
  slogan: "NOT MADE TO FIT IN.",
  currency: "TJS",
  location: "Dushanbe, Tajikistan",

  /** Адрес для отправки заказов в Telegram (username без @). Пустая строка = интеграция выключена. */
  telegram: {
    username: "",
    /** Fallback: публичный бот для конструктора ссылок (заполнить при подключении бота). */
    botUsername: "",
  },

  contacts: {
    phone: "",
    email: "hello@oktashop.tj",
    /** Пустая строка = соцсеть не настроена, ссылка не рендерится (нет мёртвых ссылок). */
    instagram: "",
    telegram: "",
    address: "Dushanbe, Tajikistan",
  },

  delivery: {
    dushanbe: "Бесплатная доставка по Душанбе.",
    otherCities: "В другие города — такси или согласованная доставка.",
    note: "Свяжитесь с нами, чтобы подтвердить детали доставки.",
  },
} as const;
