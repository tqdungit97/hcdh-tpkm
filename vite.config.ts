import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://5f99-2405-4802-8016-eaa0-cd18-9e1-b7ee-ed8.ngrok-free.app/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    basicSsl(),
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
