import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const VARIANTS = {
  primary:
    'text-white bg-[linear-gradient(110deg,var(--color-ember-600),var(--color-ember-500)_45%,var(--color-ember-400))] shadow-[0_14px_38px_-14px_var(--color-ember-600)] hover:shadow-[0_20px_50px_-14px_var(--color-ember-500)]',
  navy: 'text-white bg-[linear-gradient(110deg,var(--color-navy-900),var(--color-navy-700)_60%,var(--color-navy-600))] shadow-[0_14px_38px_-16px_var(--color-navy-900)] hover:shadow-[0_20px_48px_-16px_var(--color-navy-800)]',
  outline:
    'text-ink border border-hairline-strong bg-surface/60 backdrop-blur hover:border-ember-500 hover:text-ember-600 dark:hover:text-ember-400',
  white: 'text-navy-900 bg-white shadow-[0_14px_38px_-16px_rgba(0,0,0,.5)] hover:bg-ember-50',
  glass:
    'text-white border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/45',
  ghost: 'text-ink hover:text-ember-600 dark:hover:text-ember-400',
}

const SIZES = {
  sm: 'h-10 px-4 text-[0.82rem] gap-1.5',
  md: 'h-12 px-6 text-[0.9rem] gap-2',
  lg: 'h-14 px-8 text-[0.95rem] gap-2.5',
}

const MotionLink = motion.create(Link)

/**
 * The one button in the system: magnetic pull on pointer devices, a sheen that
 * sweeps across on hover, and it renders as <Link>, <a> or <button> depending
 * on whether it was given `to`, `href` or neither.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  icon: IconComponent,
  iconPosition = 'right',
  magnetic = true,
  fullWidth = false,
  type = 'button',
  ...props
}) {
  const reduced = usePrefersReducedMotion()
  const localRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const handleMove = (event) => {
    if (!magnetic || reduced) return
    const rect = localRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 14)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    ref: localRef,
    className: cn(
      'group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold tracking-tight',
      'transition-[color,background-color,border-color,box-shadow] duration-300 will-change-transform',
      VARIANTS[variant] ?? VARIANTS.primary,
      SIZES[size] ?? SIZES.md,
      fullWidth && 'w-full',
      className,
    ),
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: reduced ? undefined : { scale: 0.97 },
  }

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      {IconComponent && iconPosition === 'left' && (
        <IconComponent className="relative z-10 size-[1.1em] shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span className="relative z-10">{children}</span>
      {IconComponent && iconPosition === 'right' && (
        <IconComponent className="relative z-10 size-[1.1em] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  if (to) {
    return (
      <MotionLink to={to} {...shared} {...props}>
        {inner}
      </MotionLink>
    )
  }

  if (href) {
    const isWeb = /^https?:/.test(href)
    return (
      <motion.a
        href={href}
        target={isWeb ? '_blank' : undefined}
        rel={isWeb ? 'noreferrer noopener' : undefined}
        {...shared}
        {...props}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} {...shared} {...props}>
      {inner}
    </motion.button>
  )
}
