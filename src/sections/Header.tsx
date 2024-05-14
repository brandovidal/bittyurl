import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'

import { Menu } from 'lucide-react'

import { UserButton } from '@/components/user/UserButton'
import { UserMenu } from '@/components/user/UserMenu'
import { ModeToggle } from '@/components/ModeToggle'

import { useUserStore } from '@/store/user'
import { useEffect } from 'react'

import type { UserProps } from '@/interfaces/User'

interface Props {
  user?: UserProps | null
}

export function Header ({ user }: Props) {
  const storeUser = useUserStore(state => state.store)
  const cleanUser = useUserStore(state => state.clean)

  useEffect(() => {
    function getData () {
      if (user === null || user === undefined)  {
        cleanUser()
        return
      }
      storeUser(user)
    }
    getData()
  }, [user])

  return (
    <header className='sticky top-0 flex h-16 items-center justify-center gap-4 border-b px-4 md:px-6'>
      <div className='flex items-center w-full max-w-7xl'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <UserMenu />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 md:hidden'
            >
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
          <UserButton />
        </div>
      </div>
    </header>
  )
}
