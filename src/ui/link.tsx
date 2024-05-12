import { forwardRef } from 'react'

import { Button, buttonVariants } from '@/ui/button'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Link = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      className={buttonVariants({ variant: 'outline' })}
      ref={ref}
      {...props}
      />
  )
)

Link.displayName = 'Link'

export { Link }
