import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { Aurora, Eyebrow } from '@/components/ui/Atoms'
import { RevealText } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'
import SmartImage from '@/components/ui/SmartImage'

/**
 * Shared masthead for every inner page: parallax photo, brand aurora,
 * breadcrumb trail and an animated headline.
 */
export default function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  accent,
  subtitle,
  image,
  fallback,
  initials = 'TS',
  breadcrumbs = [],
  children,
  align = 'left',
  compact = false,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])

  const centered = align === 'center'
  const parts = accent && typeof title === 'string' ? title.split(accent) : null

  return (
    <section
      ref={ref}
      className={cn(
        'noise relative isolate overflow-hidden bg-navy-950 text-white',
        compact ? 'pb-16 pt-20 lg:pb-20 lg:pt-28' : 'pb-24 pt-24 lg:pb-32 lg:pt-36',
      )}
    >
      {image && (
        <motion.div style={{ y, scale }} className="absolute inset-0 -z-20">
          <SmartImage
            src={image}
            fallback={fallback}
            initials={initials}
            alt=""
            loading="eager"
            wrapperClassName="size-full"
            className="size-full object-cover"
          />
        </motion.div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,var(--color-navy-950)_8%,color-mix(in_srgb,var(--color-navy-950)_86%,transparent)_45%,color-mix(in_srgb,var(--color-navy-900)_60%,transparent)_100%)]"
      />
      <Aurora intensity="soft" className="-z-10 opacity-60" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-[0.14]" />

      <motion.div style={{ opacity: fade }} className="shell relative">
        {breadcrumbs.length > 0 && (
          <Reveal direction="down" duration={0.5}>
            <nav
              aria-label="Breadcrumb"
              className={cn(
                'mb-7 flex flex-wrap items-center gap-2 text-[0.8rem] text-navy-100/60',
                centered && 'justify-center',
              )}
            >
              <Link to="/" className="transition-colors hover:text-ember-400">
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  <Icon.chevronRight className="size-3 text-navy-100/35" />
                  {crumb.to && index < breadcrumbs.length - 1 ? (
                    <Link to={crumb.to} className="transition-colors hover:text-ember-400">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="truncate text-white/85">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <div className={cn('flex max-w-3xl flex-col gap-6', centered && 'mx-auto items-center text-center')}>
          {eyebrow && (
            <Reveal direction="up" duration={0.55}>
              <Eyebrow icon={eyebrowIcon} onDark>
                {eyebrow}
              </Eyebrow>
            </Reveal>
          )}

          {parts && parts.length > 1 ? (
            <Reveal direction="up" delay={0.05}>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]">
                {parts[0]}
                <span className="text-gradient">{accent}</span>
                {parts.slice(1).join(accent)}
              </h1>
            </Reveal>
          ) : (
            <RevealText
              as="h1"
              text={title}
              className="text-balance text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]"
            />
          )}

          {subtitle && (
            <Reveal direction="up" delay={0.15}>
              <p className="max-w-2xl text-[1.02rem] leading-relaxed text-navy-100/75">{subtitle}</p>
            </Reveal>
          )}

          {children && (
            <Reveal direction="up" delay={0.22} className={cn('mt-2', centered && 'flex justify-center')}>
              {children}
            </Reveal>
          )}
        </div>
      </motion.div>

      {/* Soft transition into the page body */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-b from-transparent to-canvas"
      />
    </section>
  )
}
