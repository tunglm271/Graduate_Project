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
    allowedHosts: ['0062-2001-ee0-4141-316b-d57-43ef-6e8c-676.ngrok-free.app', 'localhost'],
  },
})
