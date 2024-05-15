import { useEffect, useState } from 'react'

import { CardContent, Card } from '@/ui/card'

import { CreateLink } from '@/components/link/CreateLink'
import { PreviewLink } from '@/components/link/PreviewLink'

import { usePreviewLinkStore } from '@/store/preview-link'

export function Home () {
  const data = usePreviewLinkStore(state => state.data)

  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    function getData () {
      if (data === null || data === undefined) return null

      setSlug(data.slug)
      setUrl(data.url)
    }
    getData()
  }, [data])

  return (
    <Card className='mx-auto w-full max-w-lg p-8 bg-background'>
      <CardContent className='grid space-y-4 gap-6'>
        <CreateLink />
        {slug && url && <PreviewLink slug={slug} url={url} />}
      </CardContent>
    </Card>
  )
}
