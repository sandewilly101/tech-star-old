import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Icon } from '@/lib/icons'
import { services } from '@/data/content'
import { SectionHeading } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Services as an editorial index rather than a card grid: numbered rows, a
 * rule between each, and a preview plate that tracks the cursor across the
 * list. The row itself is the interface — no boxes.
 */
export default function Services() {
  const [active, setActive] = useState(null)
  const reduced = usePrefersReducedMotion()
  const listRef = useRef(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 220, damping: 28, mass: 0.6 })
  const y = useSpring(py, { stiffness: 220, damping: 28, mass: 0.6 })
  // Tilt the plate slightly in the direction of travel.
  const rotate = useTransform(x, [-400, 400], [-7, 7])

  const onMove = (event) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    px.set(event.clientX - rect.left - rect.width / 2)
    py.set(event.clientY - rect.top - 150)
  }

  return (
    <section id="services" className="relative overflow-hidden bg-canvas py-20 lg:py-28">
      <div className="shell relative">
        {/* Heading sits in a narrow editorial column, offset from the list */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              index="01"
              eyebrow="What we do"
              title="Six ways we put technology in people's hands"
              accent="people's hands"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="text-[0.98rem] leading-[1.7] text-ink-soft">
                Training, consulting and hardware — built for Tanzanian classrooms, workshops and
                community projects rather than adapted from somewhere else.
              </p>
              <Button to="/contact" variant="ghost" className="mt-5 px-0" icon={Icon.arrowRight}>
                Request a service
              </Button>
            </Reveal>
          </div>
        </div>

        {/* The index */}
        <div
          ref={listRef}
          onMouseLeave={() => setActive(null)}
          onMouseMove={onMove}
          className="relative mt-12 border-t border-hairline lg:mt-16"
        >
          {/* Cursor-tracking preview */}
          <AnimatePresence>
            {active !== null && !reduced && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ x, y, rotate, left: '50%', top: 0 }}
                className="pointer-events-none absolute z-20 hidden w-72 -translate-x-1/2 overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(7,6,64,.55)] lg:block"
              >
                <img
                  src={services[active].image}
                  alt=""
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {services.map((service, index) => {
            const Glyph = Icon[service.icon]
            const isActive = active === index
            const isDimmed = active !== null && !isActive

            return (
              <Reveal key={service.title} delay={Math.min(index * 0.05, 0.25)} distance={20}>
                <div
                  onMouseEnter={() => setActive(index)}
                  className="group relative border-b border-hairline"
                >
                  {/* Orange wipe that fills the row on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-ember-500/6 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                  />

                  <div
                    className={`relative flex flex-col gap-4 py-7 transition-opacity duration-500 md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-9 lg:py-11 ${
                      isDimmed ? 'opacity-35' : 'opacity-100'
                    }`}
                  >
                    <span className="font-mono text-[0.72rem] tracking-[0.2em] text-ink-muted md:col-span-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="md:col-span-6 lg:col-span-5">
                      <span className="flex items-center gap-4">
                        <Glyph className="size-5 shrink-0 text-ember-500 md:hidden" />
                        <span className="block text-[1.45rem] font-semibold leading-[1.15] text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 sm:text-[1.85rem] lg:text-[2.15rem]">
                          {service.title}
                        </span>
                      </span>
                    </h3>

                    <p className="text-[0.94rem] leading-[1.7] text-ink-soft md:col-span-4 lg:col-span-5">
                      {service.description}
                    </p>

                    <span className="hidden justify-end md:col-span-1 md:flex">
                      <span className="grid size-10 place-items-center rounded-full border border-hairline text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-white">
                        <Icon.arrowUpRight className="size-4" />
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
