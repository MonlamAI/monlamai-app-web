import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
    fontFamily: {
      Elsie: ["Elsie", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
