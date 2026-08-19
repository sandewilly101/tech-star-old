import { motion } from 'motion/react'
import { stats } from '@/data/content'
import { Counter } from '@/components/ui/Atoms'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'

/**
 * Impact figures set as an editorial run of oversized numerals divided by
 * hairlines — no cards, no icon tiles. The numbers carry the section.
 */
export default function StatsBand({ className = '' }) {
  return (
    <section className={`relative bg-canvas pb-16 pt-20 lg:pb-20 lg:pt-28 ${className}`}>
      <div className="shell">
        <RevealGroup className="grid gap-y-12 border-t border-hairline pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={revealItem}
              className={`group relative px-0 lg:px-9 ${
                index !== 0 ? 'lg:border-l lg:border-hairline' : ''
              } ${index === 0 ? 'lg:pl-0' : ''}`}
            >
              <p className="font-display text-[3.4rem] font-semibold leading-[0.85] tracking-[-0.05em] text-ink lg:text-[4.6rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-10 origin-left bg-ember-500 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-[3.5]"
              />
              <p className="mt-4 max-w-[18ch] text-[0.92rem] leading-[1.6] text-ink-soft">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
