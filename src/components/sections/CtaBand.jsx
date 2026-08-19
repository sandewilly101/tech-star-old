import { Icon } from '@/lib/icons'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'

/** Full-width conversion band that closes the page. */
export default function CtaBand({
  eyebrow = 'Get started',
  title = 'Ready to ignite the next generation of innovators?',
  copy = "Join a TechStar bootcamp and give your learners hands-on experience in coding, AI, IoT and robotics — built for Tanzania's classrooms and communities.",
  primary = { label: 'Explore courses', to: '/courses' },
  secondary = { label: 'Contact us', to: '/contact' },
}) {
  return (
    <section className="relative bg-canvas pb-20 lg:pb-28">
      <div className="shell">
        <Reveal>
          <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(125deg,var(--color-ember-600),var(--color-ember-500)_45%,var(--color-ember-600))] px-7 py-16 text-center sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-24">
            {/* Glow field */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 size-96 animate-drift rounded-full bg-ember-300/35 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-20 size-[26rem] animate-drift-rev rounded-full bg-ember-700/40 blur-[110px]"
            />
            <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-[0.16]" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Icon.zap className="size-3.5" />
                {eyebrow}
              </span>

              <h2 className="text-balance text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[3rem]">
                {title}
              </h2>

              <p className="max-w-2xl text-[1rem] leading-relaxed text-white/85">{copy}</p>

              <div className="mt-3 flex flex-wrap justify-center gap-3.5">
                <Button to={primary.to} size="lg" variant="white" icon={Icon.arrowRight}>
                  {primary.label}
                </Button>
                <Button to={secondary.to} size="lg" variant="glass" icon={Icon.message} iconPosition="left">
                  {secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
