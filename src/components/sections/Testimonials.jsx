import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { testimonials } from '@/data/content'
import { SectionHeading } from '@/components/ui/Atoms'
import SmartImage from '@/components/ui/SmartImage'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/** Autoplaying quote carousel — pauses on hover and on keyboard focus. */
export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    reduced ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })],
  )
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap())
  }, [embla])

  useEffect(() => {
    if (!embla) return undefined
    onSelect()
    embla.on('select', onSelect).on('reInit', onSelect)
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect)
    }
  }, [embla, onSelect])

  return (
    <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 size-[36rem] -translate-x-1/2 rounded-full bg-ember-500/7 blur-[130px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Testimonials"
          eyebrowIcon={Icon.quote}
          title="What parents, students and engineers say"
          accent="students and engineers"
        />

        <div className="mt-14">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {testimonials.map((item, index) => (
                <div
                  key={item.name}
                  className="min-w-0 shrink-0 basis-full px-2 sm:basis-[85%] sm:px-3 lg:basis-3/5 xl:basis-1/2"
                >
                  <figure
                    className={cn(
                      'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-surface p-8 transition-all duration-500 sm:p-10',
                      selected === index
                        ? 'scale-100 border-ember-500/30 opacity-100 shadow-[0_34px_80px_-40px_rgba(7,6,64,.45)]'
                        : 'scale-[0.95] opacity-60',
                    )}
                  >
                    <Icon.quote className="size-9 shrink-0 text-ember-500/25" />

                    <blockquote className="mt-6 flex-1 text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.08rem]">
                      "{item.quote}"
                    </blockquote>

                    <div className="mt-8 flex items-center gap-1 text-ember-500">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Icon.star key={star} className="size-4 fill-current" />
                      ))}
                    </div>

                    <figcaption className="mt-6 flex items-center gap-4 border-t border-hairline pt-6">
                      <SmartImage
                        src={item.image}
                        fallback={item.fallbackImage}
                        initials={item.initials}
                        alt={item.name}
                        wrapperClassName="size-14 shrink-0 rounded-full ring-2 ring-ember-500/25"
                        className="size-14 object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-base font-extrabold text-ink">
                          {item.name}
                        </span>
                        <span className="block truncate text-[0.85rem] text-ink-muted">{item.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink transition-all duration-300 hover:-translate-x-0.5 hover:border-ember-500 hover:text-ember-500"
            >
              <Icon.chevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => embla?.scrollTo(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={selected === index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-400',
                    selected === index ? 'w-8 bg-ember-500' : 'w-2 bg-hairline-strong hover:bg-ember-500/50',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink transition-all duration-300 hover:translate-x-0.5 hover:border-ember-500 hover:text-ember-500"
            >
              <Icon.chevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
