import { getLinkBySlug, incrementClicks } from '@/Shared/db'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {  
  const { slug } = params

  if (!slug) {
    return new Response(null, { status: 403 })
  }

  const responseGet = await getLinkBySlug(slug)

  if (!responseGet.success) {
    return new Response(null, { status: 500 })
  }

  if (!responseGet.data) {
    return new Response(null, { status: 404 })
  }
  
  const { url, clicks } = responseGet.data
  const responseIncrement = await incrementClicks(slug, clicks)
  
  if (!responseIncrement.success) {
    return new Response(null, { status: 500 })
  }

  
  // redirect
  return new Response(null, {
    status: 307,
    headers: {
      Location: url
    }
  })
}
