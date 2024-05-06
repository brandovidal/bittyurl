import type { LinkProps } from '@/interfaces/Link'

import type { APIRoute } from 'astro'
import { Link, db, eq } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(
      JSON.stringify({
        success: false,
        error: { message: 'Invalid content type' }
      }),
      { status: 422 }
    )
  }

  const body = (await request.json()) as LinkProps

  const { userId = null, url, slug } = body

  if (url === undefined || slug === undefined) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { message: 'Missing required fields' }
      }),
      { status: 400 }
    )
  }

  const slugExists = await db.select().from(Link).where(eq(Link.slug, slug))

  if (slugExists.length > 0) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { message: 'Slug already exists' }
      }),
      { status: 409 }
    )
  }

  try {
    await db.insert(Link).values({ userId, url, slug })
    return new Response(
      JSON.stringify({ success: true, data: { url, slug } }),
      { status: 201 }
    )
  } catch (err) {
    const errorName = (err as Error).name
    return new Response(
      JSON.stringify({ success: false, error: { message: errorName } }),
      { status: 500 }
    )
  }
}
