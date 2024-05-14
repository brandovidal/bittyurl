import { forwardRef, type AnchorHTMLAttributes } from 'react'

import { Button } from '@/ui/button'

import { cn } from '@/lib/style'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, ...props }, ref) => {
    return (
      <a ref={ref} href={href} className={cn('flex', className)} {...props} />
    )
  }
)

Link.displayName = 'Link'

export { Link }
