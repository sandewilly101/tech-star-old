import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import Reveal from './Reveal'

/**
 * Editorial section label: a monospace index, a hairline rule and the label
 * itself. Deliberately not a pill — the pill-on-every-section look is what
 * made the page read as generic.
 */
export function Eyebrow({ children, index, className, onDark = false }) {
  return (
    <span
      className={cn(
        'flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em]',
        onDark ? 'text-ember-300' : 'text-ember-600 dark:text-ember-400',
        className,
      )}
    >
      {index && <span className={onDark ? 'text-white/35' : 'text-ink-muted/60'}>{index}</span>}
      <span
        aria-hidden="true"
        className={cn('h-px w-8 shrink-0', onDark ? 'bg-white/25' : 'bg-hairline-strong')}
      />
      {children}
    </span>
  )
}

/**
 * Section title block. Left-aligned by default so sections read as an
 * editorial column rather than a stack of centred announcements; pass
 * align="center" only where a section genuinely wants the pause.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  subtitle,
  align = 'left',
  onDark = false,
  className,
  titleClassName,
  size = 'lg',
}) {
  const centered = align === 'center'
  const parts = accent && typeof title === 'string' ? title.split(accent) : null
  const sizes = {
    lg: 'text-[2.1rem] sm:text-[3rem] lg:text-[3.9rem]',
    md: 'text-[1.85rem] sm:text-[2.4rem] lg:text-[3rem]',
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="up" duration={0.5} className="mb-6">
          <Eyebrow index={index} onDark={onDark}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.06}>
        <h2
          className={cn(
            'max-w-[19ch] text-balance font-semibold',
            sizes[size] ?? sizes.lg,
            onDark && 'text-white',
            titleClassName,
          )}
        >
          {parts && parts.length > 1 ? (
            <>
              {parts[0]}
              <span className="text-ember-500">{accent}</span>
              {parts.slice(1).join(accent)}
            </>
          ) : (
            title
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.12} className="mt-7">
          <p
            className={cn(
              'max-w-[46ch] text-[1.02rem] leading-[1.65]',
              onDark ? 'text-navy-100/70' : 'text-ink-soft',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/** Number that counts up the first time it scrolls into view. */
export function Counter({ value = 0, duration = 1.9, suffix = '', prefix = '', className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, value, {
      duration: reduced ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

/**
 * Seamless infinite scroller. Renders the children twice and translates by
 * exactly -50%, so the loop never shows a seam.
 */
export function Marquee({ children, reverse = false, speed = 42, className, pauseOnHover = true }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-x-14 gap-y-8', className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn('mask-fade-x group relative flex overflow-hidden', className)}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            'flex shrink-0 items-center gap-14 pr-14',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={{
            animation: `${reverse ? 'marquee-rev' : 'marquee'} ${speed}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

/** Layered animated gradient blobs — the signature background of the site. */
export function Aurora({ className, intensity = 'normal' }) {
  const opacity = { soft: 'opacity-40', normal: 'opacity-70', strong: 'opacity-95' }[intensity]
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute -left-[18%] -top-[28%] size-[46rem] rounded-full blur-[110px] animate-drift',
          opacity,
        )}
        style={{
          background:
            'radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--color-ember-500) 55%, transparent), transparent 62%)',
        }}
      />
      <div
        className={cn(
          'absolute -right-[14%] top-[8%] size-[40rem] rounded-full blur-[120px] animate-drift-rev',
          opacity,
        )}
        style={{
          background:
            'radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--color-ember-600) 55%, transparent), transparent 64%)',
        }}
      />
      <div
        className={cn(
          'absolute bottom-[-24%] left-[24%] size-[38rem] rounded-full blur-[130px] animate-float-slow',
          opacity,
        )}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-ember-400) 42%, transparent), transparent 66%)',
        }}
      />
    </div>
  )
}

/** Thin gradient bar that tracks reading progress at the top of the viewport. */
export function ProgressBar({ scaleX }) {
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-ember-500),var(--color-ember-600),var(--color-ember-300))]"
    />
  )
}

/** Rounded icon tile. Solid brand orange by default, navy as the quiet alternate. */
export function IconTile({ icon: IconComponent, accent = 'ember', className, size = 'md' }) {
  const accents = {
    ember: 'from-ember-400 to-ember-600 text-white ring-ember-500/30',
    navy: 'from-navy-800 to-navy-900 text-ember-400 ring-navy-900/25',
  }
  const sizes = {
    sm: 'size-11 rounded-xl [&>svg]:size-5',
    md: 'size-14 rounded-2xl [&>svg]:size-6',
    lg: 'size-16 rounded-2xl [&>svg]:size-7',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center bg-gradient-to-br ring-1 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
        accents[accent] ?? accents.ember,
        sizes[size],
        className,
      )}
    >
      <IconComponent />
    </span>
  )
}
