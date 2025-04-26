// site/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Set the root to our frontend directory.
  root: path.resolve(__dirname, 'frontend'),
  // Set base to a relative path so that built asset URLs are correct.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend')
    }
  },
  build: {
    // Build the output to the backend/public directory.
    outDir: path.resolve(__dirname, 'backend/public')
  }
});
