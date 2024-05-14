import { CardContent, Card } from '@/ui/card'

import type { LinkProps } from '@/interfaces/Link'

import { PreviewLink } from '@/components/PreviewLink'

interface Props {
  links: LinkProps[] | []
}

export function ShortenLinks ({ links }: Props) {
  return (
    <>
      {links.length === 0 && (
        <p className='text-gray-400'>No shortened links found.</p>
      )}
      {links.length > 0 &&
        links.map(link => (
          <PreviewLink key={link.slug} slug={link.slug} url={link.url} />
        ))}
    </>
  )
}
