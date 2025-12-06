import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://stead.africa',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
