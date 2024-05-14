import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'

import { Menu } from 'lucide-react'

import type { Session } from '@auth/core/types'

import { UserButton } from '@/components/user/UserButton'
import { UserMenu } from '@/components/user/UserMenu'
import { ModeToggle } from '@/components/ModeToggle'

interface Props {
  session: Session | null
}

export function Header ({ session }: Props) {
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
        <ModeToggle />
        <UserButton session={session} />
      </div>
    </header>
  )
}
