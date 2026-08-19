import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Deterministic gradient placeholder used when an image asset is missing. */
export function initialsDataUri(initials = 'TS', from = '#070640', to = '#f7921e') {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>` +
    `</linearGradient></defs>` +
    `<rect width="320" height="320" fill="url(#g)"/>` +
    `<text x="50%" y="53%" font-family="Outfit, Inter, Arial, sans-serif" font-size="118" font-weight="800" ` +
    `fill="#ffffff" fill-opacity="0.92" text-anchor="middle" dominant-baseline="middle">${initials}</text>` +
    `</svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const slugify = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') return null
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(numeric) || numeric === 0) return 'Free'
  return `Tsh ${numeric.toLocaleString('en-US')}`
}
