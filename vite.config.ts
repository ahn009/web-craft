import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('/three/')) {
            return 'vendor-three';
          }
          if (id.includes('/@react-three/')) {
            return 'vendor-react-three';
          }
          if (id.includes('/framer-motion/') || id.includes('/gsap/')) {
            return 'vendor-animation';
          }
          if (id.includes('/@radix-ui/')) {
            return 'vendor-radix';
          }
          if (id.includes('/recharts/') || id.includes('/date-fns/')) {
            return 'vendor-data-viz';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
