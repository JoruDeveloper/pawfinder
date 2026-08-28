import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        status: {
          lost: "#ef4444",
          lostSoft: "#f59e0b",
          found: "#10b981",
          foundSoft: "#34d399",
          adoption: "#3b82f6",
          adoptionSoft: "#60a5fa",
        },
        brand: {
          primary: "#7c3aed",
          secondary: "#db2777",
          accent: "#f59e0b",
        },
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2.2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out both",
      },
      backdropBlur: {
        glass: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
