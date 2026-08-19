import { useEffect } from 'react'
import { site } from '@/data/site'

const setMeta = (selector, attr, value) => {
  if (!value) return
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [key, val] = selector.replace(/meta\[|\]/g, '').split('=')
    tag.setAttribute(key, val.replace(/"/g, ''))
    document.head.appendChild(tag)
  }
  tag.setAttribute(attr, value)
}

/** Per-route document title, description, canonical URL and OG tags. */
export function useSeo({ title, description, path, image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — STEM, AI, IoT & Robotics Education`
    document.title = fullTitle

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)

    if (image) {
      const absolute = image.startsWith('http') ? image : `${site.url}${image}`
      setMeta('meta[property="og:image"]', 'content', absolute)
      setMeta('meta[name="twitter:image"]', 'content', absolute)
    }

    const url = `${site.url}${path ?? window.location.pathname}`
    setMeta('meta[property="og:url"]', 'content', url)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path, image])
}
