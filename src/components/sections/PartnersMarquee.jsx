import { Icon } from '@/lib/icons'
import { partners } from '@/data/content'
import { Marquee } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'
import SmartImage from '@/components/ui/SmartImage'

/** Continuous partner-logo rail. */
export default function PartnersMarquee({ compact = false }) {
  const logos = partners.map((partner) => (
    <a
      key={partner.name}
      href={partner.href}
      target={partner.href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer noopener"
      title={partner.name}
      className="group flex h-16 w-36 shrink-0 items-center justify-center sm:w-44"
    >
      <SmartImage
        src={partner.logo}
        initials={partner.name.slice(0, 2).toUpperCase()}
        alt={partner.name}
        wrapperClassName="h-full w-full"
        className="size-full object-contain opacity-55 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-70 dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
      />
    </a>
  ))

  return (
    <section className={`relative overflow-hidden border-y border-hairline bg-surface-2 ${compact ? 'py-10' : 'py-14 lg:py-16'}`}>
      <div className="shell">
        <Reveal className="mb-9 flex flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink-muted">
            <Icon.handshake className="size-3.5 text-ember-500" />
            Trusted by schools, NGOs and global STEM programmes
          </span>
        </Reveal>
      </div>

      <Marquee speed={38}>{logos}</Marquee>
    </section>
  )
}
