import { CopyIcon } from '@/icons/CopyIcon'

import { Button } from '@/ui/button'

import { useLinkStore } from '@/store/link'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@/icons/CheckIcon'

export function ShorterLink () {
  const data = useLinkStore(state => state.data)

  const [shortUrl, setShortUrl] = useState('')
  const [classNameClipboard, setClassNameClipboard] = useState('')

  const link = useMemo(() => {
    if (data === null || data === undefined) return null

    setShortUrl(`${window.location.origin}/${data.slug}`)
    return data
  }, [data])

  function onClipboard (url: string) {
    navigator.clipboard.writeText(url)

    setClassNameClipboard('animate-pulse text-green-600')

    toast.success('Link copied to clipboard.')

    setTimeout(() => {
      setClassNameClipboard('')
    }, 3_000)
  }

  if (link === null || link === undefined) return <></>

  return (
    <div className='flex items-center justify-between rounded-md bg-white px-4 py-3 mt-4 shadow-sm dark:bg-gray-800'>
      <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
        {shortUrl}
      </p>
      <Button
        className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
        size='icon'
        variant='ghost'
        onClick={() => onClipboard(shortUrl)}
      >
        {classNameClipboard ? (
          <CheckIcon className='h-5 w-5' />
        ) : (
          <CopyIcon className='h-5 w-5' />
        )}
        <span className='sr-only'>Copy</span>
      </Button>
    </div>
  )
}
