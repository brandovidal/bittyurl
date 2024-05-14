import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { UserProps as User } from '@/interfaces/User'

interface UserState {
  data: User | null
  store: (data: User) => void
  clean: () => void
}

export const useUserStore = create(
  devtools(
    persist<UserState>(
      set => ({
        data: null,
        store: data => {
          set(() => ({ data }))
        },
        clean: () => {
          set({ data: null })
        }
      }),
      { name: 'user' }
    )
  )
)
