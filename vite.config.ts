import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: { 
      '@assets': path.resolve(__dirname , './src/assets/svg'),
      '@contexts': path.resolve(__dirname , './src/contexts'),
      '@components': path.resolve(__dirname , './src/components'),
      '@services': path.resolve(__dirname , './src/services'), 
      '@hooks': path.resolve(__dirname , './src/hooks'), 
      '@styles': path.resolve(__dirname , './src/styles'), 
    
    },
  },
})
