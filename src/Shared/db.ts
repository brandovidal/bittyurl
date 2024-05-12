import { Link, User, db, like } from 'astro:db'

import type { UserProps } from '@/interfaces/User'

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

export async function getLinkBySlug (slug: string) {
  try {
    const links = await db.select().from(Link).where(like(Link.slug, slug))

    if (links.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: links[0].url
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

    console.log("🚀 ~ getLinksByUser ~ links:", links)
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