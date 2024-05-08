import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
import db from '@astrojs/db';

// import cloudflare from '@astrojs/cloudflare';
// import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), auth(), db()],
  output: 'server',
  adapter: node({
    mode: "standalone"
  })
  // vite: {
  //   ssr: {
  //     external: ['node:path', 'node:process']
  //   },
  //   build: {
  //     minify: false
  //   }
  // }
});