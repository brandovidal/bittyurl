import { Link } from "@/ui/link";
import { Package2 } from "lucide-react";

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