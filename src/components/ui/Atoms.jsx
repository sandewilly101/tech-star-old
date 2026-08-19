import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import Reveal from './Reveal'

/** Small uppercase label that sits above every section title. */
export function Eyebrow({ children, icon: IconComponent, className, onDark = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em]',
        onDark
          ? 'border-white/20 bg-white/10 text-ember-300 backdrop-blur-md'
          : 'border-ember-500/25 bg-ember-500/8 text-ember-700 dark:text-ember-300',
        className,
      )}
    >
      {IconComponent && <IconComponent className="size-3.5" />}
      {children}
    </span>
  )
}

/** Section title block: eyebrow, headline, supporting line. */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  accent,
  subtitle,
  align = 'center',
  onDark = false,
  className,
  titleClassName,
}) {
  const centered = align === 'center'
  const parts = accent && typeof title === 'string' ? title.split(accent) : null

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="up" duration={0.55}>
          <Eyebrow icon={eyebrowIcon} onDark={onDark}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.06}>
        <h2
          className={cn(
            'max-w-4xl text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3.1rem]',
            onDark && 'text-white',
            titleClassName,
          )}
        >
          {parts && parts.length > 1 ? (
            <>
              {parts[0]}
              <span className="text-gradient">{accent}</span>
              {parts.slice(1).join(accent)}
            </>
          ) : (
            title
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.12}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed sm:text-[1.05rem]',
              onDark ? 'text-navy-100/75' : 'text-ink-soft',
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
    if (reduced) {
      setDisplay(value)
      return undefined
    }
    const controls = animate(0, value, {
      duration,
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
            'radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--color-plasma-500) 55%, transparent), transparent 64%)',
        }}
      />
      <div
        className={cn(
          'absolute bottom-[-24%] left-[24%] size-[38rem] rounded-full blur-[130px] animate-float-slow',
          opacity,
        )}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-aqua-500) 42%, transparent), transparent 66%)',
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
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-ember-500),var(--color-plasma-500),var(--color-aqua-400))]"
    />
  )
}

/** Rounded icon tile in one of the four brand accents. */
export function IconTile({ icon: IconComponent, accent = 'ember', className, size = 'md' }) {
  const accents = {
    ember: 'from-ember-500/22 to-ember-500/5 text-ember-600 dark:text-ember-400 ring-ember-500/20',
    plasma: 'from-plasma-500/22 to-plasma-500/5 text-plasma-500 dark:text-plasma-300 ring-plasma-500/20',
    aqua: 'from-aqua-500/22 to-aqua-500/5 text-aqua-500 dark:text-aqua-300 ring-aqua-500/20',
    navy: 'from-navy-600/20 to-navy-600/5 text-navy-700 dark:text-navy-200 ring-navy-600/20',
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
