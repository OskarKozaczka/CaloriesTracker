import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      manifest: {
        name: 'Calories Tracker',
        short_name: 'Calories Tracker',
        description: 'Track your Calories!',
        display: "standalone",
        theme_color: '#ffffff',
        start_url: '/',
        scope: "/",
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]   ,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
