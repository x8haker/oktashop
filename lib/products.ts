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
  | "ACCESSORIES"
  | "ASTRE"
  | "OTAKUWEAR";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // TJS — цены по рынку Душанба +10–15% (см. FIXES/исследование конкурентов)
  sizes: string[];
  images: string[]; // локальные пути /products/<slug>/NN.jpg
  isNew: boolean;
  sku: string;
  description: string;
}

const pimg = (slug: string, n: number, ext = "jpg") =>
  asset(`/products/${slug}/${String(n).padStart(2, "0")}.${ext}`);

export const categories: { name: Category; label: string; image: string }[] = [
  // name — ключ для URL (?category=HOODIES), label — что видит покупатель.
  { name: "HOODIES", label: "ХУДИ", image: pimg("new-york-199x-hoodie", 1) },
  { name: "SWEATSHIRTS", label: "СВИТШОТЫ", image: pimg("preppy-tie-sweatshirt", 1) },
  { name: "SETS", label: "КОМПЛЕКТЫ", image: pimg("spider-set", 1) },
  { name: "BAGGY JEANS", label: "ДЖИНСЫ", image: pimg("baggy-jeans-grey", 1) },
  { name: "JACKETS", label: "КУРТКИ", image: pimg("spider-bomber-jacket", 1) },
  { name: "SHOES", label: "ОБУВЬ", image: pimg("sneakers-black-teal", 1) },
  { name: "ACCESSORIES", label: "АКСЕССУАРЫ", image: pimg("spider-beanie", 1) },
  // Отдельный раздел — товары партнёрского магазина ASTRÉ STORE (alt mode shop).
  { name: "ASTRE", label: "ASTRÉ", image: pimg("astre-plaid-hoodie", 1) },
  // Отдельный раздел — товары партнёрского магазина OtakuWear (аниме-стритвир).
  { name: "OTAKUWEAR", label: "OTAKUWEAR", image: pimg("ow-anime-jacket-navy", 1) },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "new-york-199x-hoodie",
    name: "ХУДИ NEW YORK 199X",
    category: "HOODIES",
    price: 550,
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
    price: 490,
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
    price: 550,
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
    price: 990,
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
    price: 890,
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
    price: 590,
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
    price: 590,
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
    price: 850,
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
    price: 690,
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
    price: 690,
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
    price: 190,
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
    price: 550,
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
    price: 650,
    sizes: ["M", "L", "XL"],
    images: [pimg("spider-zip-hoodie", 1)],
    isNew: false,
    sku: "OKT-HD-004",
    description:
      "Худи на молнии в бордово-белой расцветке с острой звёздной графикой: панели на рукавах, принт на капюшоне и груди. Свободный силуэт.",
  },

  // ============ ASTRÉ STORE — отдельный раздел (парнёрский магазин) ============
  // Фото и цены — из карточек ASTRÉ STORE (alt mode shop). Размеры — демо-
  // значения до подтверждения поставщиком (см. комментарий в шапке файла).
  {
    id: "p14",
    slug: "astre-plaid-hoodie",
    name: "ХУДИ PLAID GREY",
    category: "ASTRE",
    price: 140,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2, 3].map((n) => pimg("astre-plaid-hoodie", n)),
    isNew: true,
    sku: "AST-HD-001",
    description:
      "Серое худи с капюшоном и контрастной синей клетчатой подкладкой: клетка видна на капюшоне и по планке — эффект слоёности без лишнего слоя. Оверсайз-силуэт, мягкий футер.",
  },
  {
    id: "p15",
    slug: "astre-duffle-coat",
    name: "ПАЛЬТО DUFFLE BROWN",
    category: "ASTRE",
    price: 110,
    sizes: ["S", "M", "L"],
    images: [1, 2, 3].map((n) => pimg("astre-duffle-coat", n)),
    isNew: true,
    sku: "AST-JK-001",
    description:
      "Коричневое пальто-дуфл на петлях: высокий воротник, плечевые погоны, рукава с манжетами. Плотная шерстяная ткань, прямой крой — тёплая база на осень и зиму.",
  },
  {
    id: "p16",
    slug: "astre-are-you-coming-tee",
    name: "ФУТБОЛКА ARE YOU COMING",
    category: "ASTRE",
    price: 90,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("astre-are-you-coming-tee", 1)],
    isNew: true,
    sku: "AST-TP-001",
    description:
      "Кремовая футболка с печатью Are You Coming: графический принт в духе уличных скетчей, красно-чёрная палитра. Свободный крой, мягкий хлопок.",
  },
  {
    id: "p17",
    slug: "astre-newsboy-cap",
    name: "КЕПКА NEWSBOY",
    category: "ASTRE",
    price: 40,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-newsboy-cap", 1)],
    isNew: true,
    sku: "AST-CP-001",
    description:
      "Кепка-репортёр в коричневую клетку с ремешком и металлическим кольцом. Держит форму, универсальный размер, хорошо садится с пальто и худи.",
  },
  {
    id: "p18",
    slug: "astre-baggy-jeans-blue",
    name: "ДЖИНСЫ BAGGY BLUE",
    category: "ASTRE",
    price: 90,
    sizes: ["30", "32", "34", "36"],
    images: [pimg("astre-baggy-jeans-blue", 1)],
    isNew: true,
    sku: "AST-JN-001",
    description:
      "Синие бэгги-джинсы свободного кроя: широкие штанины, средняя посадка, плотный деним. Лёгкий расслабленный силуэт в уличном стиле.",
  },
  {
    id: "p19",
    slug: "astre-washed-jeans",
    name: "ДЖИНСЫ WASHED GREY",
    category: "ASTRE",
    price: 90,
    sizes: ["30", "32", "34", "36"],
    images: [pimg("astre-washed-jeans", 1)],
    isNew: true,
    sku: "AST-JN-002",
    description:
      "Джинсы с эффектом стирки серо-зелёного оттенка: широкий крой, выгоревшее покрытие, лёгкий винтаж. Каждая пара выглядит чуть по-своему.",
  },
  {
    id: "p20",
    slug: "astre-script-beanie",
    name: "ШАПКА-БИНИ SCRIPT",
    category: "ASTRE",
    price: 50,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-script-beanie", 1)],
    isNew: true,
    sku: "AST-AC-001",
    description:
      "Чёрная шапка-бини с белым шрифтовым узором. Универсальный размер, тёплый трикотаж — базовый аксессуар на холодный сезон.",
  },
  {
    id: "p21",
    slug: "astre-buckle-boots",
    name: "САПОГИ BUCKLE BLACK",
    category: "ASTRE",
    price: 70,
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [pimg("astre-buckle-boots", 1)],
    isNew: true,
    sku: "AST-SH-001",
    description:
      "Чёрные сапоги-миддл на устойчивом каблуке: два ремешка с пряжками, мягкая кожа, слегка мешковатый силуэт. Держат форму и не давят.",
  },
  {
    id: "p22",
    slug: "astre-cream-sneakers",
    name: "КЕДЫ CREAM",
    category: "ASTRE",
    price: 90,
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [pimg("astre-cream-sneakers", 1)],
    isNew: true,
    sku: "AST-SH-002",
    description:
      "Кремовые кеды с чёрными полосами и коричневой подошвой — ретро-силуэт в духе samba. Лёгкая пара на каждый день.",
  },
  {
    id: "p23",
    slug: "astre-pinstripe-bag",
    name: "СУМКА PINSTRIPE",
    category: "ASTRE",
    price: 60,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-pinstripe-bag", 1)],
    isNew: true,
    sku: "AST-BG-001",
    description:
      "Сумка-шоппер в тонкую полоску с длинными ремешками и фурнитурой: вместительная, мягкая форма, садится на плечо или в руку.",
  },
  {
    id: "p24",
    slug: "astre-leather-bag",
    name: "СУМКА LEATHER BLACK",
    category: "ASTRE",
    price: 90,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-leather-bag", 1)],
    isNew: true,
    sku: "AST-BG-002",
    description:
      "Чёрная сумка из экокожи с заклёпками и съёмным ремешком: компактный силуэт-хобо, держит форму, на каждый день и на выход.",
  },
  {
    id: "p25",
    slug: "astre-oval-glasses",
    name: "ОЧКИ OVAL BLACK",
    category: "ASTRE",
    price: 20,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-oval-glasses", 1)],
    isNew: true,
    sku: "AST-AC-002",
    description:
      "Очки в чёрной овальной оправе — акцентный аксессуар в стиле alt mode. Лёгкая оправа, универсальная посадка.",
  },
  {
    id: "p26",
    slug: "astre-stud-belt",
    name: "РЕМЕНЬ STUDDED",
    category: "ASTRE",
    price: 70,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-stud-belt", 1)],
    isNew: true,
    sku: "AST-AC-003",
    description:
      "Чёрный ремень с рядами металлических заклёпок и пряжкой. Плотная кожа, яркий акцент к джинсам и бэгги.",
  },
  {
    id: "p27",
    slug: "astre-badge-holder",
    name: "БЕЙДЖ-ДЕРЖАТЕЛЬ CHARMS",
    category: "ASTRE",
    price: 10,
    sizes: ["ONE SIZE"],
    images: [pimg("astre-badge-holder", 1)],
    isNew: true,
    sku: "AST-AC-004",
    description:
      "Бейдж-холдер с координатным шнуром и подвесками: прозрачное окно для карты, карабин, брелок-сердечко. Мелкий, но заметный аксессуар.",
  },

  // ============ OTAKUWEAR — отдельный раздел (аниме-стритвир) ============
  // Фото — промо-карточки магазина OtakuWear (PNG → JPEG q82, 63 МБ → 7 МБ).
  // Цен на карточках нет — выставлены по рынку Душанба +10–15%, как в
  // основном каталоге (см. комментарий у поля price).
  {
    id: "p28",
    slug: "ow-anime-jacket-navy",
    name: "АНИМЕ-КУРТКА NAVY",
    category: "OTAKUWEAR",
    price: 690,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2].map((n) => pimg("ow-anime-jacket-navy", n)),
    isNew: true,
    sku: "OW-JK-001",
    description:
      "Тёмно-синяя куртка в азиатском стиле с белыми полосами на рукавах и застёжкой-молнией по центру. Свободный силуэт из лёгкой ткани — база для многослойных образов.",
  },
  {
    id: "p29",
    slug: "ow-oversize-hoodie-grey",
    name: "ХУДИ OVERSIZE GREY",
    category: "OTAKUWEAR",
    price: 550,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-oversize-hoodie-grey", 1)],
    isNew: true,
    sku: "OW-HD-001",
    description:
      "Серое оверсайз-худи из мягкого футера: объёмный капюшон, широкие рукава и глубокий карман-кенгуру. Спокойная база без принтов.",
  },
  {
    id: "p30",
    slug: "ow-anime-jacket-black",
    name: "АНИМЕ-КУРТКА BLACK",
    category: "OTAKUWEAR",
    price: 690,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2].map((n) => pimg("ow-anime-jacket-black", n)),
    isNew: true,
    sku: "OW-JK-002",
    description:
      "Чёрная куртка с белыми полосами на рукавах и молнией по центру — тот же крой, что и у синей версии, только в монохроме. Лёгкая ткань, свободная посадка.",
  },
  {
    id: "p31",
    slug: "ow-anime-tee-black",
    name: "АНИМЕ-ФУТБОЛКА BLACK",
    category: "OTAKUWEAR",
    price: 350,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2].map((n) => pimg("ow-anime-tee-black", n)),
    isNew: true,
    sku: "OW-TP-001",
    description:
      "Чёрная футболка с крупной белой манговой графикой на груди. Плотный хлопок и свободный крой — посадка не садится после стирки.",
  },
  {
    id: "p32",
    slug: "ow-anime-pants-brown",
    name: "БРЮКИ ANIME BROWN",
    category: "OTAKUWEAR",
    price: 550,
    sizes: ["30", "32", "34", "36"],
    images: [1, 2].map((n) => pimg("ow-anime-pants-brown", n)),
    isNew: true,
    sku: "OW-PT-001",
    description:
      "Коричневые брюки свободного кроя со светлой строчкой по боковым швам. Плотная ткань, средняя посадка, широкие штанины.",
  },
  {
    id: "p33",
    slug: "ow-canvas-sneakers-brown",
    name: "КЕДЫ CANVAS BROWN",
    category: "OTAKUWEAR",
    price: 590,
    sizes: ["39", "40", "41", "42", "43"],
    images: [pimg("ow-canvas-sneakers-brown", 1)],
    isNew: true,
    sku: "OW-SH-001",
    description:
      "Коричневые канвасовые кеды с белой резиновой подошвой: классический силуэт, плотный текстиль, лёгкая посадка на ногу.",
  },
  {
    id: "p34",
    slug: "ow-mesh-flow-cream",
    name: "КРОССОВКИ MESH FLOW CREAM",
    category: "OTAKUWEAR",
    price: 690,
    sizes: ["39", "40", "41", "42", "43"],
    images: [pimg("ow-mesh-flow-cream", 1)],
    isNew: true,
    sku: "OW-SH-002",
    description:
      "Кремовые кроссовки с сетчатым верхом и рельефной подошвой: дышащая конструкция и амортизация на каждый день.",
  },
  {
    id: "p35",
    slug: "ow-knowledge-tee",
    name: "ФУТБОЛКА «ПОЗНАНИЕ»",
    category: "OTAKUWEAR",
    price: 350,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-knowledge-tee", 1)],
    isNew: true,
    sku: "OW-TP-002",
    description:
      "Чёрная футболка с мелкой белой печатью-текстом на груди — лаконичный минималистичный принт в духе страниц буддийских сутр.",
  },
  {
    id: "p36",
    slug: "ow-navy-stripe-polo",
    name: "ПОЛО NAVY STRIPE",
    category: "OTAKUWEAR",
    price: 420,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2].map((n) => pimg("ow-navy-stripe-polo", n)),
    isNew: true,
    sku: "OW-PO-001",
    description:
      "Тёмно-синее поло в тонкую белую полосу с контрастным белым воротником. Рубашковый крой из лёгкого хлопка.",
  },
  {
    id: "p37",
    slug: "ow-beige-loafers",
    name: "ЛОФЕРЫ BEIGE",
    category: "OTAKUWEAR",
    price: 650,
    sizes: ["39", "40", "41", "42", "43"],
    images: [pimg("ow-beige-loafers", 1)],
    isNew: true,
    sku: "OW-SH-003",
    description:
      "Бежевые лоферы из матовой замши: мягкая стелька, устойчивая подошва, лаконичный силуэт без шнурков.",
  },
  {
    id: "p38",
    slug: "ow-mesh-flow-black",
    name: "КРОССОВКИ MESH FLOW BLACK",
    category: "OTAKUWEAR",
    price: 690,
    sizes: ["39", "40", "41", "42", "43"],
    images: [pimg("ow-mesh-flow-black", 1)],
    isNew: true,
    sku: "OW-SH-004",
    description:
      "Чёрные кроссовки Mesh Flow с бирюзовыми акцентами: сетчатый верх, разделённая рельефная подошва, дышащая конструкция.",
  },
  {
    id: "p39",
    slug: "ow-azamzoda-sneakers",
    name: "КРОССОВКИ AZAMZODA OTAKU DRIP",
    category: "OTAKUWEAR",
    price: 790,
    sizes: ["39", "40", "41", "42", "43"],
    // Одна модель, две расцветки: 01 — сине-красная, 02 — чёрно-бежевая.
    images: [1, 2].map((n) => pimg("ow-azamzoda-sneakers", n)),
    isNew: true,
    sku: "OW-SH-005",
    description:
      "Кроссовки с плотной этнической вышивкой на носке и боковинах, разделённая подошва с рисунком. Модель в двух расцветках — сине-красной и чёрно-бежевой (фото 1 и 2).",
  },
  {
    id: "p40",
    slug: "ow-sport-pants-grey",
    name: "СПОРТИВНЫЕ ШТАНЫ GREY",
    category: "OTAKUWEAR",
    price: 490,
    sizes: ["S", "M", "L", "XL"],
    images: [1, 2].map((n) => pimg("ow-sport-pants-grey", n)),
    isNew: true,
    sku: "OW-PT-002",
    description:
      "Серые спортивные штаны из футера с широким поясом на кулиске и прямыми штанинами. Мягкий начёс, свободная посадка.",
  },
  {
    id: "p41",
    slug: "ow-gojo-hoodie",
    name: "ХУДИ GOJO SATORU",
    category: "OTAKUWEAR",
    price: 590,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-gojo-hoodie", 1)],
    isNew: true,
    sku: "OW-HD-002",
    description:
      "Белое худи с чёрной манговой графикой Gojo Satoru поперёк груди. Оверсайз-крой из плотного футера.",
  },
  {
    id: "p42",
    slug: "ow-anime-hoodie-black",
    name: "ХУДИ OVERSIZE BLACK",
    category: "OTAKUWEAR",
    price: 550,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-anime-hoodie-black", 1)],
    isNew: true,
    sku: "OW-HD-003",
    description:
      "Чёрное оверсайз-худи из мягкого футера: объёмный капюшон, широкие рукава и глубокий карман. Чистая база без принтов.",
  },
  {
    id: "p43",
    slug: "ow-bomber-orange",
    name: "БОМБЕР ORANGE",
    category: "OTAKUWEAR",
    price: 850,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-bomber-orange", 1)],
    isNew: true,
    sku: "OW-JK-003",
    description:
      "Чёрный бомбер с контрастной оранжевой подкладкой и молнией по центру: классический авиационный крой из плотной ткани.",
  },
  {
    id: "p44",
    slug: "ow-polo-trouser-set-beige",
    name: "КОМПЛЕКТ ПОЛО И БРЮКИ BEIGE",
    category: "OTAKUWEAR",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-polo-trouser-set-beige", 1)],
    isNew: true,
    sku: "OW-ST-001",
    description:
      "Комплект из бежевого поло с воротником и прямых брюк того же тона. Две вещи одного оттенка — образ собран без подбора.",
  },
  {
    id: "p45",
    slug: "ow-polo-trouser-set-black",
    name: "КОМПЛЕКТ ПОЛО И БРЮКИ BLACK",
    category: "OTAKUWEAR",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-polo-trouser-set-black", 1)],
    isNew: true,
    sku: "OW-ST-002",
    description:
      "Комплект: чёрное поло с белым воротником и чёрные прямые брюки. Монохромная пара на каждый день и на выход.",
  },
  {
    id: "p46",
    slug: "ow-sport-tee-burgundy",
    name: "ФУТБОЛКА SPORT BURGUNDY",
    category: "OTAKUWEAR",
    price: 350,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-sport-tee-burgundy", 1)],
    isNew: true,
    sku: "OW-TP-003",
    description:
      "Бордовая спортивная футболка с чёрными боковыми вставками и мелкой надписью на груди. Лёгкий материал, свободный крой.",
  },
  {
    id: "p47",
    slug: "ow-naruto-tee",
    name: "ФУТБОЛКА NARUTO",
    category: "OTAKUWEAR",
    price: 390,
    sizes: ["S", "M", "L", "XL"],
    images: [pimg("ow-naruto-tee", 1)],
    isNew: true,
    sku: "OW-TP-004",
    description:
      "Белая футболка с чёрно-белой манговой графикой Naruto по всей передней панели. Свободный крой, плотный хлопок.",
  },
];

export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);

/** Русское название категории для показа покупателю (ключ URL — английский). */
export const catLabel = (c: Category | "ALL") =>
  categories.find((x) => x.name === c)?.label ?? (c === "ALL" ? "ВСЕ" : c);

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
