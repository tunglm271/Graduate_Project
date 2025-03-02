import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@icon': path.resolve(__dirname, 'src/assets/icon'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
})


