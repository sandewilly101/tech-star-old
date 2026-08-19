import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { services } from '@/data/content'
import { IconTile, SectionHeading } from '@/components/ui/Atoms'
import { SpotlightCard } from '@/components/ui/Cards'
import { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'

/** Six-service grid — the core of what TechStar offers. */
export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-canvas py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-ember-500/6 blur-[130px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="What we do"
          eyebrowIcon={Icon.layers}
          title="Practical services, built for real classrooms"
          accent="real classrooms"
          subtitle="Hands-on technology services and training for learners, schools and communities across Tanzania."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Glyph = Icon[service.icon]
            return (
              <motion.div key={service.title} variants={revealItem} className="h-full">
                <SpotlightCard glow={service.accent} className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <IconTile icon={Glyph} accent={service.accent} size="lg" />
                    <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[1.15rem] font-extrabold leading-snug text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
                    {service.description}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] font-bold text-ember-600 opacity-0 transition-all duration-400 group-hover:opacity-100 dark:text-ember-400">
                    Learn more
                    <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button to="/contact" variant="navy" size="lg" icon={Icon.arrowRight}>
            Request a service
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
