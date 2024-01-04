import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3758F9",
        "primary-hover": "#2F4EEC",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      monlam: ["Monlam", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
