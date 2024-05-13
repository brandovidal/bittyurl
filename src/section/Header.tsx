import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { Link } from '@/ui/link'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'

import { CircleUser, Menu, Package2 } from 'lucide-react'

export function UserMenu () {
  return (
    <>
      <Link
        href='#'
        className='flex items-center gap-2 text-lg font-semibold md:text-base'
      >
        <Package2 className='h-6 w-6' />
        <span className='sr-only'>Bittylink</span>
      </Link>
      <Link
        href='#'
        className='text-foreground transition-colors hover:text-foreground'
      >
        Dashboard
      </Link>
      <Link
        href='#'
        className='text-muted-foreground transition-colors hover:text-foreground'
      >
        Analytics
      </Link>
    </>
  )
}

export function Header () {
  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <UserMenu />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <UserMenu />
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center justify-end  gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <CircleUser className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
