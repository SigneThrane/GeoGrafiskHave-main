import { fileURLToPath, URL } from 'node:url'; // Importerer funktionerne fileURLToPath og URL fra node:url

import { defineConfig } from 'vite'; // Importerer defineConfig fra Vite
import vue from '@vitejs/plugin-vue'; // Importerer Vue-plugin fra Vite
import { VitePWA } from 'vite-plugin-pwa'; // Importerer Vite-plugin til Progressive Web App (PWA)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Aktiverer Vue-plugin
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // Inkluderer specifikke assets i PWA
      registerType: 'autoUpdate', // Angiver registreringstype til autoUpdate
      manifest: {
        name: 'GeoGrafiskHave', // Navn på PWA
        short_name: 'GeoGrafisk', // Kort navn på PWA
        description: 'Test', // Beskrivelse af PWA
        theme_color: '#ffffff', // Temafarve for PWA
        icons: [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Opretter et alias til './src' ved hjælp af fileURLToPath og URL
    }
  }
});
