import { cn } from '@/lib/utils'

/**
 * The TechStar star mark, redrawn as vector so it stays crisp at any size and
 * recolours with the theme — the supplied logo files are navy-on-white rasters
 * that box badly against a dark surface.
 *
 * The upper-left wedge inherits `currentColor` (navy on light, white on dark);
 * the lower-right wedge is always brand ember.
 */
export function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="TechStar Innovation Hub"
      className={cn('shrink-0', className)}
    >
      <path d="M55 2 Q53 37 50 50 Q37 53 3 62 Q36 35 55 2 Z" fill="currentColor" />
      <path d="M97 38 Q63 47 50 50 Q47 63 45 98 Q64 65 97 38 Z" fill="var(--color-ember-500)" />
    </svg>
  )
}

/** Mark plus wordmark, used in the header, the mobile drawer and the footer. */
export default function Logo({ className, markClassName, onDark = false, size = 'md' }) {
  const sizes = {
    sm: { mark: 'size-8', name: 'text-[0.95rem]', sub: 'text-[0.55rem]' },
    md: { mark: 'size-10', name: 'text-[1.05rem]', sub: 'text-[0.62rem]' },
    lg: { mark: 'size-12', name: 'text-lg', sub: 'text-[0.62rem]' },
  }[size]

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={cn(sizes.mark, onDark ? 'text-white' : 'text-navy-900 dark:text-white', markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-extrabold tracking-tight',
            sizes.name,
            onDark ? 'text-white' : 'text-ink',
          )}
        >
          TechStar
        </span>
        <span className={cn('font-semibold uppercase tracking-[0.22em] text-ember-500', sizes.sub)}>
          Innovation Hub
        </span>
      </span>
    </span>
  )
}
