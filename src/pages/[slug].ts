import { getLinkBySlug } from '@/SHared/db'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 403 })
  }

  const response = await getLinkBySlug(slug)

  if (!response.success) {
    return new Response(null, { status: 500 })
  }

  if (!response.data) {
    return new Response(null, { status: 404 })
  }
  
  // redirect
  return new Response(null, {
    status: 307,
    headers: {
      Location: response.data
    }
  })
}
