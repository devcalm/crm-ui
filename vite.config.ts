/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path';

const viteConfig = defineViteConfig({
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
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    testTimeout: 5000,
    reporters: ['verbose'],
    coverage: {
      reporter: ["text", "lcov", 'json', 'html']
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);