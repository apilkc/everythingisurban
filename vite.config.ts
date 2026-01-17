import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/everythingisurban/', // Deployment base path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});