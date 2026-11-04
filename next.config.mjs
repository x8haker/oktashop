/** @type {import('next').NextConfig} */
// NEXT_PUBLIC_BASE_PATH задаётся в CI для GitHub Pages (см. .github/workflows/deploy.yml).
// Локально переменная не задана — сайт работает с корневым путём.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig = {
  // GitHub Pages — статический хостинг: нужен статический экспорт в out/.
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
