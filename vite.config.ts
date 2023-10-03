/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
    VitePWA({
      manifest: {
        name: 'sangam',
        short_name: 'Sangam',
        description: 'Powered by Favas Thoppil',
        icons: [
          {
            src: '/sangam-logo-1.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/sangam-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
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
