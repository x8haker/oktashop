// Реальные товары OKTASHOP — фото из каталога OKTASHOP_каталог_с_характеристиками.
// ФОТО: реальные (скопированы в public/products/<slug>/).
// ЦЕНЫ И РАЗМЕРЫ: демо-значения — уточняются у поставщика (см. Характеристика.txt).
// Состав ткани, плотность и размерная сетка не указаны, пока не подтверждены продавцом.

import { asset } from "./asset";

export type Category =
  | "HOODIES"
  | "SWEATSHIRTS"
  | "SETS"
  | "BAGGY JEANS"
  | "JACKETS"
  | "SHOES"
  | "ACCESSORIES";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // TJS — демо-цена, уточнить
  sizes: string[];
  images: string[]; // локальные пути /products/<slug>/NN.jpg
  isNew: boolean;
  sku: string;
  description: string;
}

const pimg = (slug: string, n: number, ext = "jpg") =>
  asset(`/products/${slug}/${String(n).padStart(2, "0")}.${ext}`);

export const categories: { name: Category; label: string; image: string }[] = [
  { name: "HOODIES", label: "HOODIES", image: pimg("new-york-199x-hoodie", 1) },
  { name: "SWEATSHIRTS", label: "SWEATSHIRTS", image: pimg("preppy-tie-sweatshirt", 1) },
  { name: "SETS", label: "SETS", image: pimg("spider-set", 1) },
  { name: "BAGGY JEANS", label: "BAGGY JEANS", image: pimg("baggy-jeans-grey", 1) },
  { name: "JACKETS", label: "JACKETS", image: pimg("spider-bomber-jacket", 1) },
  { name: "SHOES", label: "SHOES", image: pimg("sneakers-black-teal", 1) },
  { name: "ACCESSORIES", label: "ACCESSORIES", image: pimg("spider-beanie", 1) },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "new-york-199x-hoodie",
    name: "ХУДИ NEW YORK 199X",
    category: "HOODIES",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2, 3, 4, 5, 6].map((n) => pimg("new-york-199x-hoodie", n)),
    isNew: true,
    sku: "OKT-HD-001",
    description:
      "Свободное худи в американском стиле с лаконичной надписью New York 199X. Удобная базовая модель на каждый день. Цвета: белый, серый, чёрный, тёмно-зелёный, сиреневый.",
  },
  {
    id: "p02",
    slug: "preppy-tie-sweatshirt",
    name: "СВИТШОТ PREPPY С ГАЛСТУКОМ",
    category: "SWEATSHIRTS",
    price: 950,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2, 3, 4, 5, 6].map((n) => pimg("preppy-tie-sweatshirt", n)),
    isNew: false,
    sku: "OKT-SW-001",
    description:
      "Необычный свитшот в стиле университетской классики: воротник, галстук и винтажные детали в одной модели. V-образный вырез, декоративный воротник рубашки и полосатый галстук.",
  },
  {
    id: "p03",
    slug: "spider-graphic-hoodie",
    name: "ХУДИ SPIDER GRAPHIC",
    category: "HOODIES",
    price: 890,
    sizes: ["M", "L", "XL"],
    images: [1, 2].map((n) => pimg("spider-graphic-hoodie", n)),
    isNew: false,
    sku: "OKT-HD-002",
    description:
      "Свободная модель с выразительной графикой паука — для тех, кто любит тёмный уличный стиль. Чёрный и серый верх.",
  },
  {
    id: "p04",
    slug: "spider-set",
    name: "КОМПЛЕКТ SPIDER",
    category: "SETS",
    price: 1590,
    sizes: ["M", "L", "XL"],
    images: [1, 2, 3].map((n) => pimg("spider-set", n)),
    isNew: true,
    sku: "OKT-ST-001",
    description:
      "Комплект: худи с графикой паука + брюки с повторяющимся принтом. Серый верх, чёрный низ. Продаётся комплектом.",
  },
  {
    id: "p05",
    slug: "america-set",
    name: "КОМПЛЕКТ AMERICA",
    category: "SETS",
    price: 1490,
    sizes: ["M", "L", "XL"],
    images: [pimg("america-set", 1)],
    isNew: false,
    sku: "OKT-ST-002",
    description:
      "Бордовый комплект с контрастными деталями в американском стиле: аппликация с цифрами и флагом США, нашивка на брюках. Заметный образ на каждый день.",
  },
  {
    id: "p06",
    slug: "baggy-jeans-grey",
    name: "ДЖИНСЫ BAGGY GREY",
    category: "BAGGY JEANS",
    price: 1090,
    sizes: ["30", "32", "34", "36"],
    images: [
      pimg("baggy-jeans-grey", 1),
      pimg("baggy-jeans-grey", 2),
      pimg("baggy-jeans-grey", 3),
    ],
    isNew: false,
    sku: "OKT-JN-001",
    description:
      "Свободные джинсы в уличном стиле с расслабленной посадкой: широкие штанины, серое выцветшее покрытие, свободный крой. Плотный мягкий деним, качественная фурнитура.",
  },
  {
    id: "p07",
    slug: "acid-wash-hoodie",
    name: "ХУДИ ACID WASH",
    category: "HOODIES",
    price: 950,
    sizes: ["M", "L", "XL"],
    images: [1, 2, 3].map((n) => pimg("acid-wash-hoodie", n)),
    isNew: false,
    sku: "OKT-HD-003",
    description:
      "Худи с ручной стиркой и эффектом acid wash: тёмный корпус с неоднородным выбеленным покрытием, красные декоративные стежки. Каждая вещь выглядит по-своему.",
  },
  {
    id: "p08",
    slug: "spider-bomber-jacket",
    name: "КУРТКА SPIDER BOMBER",
    category: "JACKETS",
    price: 1790,
    sizes: ["M", "L", "XL"],
    images: [pimg("spider-bomber-jacket", 1)],
    isNew: true,
    sku: "OKT-JK-001",
    description:
      "Тёмная куртка-бомбер с контрастными красными вставками и вышивкой паука на груди. Молния по центру, резинка по низу и на рукавах.",
  },
  {
    id: "p09",
    slug: "sneakers-grey",
    name: "КЕДЫ GREY",
    category: "SHOES",
    price: 1190,
    sizes: ["40", "41", "42", "43"],
    images: [1, 2].map((n) => pimg("sneakers-grey", n)),
    isNew: false,
    sku: "OKT-SH-001",
    description:
      "Кеды в серо-белой расцветке с контрастными деталями, casual/skate-стиль.",
  },
  {
    id: "p10",
    slug: "sneakers-black-teal",
    name: "КЕДЫ BLACK TEAL",
    category: "SHOES",
    price: 1190,
    sizes: ["40", "41", "42", "43"],
    images: [1, 2, 3, 4].map((n) => pimg("sneakers-black-teal", n)),
    isNew: true,
    sku: "OKT-SH-002",
    description:
      "Кеды чёрного цвета с бирюзовым контрастом — заметная пара в тёмных образах.",
  },
  {
    id: "p11",
    slug: "spider-beanie",
    name: "ШАПКА-БИНИ SPIDER",
    category: "ACCESSORIES",
    price: 340,
    sizes: ["ONE SIZE"],
    images: [pimg("spider-beanie", 1)],
    isNew: false,
    sku: "OKT-AC-001",
    description:
      "Шапка-бини с чёрной готической графикой на отвороте. Универсальный размер.",
  },
  {
    id: "p12",
    slug: "navy-zip-sweatshirt",
    name: "СВИТШОТ NAVY ZIP",
    category: "SWEATSHIRTS",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("navy-zip-sweatshirt", 1)],
    isNew: false,
    sku: "OKT-SW-002",
    description:
      "Тёмно-синий свитшот на молнии с нашивками (европейская/американская символика), длина до бёдер, свободный крой.",
  },
  {
    id: "p13",
    slug: "spider-zip-hoodie",
    name: "ХУДИ SPIDER ZIP",
    category: "HOODIES",
    price: 990,
    sizes: ["M", "L", "XL"],
    images: [pimg("spider-zip-hoodie", 1)],
    isNew: false,
    sku: "OKT-HD-004",
    description:
      "Худи на молнии в бордово-белой расцветке с острой звёздной графикой: панели на рукавах, принт на капюшоне и груди. Свободный силуэт.",
  },
];

export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);

/** Размеры для фильтра: S/M/L/XL идут первыми, потом числа (30 < 32 < 40).
 *  Дефолтная сортировка строк давала «30,32,…,L,M,S,XL». */
const sizeRank = (s: string) => {
  const order = ["S", "M", "L", "XL", "XXL"];
  const i = order.indexOf(s);
  return i >= 0 ? i : order.length;
};
export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort(
  (a, b) => sizeRank(a) - sizeRank(b) || (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0) || a.localeCompare(b)
);

export const formatPrice = (v: number) =>
  `${v.toLocaleString("ru-RU")} TJS`;
