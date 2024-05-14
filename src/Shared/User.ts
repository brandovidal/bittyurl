import type { UserProps } from '@/interfaces/User'

import type { Session } from '@auth/core/types'
import { createUser, getUserByEmail } from './db'

export async function upsertUser (session: Session | null) {
  let user: UserProps | null = null

  if (
    !(
      session === null ||
      session === undefined ||
      session.user === null ||
      session.user === undefined ||
      session.user?.email === null ||
      session.user?.email === undefined ||
      session.user?.name === null ||
      session.user?.name === undefined
    )
  ) {
    const userExists = await getUserByEmail(session.user.email)

    if (userExists.success && userExists.data === null) {
      await createUser({ name: session.user.name, email: session.user.email })
    }

    user = userExists.data!
  }

  return user
}
