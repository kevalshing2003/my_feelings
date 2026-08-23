import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe4ee",
          200: "#ffc9de",
          300: "#ff9ec4",
          400: "#ff6fa3",
          500: "#ff4d84",
          600: "#f22c6b",
          700: "#d11b55",
        },
        plum: {
          50: "#f6f1fb",
          100: "#e8d9f7",
          200: "#cfaeef",
          300: "#b083e6",
          400: "#9257d9",
          500: "#7a3cc4",
          600: "#602e9c",
          700: "#3d1c66",
          800: "#2a1148",
          900: "#180a2e",
        },
        garnet: {
          400: "#ff5b6e",
          500: "#f0334a",
          600: "#c71f36",
        },
        ivory: "#fffaf7",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-14px) translateX(8px)" },
          "66%": { transform: "translateY(6px) translateX(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.14)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "56%": { transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-glow": "pulse-glow 3.4s ease-in-out infinite",
        beat: "beat 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
