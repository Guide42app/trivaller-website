import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]',
            tone === 'dark' ? 'text-ink' : 'text-muted',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'text-balance text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl',
          'text-ink',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-relaxed sm:text-lg text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
