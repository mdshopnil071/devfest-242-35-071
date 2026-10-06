import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-engine': ['pdf-lib'],
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'canvas-confetti']
        }
      }
    }
  }
});
