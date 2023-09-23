/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src'),
        },
      ],
    }),
  ],
  server: {
    open: true,
    port: 4000,
  },
});
