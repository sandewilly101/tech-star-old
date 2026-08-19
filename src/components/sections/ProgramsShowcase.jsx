import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { programs } from '@/data/programs'
import { SectionHeading } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

/**
 * Expanding-panel gallery on large screens (hover or focus a panel to open it),
 * with a stacked card list on small screens.
 */
export default function ProgramsShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section id="programs" className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-[0.14]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 size-[34rem] rounded-full bg-plasma-500/14 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-[30rem] rounded-full bg-ember-500/14 blur-[130px]"
      />

      <div className="shell relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            onDark
            eyebrow="Our programmes"
            eyebrowIcon={Icon.rocket}
            title="Five bootcamps. One mission."
            accent="One mission."
            subtitle="Every track is hands-on, kit-supported and designed around the learners in front of us — from primary-school beginners to the teachers who will carry it forward."
            className="max-w-3xl"
          />
          <Reveal direction="left" className="shrink-0">
            <Button to="/programs" variant="glass" icon={Icon.arrowRight}>
              All programmes
            </Button>
          </Reveal>
        </div>

        {/* ---------- Desktop: expanding panels ---------- */}
        <div className="mt-14 hidden gap-3 lg:flex lg:h-[30rem]">
          {programs.map((program, index) => {
            const isActive = active === index
            return (
              <motion.div
                key={program.slug}
                onMouseEnter={() => setActive(index)}
                onFocusCapture={() => setActive(index)}
                animate={{ flex: isActive ? 3.4 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/12"
              >
                <SmartImage
                  src={program.image}
                  fallback={program.fallback}
                  initials={program.initials}
                  alt={program.title}
                  wrapperClassName="absolute inset-0 size-full"
                  className={cn(
                    'size-full object-cover transition-all duration-[900ms]',
                    isActive ? 'scale-105 brightness-[.62]' : 'scale-100 brightness-[.42] saturate-[.6]',
                  )}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent"
                />

                {/* Collapsed: vertical label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col items-center justify-end gap-6 pb-8"
                    >
                      <span
                        className="whitespace-nowrap font-display text-base font-extrabold tracking-tight text-white/90"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {program.shortTitle}
                      </span>
                      <span className="font-mono text-[0.7rem] tracking-widest text-ember-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded: full detail */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.42, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0 p-8"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                          <Icon.users className="size-3" />
                          {program.audience}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                          <Icon.clock className="size-3" />
                          {program.duration}
                        </span>
                      </div>

                      <h3 className="mt-4 max-w-lg text-2xl font-extrabold leading-tight text-white xl:text-[1.75rem]">
                        {program.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-navy-100/78 line-clamp-3">
                        {program.excerpt}
                      </p>

                      <Link
                        to={`/programs/${program.slug}`}
                        className="group/link mt-6 inline-flex items-center gap-2.5 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-ember-400 hover:shadow-[0_16px_40px_-14px_var(--color-ember-500)]"
                      >
                        Explore programme
                        <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ---------- Mobile / tablet: snap rail ---------- */}
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {programs.map((program, index) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`}
              className="group relative w-[80vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-[1.5rem] border border-white/12"
            >
              <SmartImage
                src={program.image}
                fallback={program.fallback}
                initials={program.initials}
                alt={program.title}
                wrapperClassName="aspect-4/5"
                className="size-full object-cover brightness-[.6] transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-mono text-[0.7rem] tracking-widest text-ember-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-xl font-extrabold leading-tight text-white">
                  {program.shortTitle}
                </h3>
                <p className="mt-2 text-[0.82rem] text-navy-100/70">{program.audience}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember-400">
                  Explore
                  <Icon.arrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
