import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon, SocialIcon } from '@/lib/icons'
import { navLinks } from '@/data/nav'
import { site, socials } from '@/data/site'
import { useTheme } from '@/hooks/useTheme'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import Logo from '@/components/ui/Logo'

function ThemeToggle({ className }) {
  const { isDark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-hairline bg-surface-2 text-ink transition-colors hover:border-ember-500/60 hover:text-ember-500',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 14, opacity: 0, rotate: -35 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 35 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? <Icon.moon className="size-[1.05rem]" /> : <Icon.sun className="size-[1.05rem]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-navy-950 text-navy-100/80 lg:block">
      <div className="shell flex h-10 items-center justify-between text-[0.78rem]">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2">
            <Icon.mapPin className="size-3.5 text-ember-400" />
            {site.locations.join(' · ')}
          </span>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-ember-400"
          >
            <Icon.mail className="size-3.5 text-ember-400" />
            {site.email}
          </a>
          <a
            href={`tel:${site.phones[0].replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-ember-400"
          >
            <Icon.phone className="size-3.5 text-ember-400" />
            {site.phones[0]}
          </a>
        </div>
        <div className="flex items-center gap-1">
          {socials.map((social) => {
            const SocialGlyph = SocialIcon[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid size-7 place-items-center rounded-full transition-colors hover:bg-white/10 hover:text-ember-400"
              >
                <SocialGlyph className="size-3.5" />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MegaMenu({ items, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 w-[min(46rem,90vw)] -translate-x-1/2 pt-4"
    >
      <div className="overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-[0_40px_90px_-40px_rgba(7,6,64,.55)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,.9)]">
        <div className="grid gap-1.5 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className="group flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-surface-2"
            >
              <SmartImage
                src={item.image}
                fallback={item.fallback}
                initials={item.initials}
                alt=""
                wrapperClassName="size-12 shrink-0 rounded-xl"
                className="size-12 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-ink transition-colors group-hover:text-ember-600 dark:group-hover:text-ember-400">
                  {item.label}
                </span>
                <span className="block truncate text-xs text-ink-muted">{item.description}</span>
              </span>
              <Icon.arrowUpRight className="size-4 shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember-500 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
        <Link
          to="/programs"
          onClick={onNavigate}
          className="mt-2 flex items-center justify-between rounded-2xl bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Browse every programme
          <Icon.arrowRight className="size-4" />
        </Link>
      </div>
    </motion.div>
  )
}

function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-navy-950/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-[min(23rem,88vw)] flex-col border-l border-hairline bg-canvas lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <Link to="/" onClick={onClose} aria-label="TechStar Innovation Hub — home">
                <Logo size="sm" />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full border border-hairline bg-surface-2 text-ink"
                >
                  <Icon.x className="size-4" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpanded(expanded === link.label ? null : link.label)}
                          aria-expanded={expanded === link.label}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-display text-lg font-bold text-ink transition-colors hover:bg-surface-2"
                        >
                          {link.label}
                          <Icon.chevronDown
                            className={cn(
                              'size-4 text-ink-muted transition-transform duration-300',
                              expanded === link.label && 'rotate-180 text-ember-500',
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === link.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden pl-4"
                            >
                              {link.children.map((child) => (
                                <li key={child.to}>
                                  <NavLink
                                    to={child.to}
                                    onClick={onClose}
                                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-ink-soft transition-colors hover:text-ember-500"
                                  >
                                    <span className="size-1.5 rounded-full bg-ember-500/60" />
                                    {child.label}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'block rounded-xl px-4 py-3 font-display text-lg font-bold transition-colors',
                            isActive ? 'bg-ember-500/10 text-ember-600 dark:text-ember-400' : 'text-ink hover:bg-surface-2',
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-hairline px-5 py-5">
              <Button to="/courses" fullWidth icon={Icon.arrowRight} onClick={onClose}>
                Get Started
              </Button>
              <div className="flex items-center justify-between text-sm text-ink-muted">
                <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2">
                  <Icon.phone className="size-4 text-ember-500" />
                  {site.phones[0]}
                </a>
                <div className="flex gap-1.5">
                  {socials.map((social) => {
                    const SocialGlyph = SocialIcon[social.icon]
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className="grid size-8 place-items-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-ember-500 hover:text-ember-500"
                      >
                        <SocialGlyph className="size-3.5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef(null)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  // Navigating (including via browser back/forward) closes any open menu.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setDrawer(false)
    setMegaOpen(false)
  }

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-[60] w-full">
        <TopBar />

        <div
          className={cn(
            'w-full transition-all duration-500',
            scrolled
              ? 'border-b border-hairline bg-canvas/80 py-2.5 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70'
              : 'border-b border-transparent bg-canvas py-4',
          )}
        >
          <div className="shell flex items-center gap-4">
            <Link to="/" aria-label="TechStar Innovation Hub — home" className="group relative flex shrink-0 items-center">
              <span
                aria-hidden="true"
                className="absolute -inset-2 rounded-2xl bg-ember-500/12 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
              />
              <Logo
                size={scrolled ? 'sm' : 'md'}
                className="relative"
                markClassName="transition-transform duration-500 group-hover:rotate-[18deg]"
              />
            </Link>

            <nav aria-label="Main" className="ml-auto hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) =>
                  link.children ? (
                    <li
                      key={link.label}
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      <button
                        type="button"
                        onClick={() => setMegaOpen((v) => !v)}
                        aria-expanded={megaOpen}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold tracking-tight transition-colors',
                          megaOpen ? 'text-ember-600 dark:text-ember-400' : 'text-ink hover:text-ember-600 dark:hover:text-ember-400',
                        )}
                      >
                        {link.label}
                        <Icon.chevronDown
                          className={cn('size-3.5 transition-transform duration-300', megaOpen && 'rotate-180')}
                        />
                      </button>
                      <AnimatePresence>
                        {megaOpen && (
                          <MegaMenu items={link.children} onNavigate={() => setMegaOpen(false)} />
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'relative inline-flex rounded-full px-4 py-2.5 text-[0.9rem] font-semibold tracking-tight transition-colors',
                            isActive
                              ? 'text-ember-600 dark:text-ember-400'
                              : 'text-ink hover:text-ember-600 dark:hover:text-ember-400',
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {link.label}
                            {isActive && (
                              <motion.span
                                layoutId="nav-pill"
                                className="absolute inset-0 -z-10 rounded-full bg-ember-500/10"
                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
              <ThemeToggle className="hidden sm:grid" />
              <Button to="/courses" size="sm" icon={Icon.arrowRight} className="hidden sm:inline-flex">
                Get Started
              </Button>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label="Open menu"
                className="grid size-10 place-items-center rounded-full border border-hairline bg-surface-2 text-ink transition-colors hover:border-ember-500 hover:text-ember-500 lg:hidden"
              >
                <Icon.menu className="size-[1.15rem]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  )
}
