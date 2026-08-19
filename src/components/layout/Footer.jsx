import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Icon, SocialIcon } from '@/lib/icons'
import { site, socials } from '@/data/site'
import { programs } from '@/data/programs'
import { services } from '@/data/content'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Reveal from '@/components/ui/Reveal'
import Logo from '@/components/ui/Logo'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Our team', to: '/team' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
      {children}
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-start gap-2 text-[0.9rem] leading-relaxed text-navy-100/65 transition-colors hover:text-ember-400"
      >
        <Icon.chevronRight className="mt-1 size-3 shrink-0 text-ember-500/60 transition-transform duration-300 group-hover:translate-x-0.5" />
        <span>{children}</span>
      </Link>
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="noise relative isolate overflow-hidden bg-navy-950 text-navy-100">
      {/* Ambient brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 size-[34rem] rounded-full bg-ember-500/12 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-ember-600/12 blur-[130px]" />
        <div className="grid-lines absolute inset-0 opacity-[0.18]" />
      </div>

      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="shell py-16 lg:py-20">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-300 backdrop-blur">
              <Icon.send className="size-3.5" />
              Newsletter
            </span>
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Stay connected with <span className="text-gradient">TechStar</span>
            </h2>
            <p className="max-w-xl text-[0.98rem] leading-relaxed text-navy-100/70">
              Be the first to hear about new bootcamps, workshops and community innovation stories from
              across Tanzania.
            </p>
            <NewsletterForm className="max-w-xl" variant="dark" />
            <p className="text-xs text-navy-100/45">We respect your privacy. Unsubscribe at any time.</p>
          </Reveal>
        </div>
      </div>

      {/* Link grid */}
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="TechStar Innovation Hub — home" className="inline-flex">
            <Logo size="lg" onDark />
          </Link>

          <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-navy-100/65">
            Tanzania's forward-thinking platform for the next generation of innovators — hands-on STEM
            education in coding, AI and the Internet of Things.
          </p>

          <ul className="mt-7 space-y-3.5 text-[0.9rem]">
            <li className="flex items-start gap-3">
              <Icon.mapPin className="mt-0.5 size-4 shrink-0 text-ember-400" />
              <span className="text-navy-100/70">{site.locations.join(' · ')}</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon.phone className="mt-0.5 size-4 shrink-0 text-ember-400" />
              <span className="flex flex-col text-navy-100/70">
                {site.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-ember-400"
                  >
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Icon.mail className="mt-0.5 size-4 shrink-0 text-ember-400" />
              <a href={`mailto:${site.email}`} className="text-navy-100/70 transition-colors hover:text-ember-400">
                {site.email}
              </a>
            </li>
          </ul>

          <div className="mt-7 flex gap-2.5">
            {socials.map((social) => {
              const SocialGlyph = SocialIcon[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className={cn(
                    'group grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-navy-100/80',
                    'transition-all duration-300 hover:-translate-y-1 hover:border-ember-500 hover:bg-ember-500 hover:text-white',
                  )}
                >
                  <SocialGlyph className="size-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <FooterColumn title="Explore">
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Programs">
            <ul className="space-y-3">
              {programs.map((program) => (
                <FooterLink key={program.slug} to={`/programs/${program.slug}`}>
                  {program.shortTitle}
                </FooterLink>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Our services">
            <ul className="space-y-3">
              {services.map((service) => (
                <FooterLink key={service.title} to="/#services">
                  {service.title}
                </FooterLink>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-center text-[0.82rem] text-navy-100/50 sm:flex-row sm:text-left">
          <p>
            © {year} <span className="font-semibold text-navy-100/80">{site.name}</span>. All rights
            reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            <Icon.sparkle className="size-3.5 text-ember-500" />
            Built for Tanzania's next generation of innovators.
          </p>
        </div>
      </div>
    </footer>
  )
}
