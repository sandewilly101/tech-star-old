import { Icon } from '@/lib/icons'

/** Shown while a lazily-loaded route chunk is still in flight. */
export default function RouteFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid size-16 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember-500/30" />
          <span className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-ember-400">
            <Icon.sparkle className="size-7 animate-pulse" />
          </span>
        </span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.24em] text-ink-muted">
          Loading
        </span>
      </div>
    </div>
  )
}
