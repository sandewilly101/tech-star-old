import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Card with a cursor-following radial highlight and an animated gradient
 * hairline. The workhorse surface for services, features and stats.
 */
export function SpotlightCard({ children, className, glow = 'ember', as: Tag = 'div', ...props }) {
  const ref = useRef(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const [active, setActive] = useState(false)

  const tint = {
    ember: 'var(--color-ember-500)',
    navy: 'var(--color-navy-600)',
  }[glow] ?? 'var(--color-ember-500)'

  const background = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, color-mix(in srgb, ${tint} 16%, transparent), transparent 72%)`

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        'ring-gradient group relative overflow-hidden rounded-3xl border border-hairline bg-surface',
        'transition-[transform,box-shadow,border-color] duration-500 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-30px_rgba(7,6,64,.42)] dark:hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,.9)]',
        className,
      )}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ background, opacity: active ? 1 : 0 }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </MotionTag>
  )
}

/** Subtle 3D tilt that tracks the pointer — used for hero and feature imagery. */
export function TiltCard({ children, className, strength = 9, scale = 1.015, ...props }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 20 })
  const sy = useSpring(py, { stiffness: 180, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [strength, -strength])
  const rotateY = useTransform(sx, [0, 1], [-strength, strength])

  const onMove = (event) => {
    if (reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={reduced ? undefined : { scale }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={cn('will-change-transform', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Small frosted chip used for labels, dates and metadata. */
export function Chip({ children, className, icon: IconComponent, tone = 'default' }) {
  const tones = {
    default: 'border-hairline bg-surface-2 text-ink-soft',
    accent: 'border-ember-500/30 bg-ember-500/10 text-ember-700 dark:text-ember-300',
    navy: 'border-navy-900/15 bg-navy-900/6 text-navy-800 dark:border-white/15 dark:bg-white/8 dark:text-navy-100',
    onDark: 'border-white/20 bg-white/10 text-white backdrop-blur-md',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-tight',
        tones[tone] ?? tones.default,
        className,
      )}
    >
      {IconComponent && <IconComponent className="size-3.5 shrink-0" />}
      {children}
    </span>
  )
}
