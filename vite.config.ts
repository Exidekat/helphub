import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // point Vite at your frontend source
  root: path.resolve(__dirname, 'frontend'),
  // ensure all asset URLs are absolute so they load from '/'
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend')
    }
  },
  build: {
    // output exactly where Vercel expects it
    outDir: path.resolve(__dirname, 'backend/public'),
    emptyOutDir: true
  }
});
