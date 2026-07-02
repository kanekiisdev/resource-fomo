import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        surface: "#111827",
        "surface-hover": "#161B22",
        border: "#21262D",
        muted: "#8B949E",
        foreground: "#E6EDF3",
        accent: {
          blue: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
          red: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        slideUp: "slideUp 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
