import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon, SocialIcon } from '@/lib/icons'
import { site, socials } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { SectionHeading } from '@/components/ui/Atoms'
import { RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'
import Accordion from '@/components/ui/Accordion'
import { faqs } from '@/data/content'

const SUBJECTS = ['General Inquiry', 'STEM / IoT Bootcamps', 'Partnership', 'Other']

const channels = [
  {
    icon: 'mapPin',
    label: 'Visit us',
    value: site.locations.join(' // '),
    href: null,
  },
  {
    icon: 'phone',
    label: 'Call us',
    value: site.phones.join(' // '),
    href: `tel:${site.phones[0].replace(/\s/g, '')}`,
  },
  {
    icon: 'mail',
    label: 'Email us',
    value: site.email,
    href: `mailto:${site.email}`,
  },
]

function Field({ label, children, className }) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-muted">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-hairline bg-surface-2 px-4 py-3.5 text-[0.95rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-ember-500 focus:bg-surface'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  })
  const [sent, setSent] = useState(false)

  useSeo({
    title: 'Contact',
    description:
      "Get in touch with TechStar Innovation Hub about programmes, partnerships or support. We're in Dar es Salaam and Mtwara, Tanzania.",
    path: '/contact',
  })

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`[${form.subject}] ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hello TechStar Innovation Hub, I'd like to know more about your programmes.",
  )}`

  return (
    <>
      <PageHero
        eyebrow="Contact"
        eyebrowIcon={Icon.message}
        title="We'd love to hear from you"
        accent="hear from you"
        subtitle="Whether you're interested in learning more about our programmes or want to explore a partnership, we're here to help — and we typically respond within 1–2 business days."
        image="/assets/img/new_slider/tutor.png"
        fallback="/assets/img/about-3.jpg"
        initials="TS"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Channels */}
      <section className="relative bg-canvas py-16 lg:py-20">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {channels.map((channel) => {
              const Glyph = Icon[channel.icon]
              const Wrapper = channel.href ? 'a' : 'div'
              return (
                <motion.div key={channel.label} variants={revealItem}>
                  <Wrapper
                    href={channel.href ?? undefined}
                    className="group flex h-full items-start gap-4 rounded-3xl border border-hairline bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-[0_28px_60px_-30px_rgba(7,6,64,.4)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Glyph className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                        {channel.label}
                      </span>
                      <span className="mt-1.5 block text-[0.95rem] font-semibold leading-relaxed text-ink">
                        {channel.value}
                      </span>
                    </span>
                  </Wrapper>
                </motion.div>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative overflow-hidden bg-surface-2 py-16 lg:py-24">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

        <div className="shell relative grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Form */}
          <Reveal>
            <div className="rounded-[2rem] border border-hairline bg-surface p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Send us a message</h2>
              <p className="mt-3 text-[0.95rem] text-ink-soft">
                Fill this in and we'll open a pre-written email in your mail app — or write to us directly
                at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-ember-600 underline-offset-4 hover:underline dark:text-ember-400"
                >
                  {site.email}
                </a>
                .
              </p>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Mushi"
                    autoComplete="name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Your email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </Field>

                <Field label="Subject" className="sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((subject) => {
                      const isActive = form.subject === subject
                      return (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, subject }))}
                          className={cn(
                            'rounded-full border px-4 py-2.5 text-[0.84rem] font-semibold transition-all duration-300',
                            isActive
                              ? 'border-ember-500 bg-ember-500 text-white shadow-[0_12px_30px_-14px_var(--color-ember-600)]'
                              : 'border-hairline bg-surface-2 text-ink-soft hover:border-ember-500/50 hover:text-ember-600 dark:hover:text-ember-400',
                          )}
                        >
                          {subject}
                        </button>
                      )
                    })}
                  </div>
                </Field>

                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your school, learners or the partnership you have in mind…"
                    className={cn(inputClass, 'resize-y')}
                  />
                </Field>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(110deg,var(--color-ember-600),var(--color-ember-500)_50%,var(--color-ember-400))] px-8 py-4 text-[0.92rem] font-bold text-white shadow-[0_14px_38px_-14px_var(--color-ember-600)] transition-all duration-300 hover:shadow-[0_20px_50px_-14px_var(--color-ember-500)]"
                  >
                    Send message
                    <Icon.send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-aqua-500"
                    >
                      <Icon.check className="size-4" />
                      Your email app should now be open with the message ready.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>

          {/* Side panel */}
          <div className="space-y-5">
            <Reveal direction="left">
              <div className="noise relative overflow-hidden rounded-[2rem] bg-navy-950 p-8 text-white sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-ember-500/22 blur-3xl"
                />
                <h3 className="relative text-xl font-extrabold text-white">Better yet, reach out directly</h3>
                <p className="relative mt-3 text-[0.94rem] leading-relaxed text-navy-100/72">
                  We love hearing from parents, schools and partners. Reach us through any of the channels
                  below and we'll get back to you as soon as possible.
                </p>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative mt-7 flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center gap-3">
                    <SocialIcon.whatsapp className="size-5" />
                    Message us on WhatsApp
                  </span>
                  <Icon.arrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="relative mt-7 border-t border-white/12 pt-7">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-100/50">
                    Follow along
                  </span>
                  <div className="mt-4 flex gap-2.5">
                    {socials.map((social) => {
                      const SocialGlyph = SocialIcon[social.icon]
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={social.label}
                          className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-navy-100/80 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                        >
                          <SocialGlyph className="size-4" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <div className="overflow-hidden rounded-[2rem] border border-hairline bg-surface">
                <div className="flex items-center gap-3 border-b border-hairline px-7 py-5">
                  <Icon.mapPin className="size-4 text-ember-500" />
                  <span className="text-[0.9rem] font-bold text-ink">Find us</span>
                </div>
                <iframe
                  title="TechStar Innovation Hub location"
                  src={site.mapEmbed}
                  width="100%"
                  height="300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0 grayscale-[.25] transition-all duration-500 hover:grayscale-0"
                />
                <p className="px-7 py-5 text-[0.88rem] text-ink-soft">{site.address}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-canvas py-20 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Before you write"
            eyebrowIcon={Icon.message}
            title="You might find your answer here"
            accent="your answer"
          />
          <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
