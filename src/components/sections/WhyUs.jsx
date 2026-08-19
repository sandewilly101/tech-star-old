import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { whyUs } from '@/data/content'
import { Eyebrow } from '@/components/ui/Atoms'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

/**
 * Light section, in keeping with the rest of the site. The four
 * differentiators are set as a ruled 2×2 of plain text against a statement
 * column — no cards and no icon tiles, so the type and spacing do the work.
 */
export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 size-[38rem] rounded-full bg-ember-500/7 blur-[140px]"
      />

      <div className="shell relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Statement */}
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="02">Why choose us</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-7 max-w-[16ch] text-[2.1rem] font-semibold sm:text-[2.8rem] lg:text-[3.4rem]">
              Taught by people who have actually{' '}
              <span className="text-ember-500">built things</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[42ch] text-[1rem] leading-[1.7] text-ink-soft">
              Our educators and industry professionals bring real engineering experience into the
              classroom — not theory borrowed from a textbook.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 overflow-hidden rounded-2xl">
              <SmartImage
                src="/assets/img/Projects/train-trainer.jpeg"
                fallback="/assets/img/about-4.JPG"
                initials="TS"
                alt="TechStar trainers running a workshop"
                wrapperClassName="aspect-16/10"
                className="size-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <Button to="/about" variant="outline" className="mt-8" icon={Icon.arrowRight}>
              More about us
            </Button>
          </Reveal>
        </div>

        {/* Ruled 2×2 */}
        <RevealGroup className="grid gap-x-12 border-t border-hairline sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:border-t-0">
          {whyUs.map((item, index) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              className="group border-b border-hairline py-9 sm:py-12"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ember-500">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-5 text-[1.35rem] font-semibold leading-tight text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5 sm:text-[1.5rem]">
                {item.title}
              </h3>

              <p className="mt-4 max-w-[36ch] text-[0.93rem] leading-[1.7] text-ink-soft">
                {item.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
