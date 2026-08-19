import { Link } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { useSeo } from '@/hooks/useSeo'
import { Aurora } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'

const suggestions = [
  { label: 'Home', to: '/', icon: Icon.sparkle },
  { label: 'Courses', to: '/courses', icon: Icon.graduation },
  { label: 'Programmes', to: '/programs', icon: Icon.rocket },
  { label: 'Contact', to: '/contact', icon: Icon.message },
]

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for has moved or no longer exists.',
    noindex: true,
  })

  return (
    <section className="noise relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 py-24 text-white">
      <Aurora intensity="soft" className="-z-10 opacity-70" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-[0.14]" />

      <div className="shell relative flex flex-col items-center text-center">
        <Reveal>
          <span className="font-display text-[7rem] font-extrabold leading-none tracking-tighter sm:text-[11rem]">
            <span className="text-gradient">404</span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            This page took a different path
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-navy-100/70">
            The page you were looking for has moved, or it never existed. Here are a few places worth
            trying instead.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {suggestions.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-400 hover:bg-white/14"
              >
                <item.icon className="size-4 text-ember-400" />
                {item.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10">
            <Button to="/" size="lg" icon={Icon.arrowRight}>
              Back to home
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
