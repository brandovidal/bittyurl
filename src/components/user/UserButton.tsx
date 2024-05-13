import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'

import { UserIcon } from '@/icons/UserIcon'

import type { Session } from '@auth/core/types'
import { Link } from '@/ui/link'

const { signOut } = await import('auth-astro/client')

interface Props {
  session: Session | null
}

export function UserButton ({ session }: Props) {
  const logout = () => {
    signOut()
  }

  return (
    <>
      {session !== null && session.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              size='icon'
              variant='ghost'
            >
              <UserIcon className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='font-medium text-md'>
              {session.user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className='font-normal'>
              {session.user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <a href='#'>Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href='/login' rel='noopener'>
          <UserIcon className='h-5 w-5' />
          Login
        </Link>
      )}
    </>
  )
}
