import { motion } from 'motion/react'
import { Icon } from '@/lib/icons'
import { approach } from '@/data/content'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { IconTile, SectionHeading } from '@/components/ui/Atoms'
import { SpotlightCard, TiltCard } from '@/components/ui/Cards'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import StatsBand from '@/components/sections/StatsBand'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import Testimonials from '@/components/sections/Testimonials'
import PartnersMarquee from '@/components/sections/PartnersMarquee'
import CtaBand from '@/components/sections/CtaBand'

const values = [
  {
    title: 'Mission',
    icon: 'target',
    accent: 'ember',
    body: 'To empower the next generation of innovators through hands-on STEM education in coding, AI and IoT — reaching the learners that formal systems reach last.',
  },
  {
    title: 'Vision',
    icon: 'lightbulb',
    accent: 'ember',
    body: 'A Tanzania where every young person, wherever they live, can turn an idea into a working solution for their own community.',
  },
  {
    title: 'Belief',
    icon: 'star',
    accent: 'ember',
    body: 'The future belongs to the innovators. We nurture young minds to become the tech and business leaders of tomorrow.',
  },
]

export default function About() {
  useSeo({
    title: 'About Us',
    description:
      'TechStar Innovation Hub empowers the next generation of innovators through STEM education in coding, Artificial Intelligence and the Internet of Things across Tanzania.',
    path: '/about',
    image: '/assets/img/about.jpg',
  })

  return (
    <>
      <PageHero
        eyebrow="About us"
        eyebrowIcon={Icon.sparkle}
        title="The future belongs to the innovators"
        accent="the innovators"
        subtitle="Welcome to TechStar Innovation Hub — a forward-thinking, dynamic platform dedicated to empowering the next generation through STEM education in coding, Artificial Intelligence and the Internet of Things."
        image="/assets/img/about-4.JPG"
        fallback="/assets/img/about-3.jpg"
        initials="TS"
        breadcrumbs={[{ label: 'About' }]}
      >
        <div className="flex flex-wrap gap-3.5">
          <Button to="/programs" size="lg" icon={Icon.arrowRight}>
            Our programmes
          </Button>
          <Button to="/contact" size="lg" variant="glass" icon={Icon.message} iconPosition="left">
            Partner with us
          </Button>
        </div>
      </PageHero>

      {/* Who we are */}
      <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/4 size-[32rem] rounded-full bg-ember-500/7 blur-[130px]"
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/25 bg-ember-500/8 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-700 dark:text-ember-300">
                <Icon.compass className="size-3.5" />
                Who we are
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
                Nurturing young minds into the leaders of{' '}
                <span className="text-gradient">tomorrow</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-soft">
                TechStar Innovation Hub is a forward-thinking platform empowering the next generation of
                innovators through STEM education in coding, AI and the Internet of Things across
                Tanzania's rural and underserved communities.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
                We enable learners to transform their best ideas into creative solutions that bring about
                positive change with local and national impact.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 rounded-3xl border border-hairline bg-surface-2 p-7">
                <Icon.quote className="size-7 text-ember-500/40" />
                <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">
                  "We specialise in leveraging technology to solve real-world problems — from STEM and
                  IoT-Robotics bootcamps to teacher training and community hackathons."
                </p>
                <p className="mt-3 text-sm font-semibold text-ink-muted">Our expertise, in one line</p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left">
            <TiltCard strength={6} className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-hairline shadow-[0_44px_100px_-45px_rgba(7,6,64,.5)]">
                <SmartImage
                  src="/assets/img/12.jpeg"
                  fallback="/assets/img/bootcamp.jpeg"
                  initials="TS"
                  alt="TechStar learners collaborating on a project"
                  wrapperClassName="aspect-4/5"
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute -bottom-7 -left-4 flex items-center gap-3.5 rounded-2xl border border-hairline bg-surface px-5 py-4 shadow-[0_26px_60px_-26px_rgba(7,6,64,.45)] sm:-left-8">
                <span className="grid size-11 place-items-center rounded-xl bg-ember-500/12 text-ember-600 dark:text-ember-400">
                  <Icon.globe className="size-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-base font-extrabold text-ink">Rural-first</span>
                  <span className="text-[0.78rem] text-ink-muted">Where the need is greatest</span>
                </span>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision / belief */}
      <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="What drives us"
            eyebrowIcon={Icon.target}
            title="Mission, vision and the belief underneath both"
            accent="the belief"
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Glyph = Icon[value.icon]
              return (
                <motion.div key={value.title} variants={revealItem} className="h-full">
                  <SpotlightCard glow={value.accent} className="h-full p-8">
                    <IconTile icon={Glyph} accent={value.accent} size="lg" />
                    <h3 className="mt-7 text-xl font-extrabold text-ink">{value.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{value.body}</p>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <StatsBand className="!py-20 lg:!py-24" />

      <ProcessTimeline />

      {/* Approach */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-[0.14]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 size-[32rem] rounded-full bg-ember-500/14 blur-[130px]"
        />
        <div className="shell relative">
          <SectionHeading
            onDark
            eyebrow="Our approach"
            eyebrowIcon={Icon.handshake}
            title="A community-driven answer to rural challenges"
            accent="community-driven"
            subtitle="We work with the people who know the problem best, then build capacity so the solution outlives our involvement."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {approach.map((item, index) => {
              const Glyph = Icon[item.icon]
              return (
                <motion.div
                  key={item.title}
                  variants={revealItem}
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/45 hover:bg-white/8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 size-28 rounded-full bg-ember-500/12 blur-2xl transition-all duration-500 group-hover:bg-ember-500/25"
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Glyph className="size-6" />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-extrabold text-white">{item.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-navy-100/72">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <Testimonials />
      <PartnersMarquee />
      <CtaBand
        eyebrow="Work with us"
        title="Bring TechStar to your school or community"
        copy="Whether you are a school, an NGO or a company that wants to invest in Tanzania's technical future — we would love to design a programme with you."
        primary={{ label: 'Start a conversation', to: '/contact' }}
        secondary={{ label: 'See programmes', to: '/programs' }}
      />
    </>
  )
}
