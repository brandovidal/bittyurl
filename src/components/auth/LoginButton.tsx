import GoogleIcon from '@/icons/GoogleIcon'
import { Button } from '@/ui/button'

import { signIn } from 'auth-astro/client'

interface Props {
  provider: 'google'
}

export function LoginButton ({ provider }: Props) {
  const icon = {
    google: <GoogleIcon />
  }

  const onLogin = () => {
    signIn(provider)
  }

  return (
    <Button variant='secondary' className='flex gap-2' onClick={onLogin}>
      {icon[provider]}
      Sign in
    </Button>
  )
}
