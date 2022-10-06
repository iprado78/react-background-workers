import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/live-rates': {
        target: 'ws://localhost:3000',
        ws: true,
        changeOrigin: true
      },
      '/me': {
        target: 'http://localhost:3000'
      } 
    }
  }
})
