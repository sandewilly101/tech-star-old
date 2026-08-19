import { Icon } from '@/lib/icons'
import { stats } from '@/data/content'
import { Counter } from '@/components/ui/Atoms'
import { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { motion } from 'motion/react'

/** Impact numbers that count up as the band scrolls into view. */
export default function StatsBand({ className = '' }) {
  return (
    <section className={`relative -mt-px bg-canvas pb-6 pt-16 lg:pb-8 lg:pt-20 ${className}`}>
      <div className="shell">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Glyph = Icon[stat.icon]
            return (
              <motion.div
                key={stat.label}
                variants={revealItem}
                className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-[0_28px_60px_-30px_rgba(7,6,64,.4)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 size-24 rounded-full bg-ember-500/8 blur-2xl transition-all duration-500 group-hover:bg-ember-500/18"
                />
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Glyph className="size-5" />
                </span>
                <p className="mt-6 font-display text-4xl font-extrabold leading-none text-ink lg:text-[2.75rem]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2.5 text-[0.9rem] font-medium text-ink-muted">{stat.label}</p>
              </motion.div>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
