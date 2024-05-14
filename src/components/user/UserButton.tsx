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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog'
import { LoginButton } from '../auth/LoginButton'

const { signOut } = await import('auth-astro/client')

interface Props {
  session: Session | null
}

export function UserButton ({ session }: Props) {
  const logout = () => {
    signOut()
  }

  const gotToLogin = () => {
    window.location.href = '/login'
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
            <DropdownMenuLabel className='font-normal'>
              <Link href='/dashboard' className='w-full'>Dashboard</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <a href='#'>Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='secondary'>
              <UserIcon className='h-5 w-5' />
              Join us
            </Button>
          </DialogTrigger>
          <DialogContent className='w-full sm:max-w-md text-foreground'>
            <DialogHeader className='flex items-center justify-center my-4'>
              <DialogTitle className='text-2xl capitalize'>
                bittyurl
              </DialogTitle>
              <DialogDescription>Sign in with Google account</DialogDescription>
            </DialogHeader>
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <LoginButton provider='google' />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
