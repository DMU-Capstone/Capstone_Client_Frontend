import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ projects: ['./tsconfig.app.json'] })  // ✅ 이 줄 추가
  ],
  root: './',
});