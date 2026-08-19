import { programs } from './programs'

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Courses', to: '/courses' },
  {
    label: 'Programs',
    to: '/programs',
    children: programs.map((p) => ({
      label: p.shortTitle,
      description: p.audience,
      to: `/programs/${p.slug}`,
      image: p.image,
      fallback: p.fallback,
      initials: p.initials,
      accent: p.accent,
    })),
  },
  { label: 'Team', to: '/team' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]
