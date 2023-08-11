import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
      VitePWA({
        injectRegister: null,
          manifest: {
            name: 'Nestcafe calculator',
              short_name: 'NestcafeCalc',
              description: 'A calculator for Nestcafe',
              theme_color: '#FFE8D6',
              icons: [
                  {
                      src: 'pwa-64x64.png',
                      sizes: '64x64',
                      type: 'image/png'
                  },
                  {
                      src: 'pwa-192x192.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: 'pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'any'
                  },
                  {
                      src: 'maskable-icon-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'maskable'
                  }
              ]
          }
      })
  ],
})
