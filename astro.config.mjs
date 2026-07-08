import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://talent2empower.nl',
  output: 'static',
  build: {
    assets: '_assets',
  },
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },

    plugins: [tailwindcss()],
  },
});
