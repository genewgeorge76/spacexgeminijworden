import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    // autoCodeSplitting moves each route's component into its own lazy chunk,
    // so the 41 location pages + heavy LocationPage component no longer ship
    // in the initial bundle. Verified safe with TanStack Router v1.
    TanStackRouterVite({ autoCodeSplitting: true }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    // Ship source maps so Lighthouse "Missing source maps for large first-party JavaScript"
    // best-practices audit passes; sourcemaps live next to chunks but are not loaded in prod.
    sourcemap: true,
    // Tighten minification (esbuild is the Vite default and is already aggressive).
    cssMinify: true,
    // Slightly larger warning threshold so legitimate vendor chunks (three, leaflet, pdf) don't spam.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules/')) return
          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'vendor-react'
          }
          if (id.includes('/@tanstack/react-router') || id.includes('/@tanstack/router')) {
            return 'vendor-router'
          }
          if (id.includes('/leaflet/')) {
            return 'vendor-leaflet'
          }
          if (id.includes('/three/')) {
            return 'vendor-three'
          }
          if (id.includes('/@react-pdf/')) {
            return 'vendor-pdf'
          }
          if (id.includes('/@sentry/') || id.includes('/sentry-')) {
            return 'vendor-sentry'
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
})
