import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "https://27c1-116-110-42-164.ngrok-free.app/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/booking-event": {
        target: "https://27c1-116-110-42-164.ngrok-free.app/booking-event",
        changeOrigin: true,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/booking-event/, ""),
      },
    },
  },
  plugins: [
    // basicSsl(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Alo Xe",
        short_name: "Alo Xe",
        start_url: ".",
        display: "standalone",
        background_color: "#fff",
        description: "taxi booking app.",
        icons: [],
      },
    }),
  ],
});
