import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const OFFSETS = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered entrance. One component so every section animates with the
 * same curve and timing, and every animation collapses to a plain fade when
 * the visitor asks for reduced motion.
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance,
  once = true,
  amount = 0.25,
  blur = true,
  className,
  ...props
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as] ?? motion.div
  const base = OFFSETS[direction] ?? OFFSETS.up
  const offset = distance
    ? { x: Math.sign(base.x) * distance, y: Math.sign(base.y) * distance }
    : base

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Staggered container — pair with <Reveal> children that use `custom`. */
export function RevealGroup({ children, className, stagger = 0.09, once = true, ...props }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Word-by-word headline reveal. */
export function RevealText({ text, className, wordClassName, delay = 0, as = 'h2' }) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as] ?? motion.h2
  const words = String(text).split(' ')

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
