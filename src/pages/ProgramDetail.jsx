import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { getProgram, programs } from '@/data/programs'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Chip } from '@/components/ui/Cards'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import NotFound from './NotFound'
import CtaBand from '@/components/sections/CtaBand'

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = getProgram(slug)

  useSeo({
    title: program?.title ?? 'Programme',
    description: program?.excerpt,
    path: `/programs/${slug}`,
    image: program?.image,
  })

  if (!program) return <NotFound />

  const others = programs.filter((item) => item.slug !== program.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={program.audience}
        eyebrowIcon={Icon.users}
        title={program.title}
        subtitle={program.excerpt}
        image={program.image}
        fallback={program.fallback}
        initials={program.initials}
        breadcrumbs={[{ label: 'Programs', to: '/programs' }, { label: program.shortTitle }]}
      >
        <div className="flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.78rem] font-semibold text-white backdrop-blur-md">
            <Icon.clock className="size-3.5 text-ember-400" />
            {program.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.78rem] font-semibold text-white backdrop-blur-md">
            <Icon.sparkle className="size-3.5 text-ember-400" />
            {program.format}
          </span>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
        <div className="shell relative grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          {/* Body */}
          <div>
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-hairline shadow-[0_38px_90px_-44px_rgba(7,6,64,.45)]">
                <SmartImage
                  src={program.image}
                  fallback={program.fallback}
                  initials={program.initials}
                  alt={program.title}
                  wrapperClassName="aspect-16/9"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-12 text-2xl font-extrabold leading-tight sm:text-[2rem]">
                More about the {program.shortTitle}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {program.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 40)} delay={0.05 * index}>
                  <p className="text-[1.02rem] leading-relaxed text-ink-soft">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <h3 className="mt-12 text-xl font-extrabold">What learners walk away with</h3>
            </Reveal>

            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2">
              {program.highlights.map((highlight) => (
                <motion.div
                  key={highlight}
                  variants={revealItem}
                  className="group flex items-start gap-3 rounded-2xl border border-hairline bg-surface-2 p-5 transition-colors duration-300 hover:border-ember-500/40 hover:bg-ember-500/5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-600 transition-transform duration-400 group-hover:scale-110 dark:text-ember-400">
                    <Icon.check className="size-3.5" />
                  </span>
                  <span className="text-[0.93rem] font-medium leading-relaxed text-ink">{highlight}</span>
                </motion.div>
              ))}
            </RevealGroup>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-surface">
                <div className="border-b border-hairline bg-surface-2 px-7 py-6">
                  <h3 className="font-display text-lg font-extrabold text-ink">Programme at a glance</h3>
                </div>

                <dl className="divide-y divide-hairline">
                  {[
                    { label: 'Perfect for', value: program.audience, icon: Icon.users },
                    { label: 'Typical length', value: program.duration, icon: Icon.clock },
                    { label: 'Format', value: program.format, icon: Icon.layers },
                    { label: 'Kit included', value: 'Yes — TechStar IoT kit', icon: Icon.chip },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-4 px-7 py-5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-ember-500/12 text-ember-600 dark:text-ember-400">
                        <row.icon className="size-4" />
                      </span>
                      <span>
                        <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                          {row.label}
                        </dt>
                        <dd className="mt-1 text-[0.95rem] font-semibold text-ink">{row.value}</dd>
                      </span>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="noise relative mt-5 overflow-hidden rounded-[1.75rem] bg-navy-950 p-7 text-white">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-ember-500/25 blur-3xl"
                />
                <h3 className="relative text-lg font-extrabold text-white">Interested in this programme?</h3>
                <p className="relative mt-3 text-[0.92rem] leading-relaxed text-navy-100/72">
                  Reach out and our team will help you find the right fit, or tell you about the next
                  available cohort.
                </p>
                <div className="relative mt-6 flex flex-col gap-3">
                  <Button to="/contact" fullWidth icon={Icon.arrowRight}>
                    Contact us
                  </Button>
                  <Button to="/courses" variant="glass" fullWidth icon={Icon.graduation} iconPosition="left">
                    Browse courses
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Other programmes */}
      <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-24">
        <div className="shell relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Other programmes</h2>
              <Link
                to="/programs"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-ember-600 dark:text-ember-400"
              >
                View all
                <Icon.arrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((item) => (
              <motion.div key={item.slug} variants={revealItem}>
                <Link
                  to={`/programs/${item.slug}`}
                  className="group relative block overflow-hidden rounded-[1.5rem] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-ember-500/40 hover:shadow-[0_30px_70px_-34px_rgba(7,6,64,.45)]"
                >
                  <SmartImage
                    src={item.image}
                    fallback={item.fallback}
                    initials={item.initials}
                    alt={item.title}
                    wrapperClassName="aspect-16/10"
                    className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="p-6">
                    <Chip icon={Icon.users}>{item.audience}</Chip>
                    <h3 className="mt-4 text-base font-extrabold leading-snug text-ink transition-colors group-hover:text-ember-600 dark:group-hover:text-ember-400">
                      {item.shortTitle}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember-600 dark:text-ember-400">
                      Explore
                      <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        eyebrow="Enrol now"
        title={`Ready to join the ${program.shortTitle}?`}
        copy="Tell us about your learners and we'll match them to the right cohort, kit and mentor."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'All programmes', to: '/programs' }}
      />
    </>
  )
}
