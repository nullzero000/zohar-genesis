import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ESTA ES LA CLAVE: Forzamos a que solo exista UNA instancia
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist',
  }
})