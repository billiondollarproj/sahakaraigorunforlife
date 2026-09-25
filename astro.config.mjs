import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sahakar-ai.vercel.app',
  integrations: [sitemap()],
});
