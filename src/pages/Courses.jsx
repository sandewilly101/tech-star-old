import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { cn, formatPrice } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { useCourses } from '@/hooks/useCourses'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Chip } from '@/components/ui/Cards'
import { Counter, SectionHeading } from '@/components/ui/Atoms'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import CtaBand from '@/components/sections/CtaBand'

const FILTERS = [
  { id: 'all', label: 'All courses', icon: Icon.layers },
  { id: 'school-kids', label: 'For school kids', icon: Icon.school },
  { id: 'everyone', label: 'For everyone', icon: Icon.users },
]

const CATEGORY_LABEL = {
  'school-kids': 'School kids',
  everyone: 'Everyone',
}

function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-hairline bg-surface">
      <div className="shimmer aspect-16/10 w-full bg-surface-2" />
      <div className="space-y-3 p-6">
        <div className="shimmer h-3 w-1/3 rounded-full bg-surface-2" />
        <div className="shimmer h-5 w-4/5 rounded-full bg-surface-2" />
        <div className="shimmer h-3 w-full rounded-full bg-surface-2" />
        <div className="shimmer h-3 w-2/3 rounded-full bg-surface-2" />
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  const price = formatPrice(course.coursePrice)
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-ember-500/40 hover:shadow-[0_32px_74px_-36px_rgba(7,6,64,.45)]"
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={course.imgUrl}
          fallback="/assets/img/course-details.jpg"
          initials={(course.courseName ?? 'TS').slice(0, 2).toUpperCase()}
          alt={course.courseName}
          wrapperClassName="aspect-16/10"
          className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {price && (
          <span className="absolute right-4 top-4 rounded-full bg-ember-500 px-3.5 py-1.5 text-[0.75rem] font-bold text-white shadow-[0_10px_26px_-10px_var(--color-ember-600)]">
            {price}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Chip icon={Icon.tag} tone="navy">
          {CATEGORY_LABEL[course.courseCategory] ?? course.courseCategory ?? 'Course'}
        </Chip>

        <h3 className="mt-4 text-lg font-extrabold leading-snug text-ink transition-colors duration-300 group-hover:text-ember-600 dark:group-hover:text-ember-400">
          {course.courseName}
        </h3>

        <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft line-clamp-3">
          {course.briefDescription}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-[0.86rem] font-bold text-ember-600 dark:text-ember-400">
          View course
          <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function EmptyState({ icon: Glyph = Icon.search, title, body, action }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-hairline-strong bg-surface-2 px-8 py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-ember-500/10 text-ember-500">
        <Glyph className="size-7" />
      </span>
      <h3 className="text-lg font-extrabold text-ink">{title}</h3>
      <p className="max-w-md text-[0.93rem] leading-relaxed text-ink-soft">{body}</p>
      {action}
    </div>
  )
}

export default function Courses() {
  const { status, courses, retry } = useCourses()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  useSeo({
    title: 'Courses',
    description:
      "Unlock new skills with TechStar's courses for school students and adults — coding, robotics, AI and IoT, designed for all ages and skill levels.",
    path: '/courses',
  })

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesFilter = filter === 'all' || course.courseCategory === filter
      const matchesQuery =
        !term ||
        `${course.courseName ?? ''} ${course.briefDescription ?? ''}`.toLowerCase().includes(term)
      return matchesFilter && matchesQuery
    })
  }, [courses, filter, query])

  const counts = useMemo(
    () => ({
      all: courses.length,
      'school-kids': courses.filter((c) => c.courseCategory === 'school-kids').length,
      everyone: courses.filter((c) => c.courseCategory === 'everyone').length,
    }),
    [courses],
  )

  return (
    <>
      <PageHero
        eyebrow="Courses"
        eyebrowIcon={Icon.graduation}
        title="Unlock new skills and knowledge"
        accent="new skills"
        subtitle="Courses designed for all ages and skill levels. Whether you're a school student eager to explore new interests or an adult advancing your career, there is a track for you."
        image="/assets/img/new_slider/school-kids.jpg"
        fallback="/assets/img/course-1.jpg"
        initials="TS"
        breadcrumbs={[{ label: 'Courses' }]}
      />

      {/* Impact strip */}
      <section className="relative bg-canvas pt-16 lg:pt-20">
        <div className="shell">
          <Reveal>
            <div className="grid gap-4 rounded-[1.75rem] border border-hairline bg-surface-2 p-7 sm:grid-cols-3 sm:p-9">
              {[
                { value: 3500, suffix: '+', label: 'Students trained', icon: Icon.graduation },
                { value: 40, suffix: '+', label: 'Schools reached', icon: Icon.school },
                { value: 60, suffix: '+', label: 'TechStar IoT kits', icon: Icon.chip },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-ember-400">
                    <item.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-extrabold text-ink">
                      <Counter value={item.value} suffix={item.suffix} />
                    </span>
                    <span className="block text-[0.85rem] text-ink-muted">{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catalogue */}
      <section className="relative overflow-hidden bg-canvas py-16 lg:py-24">
        <div className="shell relative">
          <SectionHeading
            align="left"
            eyebrow="Catalogue"
            eyebrowIcon={Icon.boxes}
            title="Find the right course"
            accent="right course"
            subtitle="Our catalogue is published live from the TechStar admin platform, so what you see here is always current."
          />

          {/* Controls */}
          <Reveal delay={0.08} className="mt-10">
            <div className="flex flex-col gap-4 rounded-[1.5rem] border border-hairline bg-surface p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((item) => {
                  const isActive = filter === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilter(item.id)}
                      className={cn(
                        'relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.85rem] font-bold transition-colors duration-300',
                        isActive ? 'text-white' : 'text-ink-soft hover:text-ember-600 dark:hover:text-ember-400',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="course-filter"
                          className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,var(--color-navy-900),var(--color-navy-700))]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <item.icon className="relative z-10 size-4" />
                      <span className="relative z-10">{item.label}</span>
                      {status === 'ready' && (
                        <span
                          className={cn(
                            'relative z-10 rounded-full px-1.5 text-[0.7rem] font-bold',
                            isActive ? 'bg-white/20 text-white' : 'bg-surface-2 text-ink-muted',
                          )}
                        >
                          {counts[item.id]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <label className="flex items-center gap-3 rounded-full border border-hairline bg-surface-2 px-4 lg:w-72">
                <Icon.search className="size-4 shrink-0 text-ink-muted" />
                <span className="sr-only">Search courses</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search courses…"
                  className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
              </label>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {status === 'loading' &&
              Array.from({ length: 6 }).map((_, index) => <CourseSkeleton key={index} />)}

            {status === 'error' && (
              <EmptyState
                icon={Icon.warning}
                title="We couldn't reach the course catalogue"
                body="The catalogue service may be waking up — this can take a few seconds on first load. Try again, or contact us and we'll send you the current course list."
                action={
                  <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <Button onClick={retry} icon={Icon.arrowRight}>
                      Try again
                    </Button>
                    <Button to="/contact" variant="outline">
                      Contact us
                    </Button>
                  </div>
                }
              />
            )}

            {status === 'ready' && visible.length === 0 && (
              <EmptyState
                title={query ? 'No courses match that search' : 'New courses are coming soon'}
                body={
                  query
                    ? 'Try a different keyword, or clear the filters to see the full catalogue.'
                    : "We're preparing the next set of courses for this group. In the meantime, our bootcamp programmes run all year."
                }
                action={
                  query ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery('')
                        setFilter('all')
                      }}
                    >
                      Clear filters
                    </Button>
                  ) : (
                    <Button to="/programs" icon={Icon.arrowRight}>
                      See programmes
                    </Button>
                  )
                }
              />
            )}

            <AnimatePresence mode="popLayout">
              {status === 'ready' &&
                visible.map((course, index) => (
                  <motion.div
                    key={course._id ?? course.courseName}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Enrol"
        title="Can't find what you're looking for?"
        copy="Tell us what you want to learn and we'll point you at the right course, bootcamp or custom cohort."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'See programmes', to: '/programs' }}
      />
    </>
  )
}
