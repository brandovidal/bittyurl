import { useMemo } from 'react'

import { Link } from '@/ui/link'
import { Link as LinkIcon } from 'lucide-react'

import { useUserStore } from '@/store/user'

export function UserMenu () {
  const user = useUserStore(state => state.data)

  useMemo(() => {
    if (user !== null && user !== undefined) {
      const links = window.document.querySelectorAll('[data-is-authenticated]')
      if (links.length === 0) return

      for (const link of links) {
        link.classList.remove('hidden')
      }
    }
  }, [user])

  return (
    <>
      <Link
        href='/'
        className='flex items-center gap-2 text-lg font-semibold md:text-base'
      >
        <LinkIcon className='h-6 w-6' />
        <h1 className='text-foreground transition-colors hover:text-foreground capitalize'>
          bittyurl
        </h1>
        <span className='sr-only'>bittyurl</span>
      </Link>
      {
        <Link
          href='/dashboard'
          className='text-muted-foreground transition-colors hover:text-foreground gap-2 hidden'
          data-is-authenticated
        >
          Dashboard
        </Link>
      }
      {/* <Link
        href='#'
        className='text-muted-foreground transition-colors hover:text-foreground'
      >
        Analytics
      </Link> */}
    </>
  )
}
