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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-focus": "hsl(var(--primary-focus))",
        "primary-content": "hsl(var(--primary-content))",
        secondary: "hsl(var(--secondary))",
        "secondary-focus": "hsl(var(--secondary-focus))",
        "secondary-content": "hsl(var(--secondary-content))",
        accent: "hsl(var(--accent))",
        "accent-focus": "hsl(var(--accent-focus))",
        "accent-content": "hsl(var(--accent-content))",
        neutral: "hsl(var(--neutral))",
        "neutral-focus": "hsl(var(--neutral-focus))",
        "neutral-content": "hsl(var(--neutral-content))",
        "base-100": "hsl(var(--base-100))",
        "base-200": "hsl(var(--base-200))",
        "base-300": "hsl(var(--base-300))",
        "base-content": "hsl(var(--base-content))",
        info: "hsl(var(--info))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
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
