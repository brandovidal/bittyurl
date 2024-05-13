import GoogleIcon from '@/icons/GoogleIcon'
import { Button } from '@/ui/button'

import { signIn } from 'auth-astro/client'

interface Props {
  provider: 'google'
}

export function LoginButton ({ provider }: Props) {
  const onLogin = () => {
    signIn(provider)
  }

  return (
    <Button variant='secondary' className='w-full gap-4' onClick={onLogin}>
      <GoogleIcon />
      Access with Google
    </Button>
  )
}
