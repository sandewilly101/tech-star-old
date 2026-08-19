import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { EASE } from '@/lib/motion'

const OFFSETS = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered entrance. Deliberately restrained: a short travel on a long
 * decelerating curve, no blur. Blur-plus-slide reads as a template effect;
 * this reads as the page settling.
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance = 26,
  once = true,
  amount = 0.2,
  className,
  ...props
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as] ?? motion.div
  const dir = OFFSETS[direction] ?? OFFSETS.up

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
      initial={{ opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Staggered container — pair with children that use the `revealItem` variant. */
export function RevealGroup({ children, className, stagger = 0.08, once = true, ...props }) {
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

/**
 * Headline reveal that wipes each line up from behind a mask. Smoother and
 * more deliberate than per-word fading, and it keeps the baseline steady.
 */
export function RevealText({ text, className, delay = 0, as = 'h2', stagger = 0.055 }) {
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
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%' },
              show: { y: '0%', transition: { duration: 1, ease: EASE } },
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
