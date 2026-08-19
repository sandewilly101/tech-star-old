import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon, SocialIcon } from '@/lib/icons'
import { leader, team, teamStats } from '@/data/team'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Counter, SectionHeading } from '@/components/ui/Atoms'
import { MemberCard } from '@/components/sections/TeamPreview'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import CtaBand from '@/components/sections/CtaBand'

const GROUPS = ['All', 'Leadership', 'Advisory Board']

export default function Team() {
  const [group, setGroup] = useState('All')

  useSeo({
    title: 'Our Team',
    description:
      'Meet the passionate minds driving innovation at TechStar Innovation Hub — founders, leadership and an advisory board spanning engineering, education and research.',
    path: '/team',
  })

  const visible = useMemo(
    () => (group === 'All' ? team : team.filter((member) => member.group === group)),
    [group],
  )

  return (
    <>
      <PageHero
        eyebrow="Our team"
        eyebrowIcon={Icon.users}
        title="Every role. One mission."
        accent="One mission."
        subtitle="Meet the passionate minds driving innovation and growth at TechStar. Our diverse team brings together deep industry knowledge, creative vision and a shared commitment to shaping the future of technology and entrepreneurship."
        image="/assets/img/Projects/youth-stem.jpeg"
        fallback="/assets/img/Projects/youth-stem1.jpeg"
        initials="TS"
        breadcrumbs={[{ label: 'Team' }]}
      >
        <div className="flex flex-wrap gap-3">
          {teamStats.map((stat) => (
            <span
              key={stat.label}
              className="inline-flex items-baseline gap-2 rounded-2xl border border-white/18 bg-white/8 px-5 py-3 backdrop-blur-md"
            >
              <span className="font-display text-2xl font-extrabold text-ember-400">
                <Counter value={stat.value} />
              </span>
              <span className="text-[0.82rem] text-navy-100/70">{stat.label}</span>
            </span>
          ))}
        </div>
      </PageHero>

      {/* Founder spotlight */}
      <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 size-[32rem] rounded-full bg-ember-500/7 blur-[130px]"
        />
        <div className="shell relative">
          <SectionHeading
            align="left"
            eyebrow="Leadership"
            eyebrowIcon={Icon.star}
            title="The founder behind the vision"
            accent="the vision"
          />

          <Reveal delay={0.08} className="mt-12">
            <article className="grid overflow-hidden rounded-[2rem] border border-hairline bg-surface lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-80">
                <SmartImage
                  src={leader.image}
                  fallback={leader.fallback}
                  initials={leader.initials}
                  alt={leader.name}
                  wrapperClassName="h-full min-h-80"
                  className="size-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/20"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ember-500 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
                  <Icon.star className="size-3 fill-current" />
                  {leader.badge}
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">{leader.name}</h3>
                <p className="mt-2 text-[0.95rem] font-semibold text-ember-600 dark:text-ember-400">
                  {leader.role}
                </p>
                <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">{leader.bio}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {leader.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline bg-surface-2 px-4 py-1.5 text-[0.78rem] font-semibold text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-2.5">
                  {Object.entries(leader.socials).map(([key, href]) => {
                    const SocialGlyph = SocialIcon[key]
                    if (!SocialGlyph) return null
                    return (
                      <a
                        key={key}
                        href={href}
                        aria-label={`${leader.name} on ${key}`}
                        className="grid size-10 place-items-center rounded-full border border-hairline text-ink-soft transition-all duration-300 hover:-translate-y-1 hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                      >
                        <SocialGlyph className="size-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Everyone else */}
      <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="The rest of the team"
            eyebrowIcon={Icon.users}
            title="Engineers, educators and advisors"
            accent="advisors"
            subtitle="From finance and technology to research and consulting — the people who make every cohort possible."
          />

          <Reveal delay={0.08} className="mt-10 flex justify-center">
            <div className="inline-flex gap-1 rounded-full border border-hairline bg-surface p-1.5">
              {GROUPS.map((item) => {
                const isActive = group === item
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGroup(item)}
                    className={cn(
                      'relative rounded-full px-5 py-2.5 text-[0.85rem] font-bold transition-colors duration-300',
                      isActive ? 'text-white' : 'text-ink-soft hover:text-ember-600 dark:hover:text-ember-400',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="team-filter"
                        className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,var(--color-navy-900),var(--color-navy-700))]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((member, index) => (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="relative bg-canvas py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-hairline bg-surface p-10 text-center sm:p-14">
              <span className="grid size-16 place-items-center rounded-2xl bg-ember-500/10 text-ember-500">
                <Icon.briefcase className="size-7" />
              </span>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Want to join our mission?</h2>
              <p className="max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                We're always looking for educators, creators and engineers who care about impact as much
                as innovation.
              </p>
              <Button to="/contact" size="lg" icon={Icon.arrowRight}>
                Contact us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Collaborate"
        title="Build the next generation with us"
        copy="Schools, NGOs, companies and individual mentors — there is a way for you to plug into what TechStar is building."
        primary={{ label: 'Get in touch', to: '/contact' }}
        secondary={{ label: 'See our work', to: '/programs' }}
      />
    </>
  )
}
