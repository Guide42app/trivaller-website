import Link from 'next/link'
import { cn } from '@/lib/cn'

type Props = {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'light'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const styles = {
  primary: 'bg-emerald text-white hover:bg-emerald-bright',
  secondary: 'bg-white text-ink border border-black/10 hover:bg-forest-mid',
  ghost: 'bg-transparent text-ink border border-black/10 hover:border-ink',
  light: 'bg-forest-deep text-white hover:bg-ink',
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  ariaLabel,
}: Props) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:scale-[1.02] active:scale-[0.98]',
    styles[variant],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
