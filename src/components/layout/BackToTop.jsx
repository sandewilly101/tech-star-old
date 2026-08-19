import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Icon } from '@/lib/icons'

const CIRCUMFERENCE = 100

/** Floating scroll-to-top control with a progress ring that fills as you read. */
export default function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })
  const dashOffset = useTransform(progress, (value) => CIRCUMFERENCE * (1 - value))

  useEffect(() => scrollYProgress.on('change', (value) => setVisible(value > 0.08)), [scrollYProgress])

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="group fixed bottom-6 right-5 z-[65] grid size-14 place-items-center rounded-full border border-hairline bg-surface/85 text-ink shadow-[0_18px_40px_-18px_rgba(7,6,64,.55)] backdrop-blur-xl sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 36 36" aria-hidden="true" className="absolute inset-0 size-full -rotate-90 p-[3px]">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-hairline"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="var(--color-ember-500)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <Icon.arrowUp className="relative size-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-ember-500" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
