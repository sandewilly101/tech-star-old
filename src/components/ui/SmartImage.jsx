import { useState } from 'react'
import { cn, initialsDataUri } from '@/lib/utils'

/**
 * Image with a graceful degradation chain: primary source → optional secondary
 * source → a branded initials gradient. Fades in once decoded so a slow photo
 * never pops into a finished layout.
 */
export default function SmartImage({
  src,
  fallback,
  initials = 'TS',
  alt = '',
  className,
  wrapperClassName,
  loading = 'lazy',
  sizes,
  ...props
}) {
  const [stage, setStage] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [lastSrc, setLastSrc] = useState(src)

  // Pointing the component at a new image resets the fallback chain and the
  // fade-in. Adjusting during render avoids a frame of the previous photo.
  if (lastSrc !== src) {
    setLastSrc(src)
    setStage(0)
    setLoaded(false)
  }

  const chain = [src, fallback, initialsDataUri(initials)].filter(Boolean)
  const current = chain[Math.min(stage, chain.length - 1)]

  return (
    <span className={cn('relative block overflow-hidden', wrapperClassName)}>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-navy-900/10 to-ember-500/10 transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100 shimmer',
        )}
      />
      <img
        src={current}
        alt={alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setStage((s) => (s < chain.length - 1 ? s + 1 : s))}
        className={cn(
          'transition-[opacity,transform,filter] duration-700 ease-out',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg',
          className,
        )}
        {...props}
      />
    </span>
  )
}
