interface Body {
  userId: number | undefined
  url: string
  slug: string
}

export async function createSlug (body: Body) {
  const response = await fetch('/api/shorten-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()

  return { data, response }
}
