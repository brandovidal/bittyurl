import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { CopyIcon } from '@/icons/CopyIcon'
import { CheckIcon } from '@/icons/CheckIcon'

import { Button } from '@/ui/button'

export function PreviewLink ({ url, slug }: any) {
  const [isClipboard, setIsClipboard] = useState(false)

  function onClipboard (url: string) {
    const slugUrl = `${window.location.origin}/${url}`
    navigator.clipboard.writeText(slugUrl)

    setIsClipboard(true)

    toast.info('Link copied to clipboard.')

    setTimeout(() => {
      setIsClipboard(false)
    }, 3_000)
  }

  if (url === null || url === undefined) return <></>

  return (
    <div className='flex items-center justify-between rounded-md px-4 py-3 shadow-sm bg-gray-100 dark:bg-gray-800'>
      <div className='flex flex-col items-start justify-center'>
        <p className='text-sm font-medium text-gray-400 dark:text-gray-400'>
          /{slug}
        </p>
        <p className='text-sm font-normal text-gray-400 dark:text-gray-400'>
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
