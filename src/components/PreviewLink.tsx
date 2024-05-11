import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { CopyIcon } from '@/icons/CopyIcon'
import { CheckIcon } from '@/icons/CheckIcon'

import { Button } from '@/ui/button'

import { useLinkStore } from '@/store/link'

export function PreviewLink () {
  const data = useLinkStore(state => state.data)

  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')
  const [isClipboard, setIsClipboard] = useState(false)

  const link = useMemo(() => {
    if (data === null || data === undefined) return null

    setSlug(`/${data.slug}`)
    setUrl(data.url)
    return data
  }, [data])

  function onClipboard (url: string) {
    navigator.clipboard.writeText(url)

    setIsClipboard(true)

    toast.info('Link copied to clipboard.')

    setTimeout(() => {
      setIsClipboard(false)
    }, 3_000)
  }

  if (link === null || link === undefined) return <></>

  return (
    <div className='flex items-center justify-between rounded-md bg-white px-4 py-3 mt-4 shadow-sm dark:bg-gray-800'>
      <div className='flex flex-col items-start justify-center'>
        <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
          {slug}
        </p>
        <p className='text-sm font-normal text-gray-900 dark:text-gray-50'>
          {url}
        </p>
      </div>
      <Button
        className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
        size='icon'
        variant='ghost'
        onClick={() => onClipboard(slug)}
      >
        {isClipboard ? (
          <CheckIcon className='h-5 w-5' />
        ) : (
          <CopyIcon className='h-5 w-5' />
        )}
        <span className='sr-only'>Copy</span>
      </Button>
    </div>
  )
}
