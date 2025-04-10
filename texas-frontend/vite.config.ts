import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 🔥 Needed for the alias

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
