import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#493D1D", // The default primary color
          50: "#FBF9F4", // Lightest shade
          100: "#F6F3E9",
          200: "#EFE9D7",
          300: "#E5DABD",
          400: "#DBCCA3",
          500: "#D0BC86", // A darker shade of primary
          600: "#C4AC69", // Even darker
          700: "#B39646",
          800: "#937B39",
          900: "#6E5C2B",
          950: "#493D1D",
        },
        secondary: {
          DEFAULT: "#052250",
          50: "#E2EDFD",
          100: "#C5DAFB",
          200: "#8CB5F8",
          300: "#5290F4",
          400: "#196BF1",
          500: "#0C53C5",
          600: "#093B8B",
          700: "#052250",
          800: "#031635",
          900: "#020C1D",
          950: "#01060E",
        },
        success: {
          DEFAULT: "#3C8B3F",
          50: "#EDF7EE",
          100: "#DBF0DC",
          200: "#B8E0B9",
          300: "#94D196",
          400: "#6DC070",
          500: "#4CAF50",
          600: "#3C8B3F",
          700: "#2E6B30",
          800: "#1F4720",
          900: "#0F2410",
          950: "#081208",
        },
        failure: {
          DEFAULT: "#D32F2F",
          50: "#FCF2F2",
          100: "#FAE6E6",
          200: "#F4CCCC",
          300: "#EDABAB",
          400: "#E48181",
          500: "#D32F2F",
          600: "#C22929",
          700: "#AD2424",
          800: "#871C1C",
          900: "#611414",
          950: "#4C1010",
        },
        neutral: {
          DEFAULT: "#FFFFFF",
          50: "#F2F2F2",
          100: "#EDEDED",
          200: "#E0E0E0",
          300: "#D4D4D4",
          400: "#C4C4C4",
          500: "#B3B3B3",
          600: "#A1A1A1",
          700: "#8C8C8C",
          800: "#707070",
          900: "#454545",
          950: "#171717",
        },
        surface: {
          light: "#FBF9F4",
          dark: "#01060E",
        },
        light_text: {
          default: "#171717",
          secondary: "#707070",
          tertiary: "#A1A1A1",
        },
        dark_text: {
          default: "#F2F2F2",
          secondary: "#E0E0E0",
          tertiary: "#B3B3B3",
        },
      },
      animation: {
        "scan-overlay": "scan 4s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
    fontFamily: {
      poppins: ["Inter", "Poppins", "sans-serif"],
      monlam: ["Monlam", "sans-serif"],
      notosans: ["Noto Sans", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
