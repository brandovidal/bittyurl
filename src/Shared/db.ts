import { Link, User, db, like } from 'astro:db'

import type { UserProps } from '@/interfaces/User'

export async function getLinkBySlug (slug: string) {
  try {
    const link = (await db.select().from(Link).where(like(Link.slug, slug))).at(0)

    if (link === undefined || link === null) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: link
    }
  } catch (err) {
    console.log('[ERROR] getLinkBySlug ::: ', err)

    const name = (err as Error).name

    return {
      success: false,
      error: { message: name }
    }
  }
}

export async function incrementClicks (slug: string, clicks: number) {
  try {
    const newClicks = clicks + 1
    const result = await db
      .update(Link)
      .set({ clicks: newClicks })
      .where(like(Link.slug, slug))

    if (result.rowsAffected === 0) {
      return {
        success: false,
        data: null
      }
    }

    return {
      success: true,
      data: newClicks
    }
  } catch (err) {
    console.log('[ERROR] updateClickToLink ::: ', err)
    const name = (err as Error).name
    return {
      success: false,
      error: { message: name }
    }
  }
}
export async function getUserByEmail (email: string) {
  try {
    const userExists = await db
      .select()
      .from(User)
      .where(like(User.email, email))

    if (userExists.length === 0) {
      return {
        success: true,
        data: null
      }
    }
    return {
      success: true,
      data: userExists[0] as UserProps
    }
  } catch (err) {
    console.log('[ERROR] getUserByEmail ::: ', err)

    const name = (err as Error).name
    return {
      success: false,
      error: { message: name }
    }
  }
}

export async function createUser (user: UserProps) {
  try {
    await db.insert(User).values(user).execute()
    return {
      success: true
    }
  } catch (err) {
    console.log('[ERROR] createUser ::: ', err)
    const name = (err as Error).name
    return {
      success: false,
      error: { message: name }
    }
  }
}

export async function getLinksByUser (userId: number) {
  try {
    const links = await db.select().from(Link).where(like(Link.userId, `${userId}`))

    if (links.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: links
    }
  } catch (err) {
    console.log('[ERROR] getLinkBySlug ::: ', err)

    const name = (err as Error).name

    return {
      success: false,
      error: { message: name }
    }
  }
}