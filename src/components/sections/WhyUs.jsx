import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { whyUs } from '@/data/content'
import { IconTile } from '@/components/ui/Atoms'
import { SpotlightCard } from '@/components/ui/Cards'
import { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

const accents = ['ember', 'plasma', 'aqua', 'navy']

/** Bento layout: one tall statement panel beside a grid of differentiators. */
export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 size-[30rem] rounded-full bg-ember-500/8 blur-[120px]"
      />

      <div className="shell relative grid gap-5 lg:grid-cols-12">
        {/* Statement panel */}
        <Reveal direction="right" className="lg:col-span-5">
          <div className="noise relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-950 p-8 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-ember-500/22 blur-[80px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-0 size-56 rounded-full bg-plasma-500/20 blur-[80px]"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ember-300">
                <Icon.shield className="size-3.5" />
                Why choose us
              </span>

              <h2 className="mt-7 text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl">
                Taught by people who have{' '}
                <span className="text-gradient">actually built things</span>
              </h2>

              <p className="mt-5 text-[0.98rem] leading-relaxed text-navy-100/72">
                Our team of experienced educators and industry professionals are passionate about teaching
                and mentoring young tech enthusiasts. They bring real-world experience and expertise to the
                classroom, ensuring high-quality instruction and support.
              </p>
            </div>

            <div className="relative mt-10">
              <div className="mb-8 overflow-hidden rounded-2xl border border-white/12">
                <SmartImage
                  src="/assets/img/Projects/train-trainer.jpeg"
                  fallback="/assets/img/about-4.JPG"
                  initials="TS"
                  alt="TechStar trainers running a workshop"
                  wrapperClassName="aspect-16/9"
                  className="size-full object-cover"
                />
              </div>
              <Button to="/about" variant="glass" icon={Icon.arrowRight}>
                Learn more
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Feature grid */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:content-start">
          {whyUs.map((item, index) => {
            const Glyph = Icon[item.icon]
            return (
              <motion.div key={item.title} variants={revealItem} className="h-full">
                <SpotlightCard glow={accents[index % accents.length]} className="h-full p-7 sm:p-8">
                  <IconTile icon={Glyph} accent={accents[index % accents.length]} />
                  <h3 className="mt-6 text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">{item.description}</p>
                  <span
                    aria-hidden="true"
                    className="mt-6 block h-px w-full bg-gradient-to-r from-hairline to-transparent"
                  />
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-300 group-hover:text-ember-500">
                    0{index + 1}
                    <Icon.arrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
