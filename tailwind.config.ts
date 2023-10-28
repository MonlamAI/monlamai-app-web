import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Elsie: ["Elsie", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      monlam: ["Monlam", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
