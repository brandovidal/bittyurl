import type { SVGProps } from 'react'

export function CopyIcon (props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className='w-6 h-6 text-gray-400 dark:text-white hover:text-gray-50 hover:dark:text-gray-300'
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}