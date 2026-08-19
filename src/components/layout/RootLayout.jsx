import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import { ProgressBar } from '@/components/ui/Atoms'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/** Scrolls to the top on navigation, or to the hash target when there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        requestAnimationFrame(() => {
          const top = target.getBoundingClientRect().top + window.scrollY - 96
          if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1 })
          else window.scrollTo({ top, behavior: 'smooth' })
        })
        return
      }
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function RootLayout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  useSmoothScroll()

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <ProgressBar scaleX={scaleX} />
      <ScrollManager />
      <Navbar />

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
