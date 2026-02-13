import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: username.github.io/KAHVE-POMODORO → base: '/KAHVE-POMODORO/'
  // Özel domain (coffeepomodoroyukaancz.com) veya Vercel/Netlify → base: '/'
  base: process.env.VITE_BASE_PATH ?? "/",
});
