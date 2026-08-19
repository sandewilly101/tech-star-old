import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@/lib/icons'
import { Eyebrow } from '@/components/ui/Atoms'
import { TiltCard } from '@/components/ui/Cards'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

const pillars = [
  { icon: 'code', label: 'Coding' },
  { icon: 'brain', label: 'Artificial Intelligence' },
  { icon: 'wifi', label: 'Internet of Things' },
  { icon: 'robot', label: 'Robotics' },
]

/** "Who we are" — a layered image collage against the mission statement. */
export default function AboutSplit() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yMain = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const ySide = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-canvas py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 size-[32rem] rounded-full bg-plasma-500/6 blur-[120px]"
      />

      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Media collage */}
        <div className="relative order-1 lg:order-2">
          <motion.div style={{ y: yMain }}>
            <TiltCard strength={6}>
              <div className="relative overflow-hidden rounded-[2rem] border border-hairline shadow-[0_40px_90px_-40px_rgba(7,6,64,.5)]">
                <SmartImage
                  src="/assets/img/about.jpg"
                  fallback="/assets/img/about-3.jpg"
                  initials="TS"
                  alt="Students learning at the TechStar Innovation Hub makerspace"
                  wrapperClassName="aspect-4/3"
                  className="size-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-navy-950/85 to-transparent"
                />
                <div className="absolute inset-x-0 top-0 p-6">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ember-400">
                    Our makerspace
                  </span>
                  <p className="mt-1 font-display text-xl font-extrabold text-white">Innovation in action</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Secondary frame */}
          <motion.div
            style={{ y: ySide }}
            className="absolute -bottom-12 -left-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-canvas shadow-[0_28px_60px_-24px_rgba(7,6,64,.55)] sm:block lg:-left-12 lg:w-56"
          >
            <SmartImage
              src="/assets/img/Projects/bootcamp.JPG"
              fallback="/assets/img/12.jpeg"
              initials="TS"
              alt="A TechStar bootcamp session in progress"
              wrapperClassName="aspect-square"
              className="size-full object-cover"
            />
          </motion.div>

          {/* Floating years badge */}
          <div className="absolute -right-3 -top-6 grid size-24 place-items-center rounded-full border border-hairline bg-surface text-center shadow-[0_20px_46px_-20px_rgba(7,6,64,.45)] lg:-right-8 lg:size-28">
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl font-extrabold text-ember-500 lg:text-3xl">100%</span>
              <span className="mt-1 px-2 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Hands-on
              </span>
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <Eyebrow icon={Icon.sparkle}>Who we are</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[3rem]">
              Building Tanzania's next generation of{' '}
              <span className="text-gradient">innovators</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-soft">
              TechStar Innovation Hub is Tanzania's forward-thinking platform for the next generation of
              innovators — offering hands-on STEM education in coding, Artificial Intelligence and the
              Internet of Things across rural and underserved communities.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
              We enable learners to transform their best ideas into creative solutions that bring about
              positive, lasting change.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Glyph = Icon[pillar.icon]
                return (
                  <li
                    key={pillar.label}
                    className="group flex items-center gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-3.5 transition-colors duration-300 hover:border-ember-500/40 hover:bg-ember-500/5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ember-500/12 text-ember-600 transition-transform duration-500 group-hover:scale-110 dark:text-ember-400">
                      <Glyph className="size-4" />
                    </span>
                    <span className="text-sm font-bold text-ink">{pillar.label}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button to="/about" icon={Icon.arrowRight}>
                About Us
              </Button>
              <Button to="/contact" variant="outline" icon={Icon.message} iconPosition="left">
                Talk to us
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
