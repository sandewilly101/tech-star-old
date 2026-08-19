import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { programs } from '@/data/programs'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Chip } from '@/components/ui/Cards'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import SmartImage from '@/components/ui/SmartImage'
import Button from '@/components/ui/Button'
import CtaBand from '@/components/sections/CtaBand'
import PartnersMarquee from '@/components/sections/PartnersMarquee'

export default function Programs() {
  useSeo({
    title: 'Programs',
    description:
      'Five hands-on TechStar bootcamps in STEM, IoT and robotics — for learners of all ages, school children, teachers, youth and girls in STEM.',
    path: '/programs',
  })

  return (
    <>
      <PageHero
        eyebrow="Our programmes"
        eyebrowIcon={Icon.rocket}
        title="Five bootcamps, one mission"
        accent="one mission"
        subtitle="Every track is hands-on and kit-supported, designed around the learners in front of us — from primary-school beginners to the teachers who will carry it forward."
        image="/assets/img/Projects/bootcamp.JPG"
        fallback="/assets/img/Projects/bootcamp1.JPG"
        initials="TS"
        breadcrumbs={[{ label: 'Programs' }]}
      />

      <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-ember-500/6 blur-[130px]"
        />

        <div className="shell relative">
          <RevealGroup className="grid gap-8 lg:gap-10">
            {programs.map((program, index) => {
              const flipped = index % 2 === 1
              return (
                <motion.article
                  key={program.slug}
                  variants={revealItem}
                  className="group relative grid overflow-hidden rounded-[2rem] border border-hairline bg-surface transition-all duration-500 hover:border-ember-500/40 hover:shadow-[0_36px_90px_-44px_rgba(7,6,64,.45)] lg:grid-cols-2"
                >
                  <div className={`relative overflow-hidden ${flipped ? 'lg:order-2' : ''}`}>
                    <SmartImage
                      src={program.image}
                      fallback={program.fallback}
                      initials={program.initials}
                      alt={program.title}
                      wrapperClassName="aspect-16/10 lg:h-full lg:aspect-auto lg:min-h-[24rem]"
                      className="size-full object-cover transition-transform duration-[1.1s] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/25"
                    />
                    <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-2xl bg-navy-950/70 font-mono text-sm font-bold text-ember-400 backdrop-blur-md">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap gap-2">
                      <Chip icon={Icon.users} tone="accent">
                        {program.audience}
                      </Chip>
                      <Chip icon={Icon.clock}>{program.duration}</Chip>
                      <Chip icon={Icon.sparkle}>{program.format}</Chip>
                    </div>

                    <h2 className="mt-6 text-2xl font-extrabold leading-tight text-ink sm:text-[1.85rem]">
                      {program.title}
                    </h2>

                    <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft">{program.excerpt}</p>

                    <ul className="mt-6 grid gap-2.5">
                      {program.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5 text-[0.9rem] text-ink-soft">
                          <Icon.check className="mt-0.5 size-4 shrink-0 text-ember-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button to={`/programs/${program.slug}`} icon={Icon.arrowRight}>
                        Programme details
                      </Button>
                      <Button to="/contact" variant="outline" icon={Icon.message} iconPosition="left">
                        Enquire
                      </Button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <PartnersMarquee compact />
      <CtaBand
        eyebrow="Next cohort"
        title="Not sure which bootcamp fits your learners?"
        copy="Tell us who you are teaching and where you are, and our team will help you pick the right track — or design a custom cohort for your school."
        primary={{ label: 'Talk to our team', to: '/contact' }}
        secondary={{ label: 'Browse courses', to: '/courses' }}
      />
    </>
  )
}
