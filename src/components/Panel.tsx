import type { UserProps } from '@/interfaces/User'

import { CardContent, Card } from '@/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

import { CreateLink } from '@/components/CreateLink'
import { PreviewLink } from '@/components/PreviewLink'
import { useLinkStore } from '@/store/link'
import { useEffect, useState } from 'react'
import type { LinkProps } from '@/interfaces/Link'

interface Props {
  user: UserProps | null
  links: LinkProps[] | []
}

export function Panel ({ user, links }: Props) {
  const data = useLinkStore(state => state.data)

  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    function getData () {
      if (data === null || data === undefined) return null

      setSlug(`/${data.slug}`)
      setUrl(data.url)
    }
    getData()
  }, [data])

  return (
    <Tabs defaultValue='shorten' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='shorten'>Shorten URL</TabsTrigger>
        <TabsTrigger value='links'>Shortened Links</TabsTrigger>
      </TabsList>
      <TabsContent value='shorten'>
        <Card className="mx-auto max-w-md p-8 bg-gray-900 text-gray-100">
          <CardContent className='space-y-4'>
            <CreateLink user={user} />
            <PreviewLink slug={slug} url={url} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='links'>
        <Card className="mx-auto max-w-md p-8 bg-gray-900 text-gray-100">
          <CardContent className='space-y-4'>
            {links.length === 0 && (
              <>
                <p className='text-gray-400'>No shortened links found.</p>
              </>
            )}
            {links.length > 0 &&
              links.map(link => (
                <PreviewLink key={link.slug} slug={link.slug} url={link.url} />
              ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
