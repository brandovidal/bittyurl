import type { LinkProps } from '@/interfaces/Link'

import type { APIRoute } from 'astro'
import { Link, db, eq } from 'astro:db'

// export async function POST (request: Request): APIRoute {
export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response('Invalid content type', { status: 422 })
  }

  const body = (await request.json()) as LinkProps

  const { userId = null, url, slug } = body

  if (url === undefined || slug === undefined) {
    return new Response('Invalid body', { status: 400 })
  }

  const slugExists = await db.select().from(Link).where(eq(Link.slug, slug))
  console.log('🚀 ~ constPOST:APIRoute= ~ slugExists:', slugExists)

  if (slugExists.length > 0) {
    return new Response('Slug already exists', { status: 409 })
  }

  try {
    await db.insert(Link).values({ url, slug })
    return new Response(JSON.stringify({ userId, url, slug }))
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
}
