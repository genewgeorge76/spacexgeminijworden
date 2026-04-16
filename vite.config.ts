import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@tanstack/react-router') || id.includes('node_modules/@tanstack/router')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/leaflet')) {
            return 'vendor-leaflet'
          }
          if (id.includes('node_modules/@react-pdf')) {
            return 'vendor-pdf'
          }
          if (id.includes('node_modules/@anthropic-ai') || id.includes('node_modules/googleapis') || id.includes('node_modules/axios')) {
            return 'vendor-api'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
})
