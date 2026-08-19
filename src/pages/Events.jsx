import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { events } from '@/data/content'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Chip } from '@/components/ui/Cards'
import { SectionHeading } from '@/components/ui/Atoms'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import CtaBand from '@/components/sections/CtaBand'

const workshopHighlights = [
  { icon: 'code', title: 'Coding', body: 'From block-based logic to real syntax, taught through projects.' },
  { icon: 'wifi', title: 'IoT', body: 'Sensors, microcontrollers and connected devices students build themselves.' },
  { icon: 'robot', title: 'Robotics', body: 'Design, assemble and program robots that solve a stated problem.' },
  { icon: 'brain', title: '21st-century skills', body: 'Problem-solving, logical thinking and collaboration under time pressure.' },
]

export default function Events() {
  useSeo({
    title: 'Events',
    description:
      'TechStar in-school STEM and IoT – Robotics workshops, hackathons and community days across Tanzania, including Arduino Day and the TeensInAI hackathon.',
    path: '/events',
  })

  return (
    <>
      <PageHero
        eyebrow="Events"
        eyebrowIcon={Icon.party}
        title="Where classroom skills meet the real world"
        accent="the real world"
        subtitle="Our in-school STEM and IoT – Robotics workshops give students hands-on digital literacy skills: coding, IoT and robotics that build problem-solving, logical thinking and 21st-century skills, aligned with the school curriculum."
        image="/assets/img/IWD_hackathon.jpeg"
        fallback="/assets/img/IWD_hackathon1.jpeg"
        initials="TS"
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* What students get */}
      <section className="relative bg-canvas py-20 lg:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workshopHighlights.map((item) => {
              const Glyph = Icon[item.icon]
              return (
                <motion.div
                  key={item.title}
                  variants={revealItem}
                  className="group rounded-3xl border border-hairline bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-[0_28px_60px_-30px_rgba(7,6,64,.4)]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-ember-500 to-ember-600 text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Glyph className="size-5" />
                  </span>
                  <h3 className="mt-6 text-base font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">{item.body}</p>
                </motion.div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Event log */}
      <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Recent & upcoming"
            eyebrowIcon={Icon.calendar}
            title="Hackathons, maker days and celebrations"
            accent="maker days"
            subtitle="Two-day hackathons, global Arduino celebrations and in-school workshops — every one of them ends with something built."
          />

          <div className="mt-14 space-y-8">
            {events.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.06}>
                <article className="group grid overflow-hidden rounded-[2rem] border border-hairline bg-surface transition-all duration-500 hover:border-ember-500/40 hover:shadow-[0_36px_90px_-44px_rgba(7,6,64,.45)] lg:grid-cols-[0.9fr_1.1fr]">
                  <div className={`relative overflow-hidden ${index % 2 ? 'lg:order-2' : ''}`}>
                    <SmartImage
                      src={event.image}
                      fallback={event.fallback}
                      initials={event.initials}
                      alt={event.title}
                      wrapperClassName="aspect-16/10 lg:h-full lg:aspect-auto lg:min-h-[22rem]"
                      className="size-full object-cover transition-transform duration-[1.1s] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent"
                    />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-navy-950/75 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ember-300 backdrop-blur-md">
                      <Icon.tag className="size-3" />
                      {event.tag}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap gap-2">
                      <Chip icon={Icon.calendar} tone="accent">
                        {event.date}
                      </Chip>
                      <Chip icon={Icon.mapPin}>{event.venue}</Chip>
                    </div>

                    <h2 className="mt-6 text-xl font-extrabold leading-snug text-ink sm:text-2xl">
                      {event.title}
                    </h2>

                    <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft">
                      {event.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button to="/contact" icon={Icon.arrowRight}>
                        Register interest
                      </Button>
                      <Button to="/programs" variant="outline" icon={Icon.rocket} iconPosition="left">
                        Related programmes
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Host an event */}
      <section className="relative bg-canvas py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <div className="grid items-center gap-10 rounded-[2rem] border border-hairline bg-surface p-9 sm:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/25 bg-ember-500/8 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-700 dark:text-ember-300">
                  <Icon.school className="size-3.5" />
                  For schools
                </span>
                <h2 className="mt-6 text-2xl font-extrabold leading-tight sm:text-[2rem]">
                  Bring a TechStar workshop to your school
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
                  We run in-school STEM and IoT – Robotics workshops that slot into your timetable and map
                  onto the school curriculum. We bring the kits, the trainers and the projects — your
                  students bring the ideas.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/contact" size="lg" icon={Icon.arrowRight}>
                    Book a workshop
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-hairline">
                <SmartImage
                  src="/assets/img/arduino_day.JPG"
                  fallback="/assets/img/slide/arduino.png"
                  initials="AD"
                  alt="Arduino Day workshop at Mtwara Technical High School"
                  wrapperClassName="aspect-4/3"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Stay in the loop"
        title="Never miss the next hackathon"
        copy="New bootcamps, workshops and community innovation stories go out to our newsletter subscribers first."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'See programmes', to: '/programs' }}
      />
    </>
  )
}
