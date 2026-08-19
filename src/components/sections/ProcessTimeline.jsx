import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Icon } from '@/lib/icons'
import { processSteps } from '@/data/content'
import { SectionHeading } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'

/**
 * The six building blocks of the programme as a vertical timeline whose spine
 * fills in as the section scrolls past.
 */
export default function ProcessTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 size-[30rem] rounded-full bg-plasma-500/8 blur-[130px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="How it works"
          eyebrowIcon={Icon.compass}
          title="Six building blocks, first workshop to real-world impact"
          accent="real-world impact"
          subtitle="Every learner moves through the same carefully-designed path — and every step is measured, reviewed and improved."
        />

        <div ref={ref} className="relative mt-16 sm:pl-16 lg:pl-0">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[1.4rem] top-3 hidden h-[calc(100%-3rem)] w-0.5 overflow-hidden rounded-full bg-hairline sm:block lg:hidden"
          >
            <motion.div
              style={{ scaleY: spine }}
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--color-ember-500),var(--color-plasma-500))]"
            />
          </div>

          <ol className="grid gap-5 lg:grid-cols-2">
            {processSteps.map((step, index) => {
              const Glyph = Icon[step.icon]
              return (
                <li key={step.title} className="relative">
                  {/* Node — only meaningful on the single-column layout */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-16 top-9 hidden size-4 place-items-center sm:grid lg:hidden"
                  >
                    <span className="absolute inline-flex size-4 animate-pulse-ring rounded-full bg-ember-500/50" />
                    <span className="relative size-3 rounded-full bg-ember-500 ring-4 ring-surface-2" />
                  </span>

                  <Reveal delay={0.04 * index} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-[0_28px_60px_-30px_rgba(7,6,64,.4)] sm:p-8">
                      <span
                        aria-hidden="true"
                        className="absolute -right-8 -top-8 size-28 rounded-full bg-ember-500/6 blur-2xl transition-all duration-500 group-hover:bg-ember-500/16"
                      />

                      <div className="flex items-center justify-between">
                        <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 [&>svg]:size-5">
                          <Glyph />
                        </span>
                        <span className="font-display text-[2.6rem] font-extrabold leading-none text-hairline-strong transition-colors duration-500 group-hover:text-ember-500/40">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-extrabold text-ink">{step.title}</h3>
                      <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
