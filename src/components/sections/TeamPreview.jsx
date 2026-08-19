import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon, SocialIcon } from '@/lib/icons'
import { leader, team } from '@/data/team'
import { SectionHeading } from '@/components/ui/Atoms'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'

export function MemberCard({ member }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-ember-500/40 hover:shadow-[0_32px_70px_-34px_rgba(7,6,64,.45)]">
      <div className="relative overflow-hidden">
        <SmartImage
          src={member.image}
          fallback={member.fallback}
          initials={member.initials}
          alt={member.name}
          wrapperClassName="aspect-4/5"
          className="size-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Social rail slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 p-4 transition-transform duration-500 group-hover:translate-y-0">
          {Object.entries(member.socials ?? {}).map(([key, href]) => {
            const SocialGlyph = SocialIcon[key]
            if (!SocialGlyph) return null
            return (
              <a
                key={key}
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer noopener"
                aria-label={`${member.name} on ${key}`}
                className="grid size-9 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition-colors hover:bg-ember-500 hover:border-ember-500"
              >
                <SocialGlyph className="size-3.5" />
              </a>
            )
          })}
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-base font-extrabold text-ink transition-colors duration-300 group-hover:text-ember-600 dark:group-hover:text-ember-400">
          {member.name}
        </h3>
        <p className="mt-1.5 text-[0.83rem] leading-snug text-ink-muted">{member.role}</p>
      </div>
    </article>
  )
}

/** Founder spotlight plus the first two co-founders. */
export default function TeamPreview() {
  const featured = team.slice(0, 2)

  return (
    <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 size-[30rem] rounded-full bg-ember-500/8 blur-[130px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Meet the team"
          eyebrowIcon={Icon.users}
          title="The people building TechStar"
          accent="building TechStar"
          subtitle="A diverse team bringing deep industry knowledge, creative vision and a shared commitment to shaping the future of technology in Tanzania."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Founder spotlight */}
          <Reveal direction="right" className="lg:col-span-6">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-surface sm:flex-row">
              <div className="relative sm:w-[45%]">
                <SmartImage
                  src={leader.image}
                  fallback={leader.fallback}
                  initials={leader.initials}
                  alt={leader.name}
                  wrapperClassName="h-full min-h-64"
                  className="size-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ember-500 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                  <Icon.star className="size-3 fill-current" />
                  {leader.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center p-7 sm:p-8">
                <h3 className="text-xl font-extrabold text-ink">{leader.name}</h3>
                <p className="mt-1.5 text-[0.85rem] font-semibold text-ember-600 dark:text-ember-400">
                  {leader.role}
                </p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">{leader.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {leader.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1 text-[0.72rem] font-semibold text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  {Object.entries(leader.socials).map(([key, href]) => {
                    const SocialGlyph = SocialIcon[key]
                    if (!SocialGlyph) return null
                    return (
                      <a
                        key={key}
                        href={href}
                        aria-label={`${leader.name} on ${key}`}
                        className="grid size-9 place-items-center rounded-full border border-hairline text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                      >
                        <SocialGlyph className="size-3.5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </article>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
            {featured.map((member) => (
              <motion.div key={member.name} variants={revealItem}>
                <MemberCard member={member} />
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button to="/team" variant="outline" size="lg" icon={Icon.arrowRight}>
            Meet the full team
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
