import Image from 'next/image'
import { cn } from '@/lib/cn'

type Props = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

/** Slim device chrome wrapping a Trivaller app screenshot. */
export default function PhoneFrame({
  src,
  alt,
  className,
  priority = false,
  sizes = '240px',
}: Props) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] border border-black/10 bg-forest-deep p-1.5 shadow-soft',
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.55rem] bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes={sizes}
        />
      </div>
    </div>
  )
}
