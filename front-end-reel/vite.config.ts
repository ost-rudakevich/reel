import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import env from 'vite-plugin-env'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/uploads': 'http://localhost:4200'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      hooks: '/src/hooks',
      services: '/src/services',
      state: '/src/state',
      types: '/src/types',
      ui: '/src/ui',
      utils: '/src/utils',
      data: '/src/data',
      hoc: '/src/hoc'
    }
  }
})
