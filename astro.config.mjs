import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://stead.africa',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
