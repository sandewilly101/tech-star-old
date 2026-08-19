import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { events } from '@/data/content'
import { SectionHeading } from '@/components/ui/Atoms'
import { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

export function EventCard({ event, featured = false }) {
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[1.75rem] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-[0_32px_74px_-36px_rgba(7,6,64,.45)] ${
        featured ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-[46%]' : ''}`}>
        <SmartImage
          src={event.image}
          fallback={event.fallback}
          initials={event.initials}
          alt={event.title}
          wrapperClassName={featured ? 'aspect-16/10 lg:h-full lg:aspect-auto lg:min-h-72' : 'aspect-16/10'}
          className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/75 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ember-300 backdrop-blur-md">
          <Icon.tag className="size-3" />
          {event.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] font-semibold text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon.calendar className="size-3.5 text-ember-500" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon.mapPin className="size-3.5 text-ember-500" />
            {event.venue}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-extrabold leading-snug text-ink transition-colors duration-300 group-hover:text-ember-600 dark:group-hover:text-ember-400 sm:text-xl">
          {event.title}
        </h3>

        <p className={`mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-soft ${featured ? '' : 'line-clamp-4'}`}>
          {event.description}
        </p>

        <Link
          to="/events"
          className="mt-6 inline-flex w-fit items-center gap-2 text-[0.88rem] font-bold text-ember-600 transition-colors dark:text-ember-400"
        >
          Read more
          <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default function EventsPreview() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
      <div className="shell relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="What's happening"
            eyebrowIcon={Icon.party}
            title="Events, hackathons and community days"
            accent="community days"
            subtitle="In-school workshops, global maker celebrations and hackathons that turn classroom skills into real projects."
            className="max-w-3xl"
          />
          <Reveal direction="left" className="shrink-0">
            <Button to="/events" variant="outline" icon={Icon.arrowRight}>
              All events
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-2">
          {events.map((event) => (
            <motion.div key={event.slug} variants={revealItem} className="h-full">
              <EventCard event={event} />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
