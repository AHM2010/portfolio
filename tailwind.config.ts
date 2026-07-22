import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        cream: "#f6f2e9",
        paper: "#fffdf8",
        ink: "#171813",
        muted: "#62645d",
        gold: "#b98b24",
      },
      boxShadow: { soft: "0 22px 60px rgba(38,32,18,.09)" },
      keyframes: {
        "nav-enter": {
          from: { opacity: "0", transform: "translateY(-14px) scale(.985)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "menu-enter": {
          from: { opacity: "0", transform: "translateY(-8px) scaleY(.96)" },
          to: { opacity: "1", transform: "translateY(0) scaleY(1)" },
        },
        "footer-shimmer": {
          "0%, 100%": { backgroundPosition: "-55% 0", opacity: ".55" },
          "50%": { backgroundPosition: "155% 0", opacity: "1" },
        },
      },
      animation: {
        "nav-enter": "nav-enter .55s cubic-bezier(.22,1,.36,1) both",
        "menu-enter": "menu-enter .24s cubic-bezier(.22,1,.36,1) both",
        "footer-shimmer": "footer-shimmer 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
