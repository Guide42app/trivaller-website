import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Same path as Vercel: VITE_API_BASE_URL=/api/trivaller-backend → Spring at /api/*
      '/api/trivaller-backend': {
        target: process.env.VITE_DEV_BACKEND_ORIGIN || 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/trivaller-backend/, '/api'),
      },
    },
  },
})
