/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf8f6",
          100: "#f5e6d3",
          200: "#e8d4bc",
          300: "#d4b896",
          400: "#b8926a",
          500: "#9c7355",
          600: "#7d5a42",
          700: "#4b2e2b",
          800: "#3d2522",
          900: "#2c1a18",
        },
        cream: "#fff8f0",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        cup: "0 8px 0 0 #3d2522, 0 12px 24px -8px rgba(75, 46, 43, 0.25)",
        "cup-inner": "inset 0 2px 8px rgba(44, 26, 24, 0.2)",
      },
    },
  },
  plugins: [],
};
