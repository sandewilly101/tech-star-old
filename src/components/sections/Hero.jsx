import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@/lib/icons'
import { heroSlides } from '@/data/content'
import { Aurora } from '@/components/ui/Atoms'
import { TiltCard } from '@/components/ui/Cards'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const SLIDE_MS = 6500

const quickFacts = [
  { icon: 'graduation', value: '3,500+', label: 'Students trained' },
  { icon: 'school', value: '40+', label: 'Schools reached' },
  { icon: 'chip', value: '60+', label: 'IoT kits deployed' },
]

function Headline({ slide }) {
  const parts = slide.accent ? slide.title.split(slide.accent) : null
  return (
    <>
      {parts && parts.length > 1 ? (
        <>
          {parts[0]}
          <span className="text-gradient">{slide.accent}</span>
          {parts.slice(1).join(slide.accent)}
        </>
      ) : (
        slide.title
      )}
    </>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const copyFade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])

  const go = useCallback((next) => {
    setIndex(((next % heroSlides.length) + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = setTimeout(() => go(index + 1), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, paused, reduced, go])

  const slide = heroSlides[index]

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="noise relative isolate flex min-h-[44rem] items-center overflow-hidden bg-navy-950 pb-28 pt-14 text-white lg:min-h-[calc(100svh-6.5rem)] lg:pb-24 lg:pt-12"
    >
      {/* Crossfading background photography with a slow Ken Burns push */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 1, scale: reduced ? 1.14 : 1.02 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 9, ease: 'linear' } }}
          className="absolute inset-0 -z-30"
        >
          <img src={slide.image} alt="" aria-hidden="true" className="size-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,var(--color-navy-950)_18%,color-mix(in_srgb,var(--color-navy-950)_88%,transparent)_52%,color-mix(in_srgb,var(--color-navy-950)_58%,transparent)_100%)]"
      />
      <Aurora className="-z-10 opacity-80" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-[0.13]" />

      <div className="shell relative grid w-full items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
        {/* ---------------- Copy ---------------- */}
        <motion.div style={{ y: copyY, opacity: copyFade }} className="relative max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={`eyebrow-${index}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-300 backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-ember-500" />
              </span>
              {slide.eyebrow}
            </motion.span>
          </AnimatePresence>

          <div className="mt-6 min-h-[10.5rem] sm:min-h-[11.5rem] lg:min-h-[13.5rem]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${index}`}
                initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-balance text-[2.15rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.9rem] xl:text-[4.25rem]"
              >
                <Headline slide={slide} />
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`copy-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-navy-100/78 sm:text-[1.08rem]"
              >
                {slide.copy}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button to="/courses" size="lg" icon={Icon.arrowRight}>
              Explore Courses
            </Button>
            <Button to="/about" size="lg" variant="glass" icon={Icon.play} iconPosition="left">
              Our Story
            </Button>
          </div>

          {/* Slide controls */}
          <div className="mt-10 flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              {heroSlides.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}: ${item.eyebrow}`}
                  aria-current={i === index}
                  className="group relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-500"
                  style={{ width: i === index ? '3.25rem' : '1.25rem' }}
                >
                  {i === index && !reduced && (
                    <motion.span
                      key={`fill-${index}-${paused}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0.35 : 1 }}
                      transition={{ duration: paused ? 0.3 : SLIDE_MS / 1000, ease: 'linear' }}
                      className="absolute inset-0 origin-left rounded-full bg-ember-500"
                    />
                  )}
                  {i === index && reduced && <span className="absolute inset-0 rounded-full bg-ember-500" />}
                </button>
              ))}
            </div>
            <span className="font-mono text-[0.72rem] tracking-widest text-white/40">
              {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
            <div className="ml-auto flex gap-2 lg:ml-0">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="grid size-9 place-items-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-ember-400 hover:text-ember-400"
              >
                <Icon.chevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="grid size-9 place-items-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-ember-400 hover:text-ember-400"
              >
                <Icon.chevronRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ---------------- Art ---------------- */}
        <motion.div style={{ y: artY }} className="relative hidden lg:block">
          <TiltCard strength={7} className="relative mx-auto max-w-[26.5rem] xl:max-w-[29rem]">
            {/* Main frame */}
            <div className="relative rounded-[2.25rem] border border-white/15 bg-white/6 p-2.5 backdrop-blur-md shadow-[0_50px_120px_-40px_rgba(0,0,0,.85)]">
              <div className="absolute -inset-px rounded-[2.25rem] bg-[linear-gradient(140deg,color-mix(in_srgb,var(--color-ember-500)_60%,transparent),transparent_45%,color-mix(in_srgb,var(--color-plasma-500)_50%,transparent))] opacity-70 blur-[1px] -z-10" />
              <SmartImage
                src="/assets/img/new_slider/child-making-robot.jpg"
                fallback="/assets/img/new_slider/father-son-making-robot.jpg"
                initials="TS"
                alt="Student building a robotics project at TechStar Innovation Hub"
                loading="eager"
                wrapperClassName="rounded-[1.85rem] aspect-4/5"
                className="size-full object-cover"
              />

              {/* Live impact chip */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-10 bottom-16 flex items-center gap-3 rounded-2xl border border-white/20 bg-navy-950/70 px-4 py-3 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,.9)]"
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqua-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-aqua-400" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/50">
                    Live impact
                  </span>
                  <span className="text-sm font-bold text-white">3,500+ students trained</span>
                </span>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={reduced ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -right-8 top-10 flex items-center gap-2.5 rounded-2xl border border-white/20 bg-ember-500/90 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(247,146,30,.9)] backdrop-blur-xl"
              >
                <Icon.robot className="size-5 text-white" />
                <span className="flex flex-col leading-tight text-white">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] opacity-75">
                    Hands-on
                  </span>
                  <span className="text-sm font-bold">Robotics & IoT</span>
                </span>
              </motion.div>
            </div>
          </TiltCard>

          {/* Orbiting accent ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-14 -z-10 size-64 animate-spin-slow rounded-full border border-dashed border-white/12"
          />
        </motion.div>
      </div>

      {/* Quick facts rail */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-950/55 backdrop-blur-xl">
        <div className="shell grid grid-cols-3 divide-x divide-white/10">
          {quickFacts.map((fact) => {
            const Glyph = Icon[fact.icon]
            return (
              <div key={fact.label} className="flex items-center justify-center gap-3 py-4 sm:py-5">
                <Glyph className="hidden size-5 shrink-0 text-ember-400 sm:block" />
                <span className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-display text-lg font-extrabold text-white sm:text-xl">
                    {fact.value}
                  </span>
                  <span className="text-[0.7rem] text-navy-100/60 sm:text-[0.8rem]">{fact.label}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
