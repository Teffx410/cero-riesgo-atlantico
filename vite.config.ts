import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// En producción el juego vive en https://teffx410.github.io/cero-riesgo-atlantico/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/cero-riesgo-atlantico/' : '/',
}))
