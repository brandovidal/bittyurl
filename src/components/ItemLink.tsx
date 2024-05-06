import { CopyIcon } from '@/icons/CopyIcon'

import { Button } from '@/ui/button'

export function ItemLink () {
  return (
    <div className='flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm dark:bg-gray-800'>
      <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
        https://example.com/abc123
      </p>
      <Button
        className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
        size='icon'
        variant='ghost'
      >
        <CopyIcon className='h-5 w-5' />
        <span className='sr-only'>Copy link</span>
      </Button>
    </div>
  )
}
