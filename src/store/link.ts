import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { LinkProps as Link } from '@/interfaces/Link'

interface LinkState {
  data: Link | null
  store: (data: Link) => void
  clean: () => void
}

export const useLinkStore = create(
  devtools(
    persist<LinkState>(
      set => ({
        data: null,
        store: data => {
          set(() => ({ data }))
        },
        clean: () => {
          set({ data: null })
        }
      }),
      { name: 'link' }
    )
  )
)
