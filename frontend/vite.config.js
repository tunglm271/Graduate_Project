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
  server: {
    host: true, // or specify a string like '0.0.0.0'
    // To allow specific hosts, use the 'allowedHosts' option (Vite 5+)
    allowedHosts: ['localhost'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'), // giữ nguyên đường dẫn
      },
    },
  },
})
