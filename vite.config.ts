import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
  plugins: [
    svgr(),
    react()
  ],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@axios': path.resolve(__dirname, 'src/api/axios'),
      '@redux': path.resolve(__dirname, 'src/store/redux'),
      '@config': path.resolve(__dirname, 'src/config.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@errors': path.resolve(__dirname, 'src/errors'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
  },
});