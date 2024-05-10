import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import auth from 'auth-astro'
import db from '@astrojs/db'

import deno from '@deno/astro-adapter'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    auth(),
    db()
  ],
  output: 'server',
  adapter: deno()
})
