import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0A",
        dirty: "#F2F0E9",
        lime: "#B6FF00",
        concrete: "#777777",
        asphalt: "#191919",
        blood: "#D62929",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "Helvetica", "Arial", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-2%,2%)" },
          "40%": { transform: "translate(2%,-2%)" },
          "60%": { transform: "translate(-2%,-2%)" },
          "80%": { transform: "translate(2%,2%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        grain: "grain 1.2s steps(4) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
