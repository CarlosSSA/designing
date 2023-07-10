import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './', // ajusta esto a la ubicación correcta
  base: './', // ruta base para los import
  plugins: [react()],
  build: {
    outDir: 'dist', // directorio de salida
    emptyOutDir: true, // limpiar el directorio de salida antes de construir
  },
})