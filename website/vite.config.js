import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Optional: proxy /api to your backend during development so the frontend
  // can call a relative path (and you can leave VITE_API_BASE_URL unset).
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:8000',
  //   },
  // },
})
