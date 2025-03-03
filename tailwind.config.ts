import type { Config } from "tailwindcss";
import daisyui from "daisyui";

interface DaisyUIConfig {
  themes?: Record<string, Record<string, string>>[];
}

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jura: ["Jura", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        petal: {
          primary: "#89CFF0",
          secondary: "#4A90E2",
          accent: "#F4C542",
          neutral: "#35332C",
          info: "#B5CDA3",
          "base-100": "#F8F7F4",
        },
      },
      {
        space: {
          primary: "#EC186C",
          secondary: "#8D2999",
          accent: "#F0F3FF",
          info: "#151959",
          neutral: "#6D206E",
          "base-100": "#361447",
          success: "#403BEF",
        },
      },
      {
        greenSpace: {
          primary: "#A1CE3F",
          secondary: "#107E57",
          accent: "#cbe58e",
          neutral: "#014760",
          "base-100": "#013026",
        },
      },
    ],
  },
} satisfies Config & { daisyui?: DaisyUIConfig };
