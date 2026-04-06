import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devBackend =
    env.VITE_DEV_BACKEND_ORIGIN?.trim() || 'http://127.0.0.1:8081'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Browser calls same-origin /api/trivaller-backend/* → Spring http://host:port/api/*
        '/api/trivaller-backend': {
          target: devBackend.replace(/\/$/, ''),
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/trivaller-backend/, '/api'),
        },
      },
    },
  }
})
