import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aravindballa.com',
  output: 'server',
  adapter: cloudflare(),
  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
