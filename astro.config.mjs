import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import auth from 'auth-astro';
import db from '@astrojs/db';
import tailwindcss from '@tailwindcss/vite';

// import deno from '@deno/astro-adapter';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), auth(), db()],
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});