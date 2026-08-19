import { Link, useParams } from 'react-router-dom'
import { formatPrice } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { useCourse } from '@/hooks/useCourses'
import { useSeo } from '@/hooks/useSeo'
import PageHero from '@/components/layout/PageHero'
import { Chip } from '@/components/ui/Cards'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import SmartImage from '@/components/ui/SmartImage'
import CtaBand from '@/components/sections/CtaBand'

const CATEGORY_LABEL = {
  'school-kids': 'School kids',
  everyone: 'Everyone',
}

function DetailSkeleton() {
  return (
    <div className="shell grid gap-12 py-20 lg:grid-cols-[1.55fr_1fr] lg:py-28">
      <div className="space-y-5">
        <div className="shimmer aspect-16/9 w-full rounded-[2rem] bg-surface-2" />
        <div className="shimmer h-8 w-3/4 rounded-full bg-surface-2" />
        <div className="shimmer h-4 w-full rounded-full bg-surface-2" />
        <div className="shimmer h-4 w-5/6 rounded-full bg-surface-2" />
        <div className="shimmer h-4 w-2/3 rounded-full bg-surface-2" />
      </div>
      <div className="shimmer h-72 rounded-[1.75rem] bg-surface-2" />
    </div>
  )
}

export default function CourseDetail() {
  const { id } = useParams()
  const { status, course, retry } = useCourse(id)

  useSeo({
    title: course?.courseName ?? 'Course details',
    description:
      course?.briefDescription ??
      'Explore the curriculum, fee structure and everything you need to make an informed decision about a TechStar course.',
    path: `/courses/${id}`,
    image: course?.imgUrl,
  })

  const price = formatPrice(course?.coursePrice)

  return (
    <>
      <PageHero
        compact
        eyebrow="Course details"
        eyebrowIcon={Icon.graduation}
        title={course?.courseName ?? 'Course details'}
        subtitle={
          course?.briefDescription ??
          'Delve into the specifics of our course offerings — the curriculum, the fee structure, and everything you need to decide.'
        }
        image={course?.imgUrl ?? '/assets/img/course-details.jpg'}
        fallback="/assets/img/course-details.jpg"
        initials={(course?.courseName ?? 'TS').slice(0, 2).toUpperCase()}
        breadcrumbs={[{ label: 'Courses', to: '/courses' }, { label: course?.courseName ?? 'Details' }]}
      />

      {status === 'loading' && <DetailSkeleton />}

      {status === 'error' && (
        <section className="shell py-24 lg:py-32">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-[1.75rem] border border-dashed border-hairline-strong bg-surface-2 px-8 py-16 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-ember-500/10 text-ember-500">
              <Icon.warning className="size-7" />
            </span>
            <h2 className="text-xl font-extrabold text-ink">We couldn't load this course</h2>
            <p className="text-[0.95rem] leading-relaxed text-ink-soft">
              The catalogue service may be waking up. Try again in a moment, or get in touch and we'll
              send you the details directly.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={retry} icon={Icon.arrowRight}>
                Try again
              </Button>
              <Button to="/courses" variant="outline">
                Back to courses
              </Button>
            </div>
          </div>
        </section>
      )}

      {status === 'ready' && course && (
        <section className="relative overflow-hidden bg-canvas py-20 lg:py-28">
          <div className="shell relative grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="overflow-hidden rounded-[2rem] border border-hairline shadow-[0_38px_90px_-44px_rgba(7,6,64,.45)]">
                  <SmartImage
                    src={course.imgUrl}
                    fallback="/assets/img/course-details.jpg"
                    initials={(course.courseName ?? 'TS').slice(0, 2).toUpperCase()}
                    alt={course.courseName}
                    wrapperClassName="aspect-16/9"
                    className="size-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-9 flex flex-wrap gap-2">
                  {course.courseCategory && (
                    <Chip icon={Icon.tag} tone="accent">
                      {CATEGORY_LABEL[course.courseCategory] ?? course.courseCategory}
                    </Chip>
                  )}
                  <Chip icon={Icon.badge}>Certificate on completion</Chip>
                  <Chip icon={Icon.chip}>Kit provided</Chip>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="mt-7 text-2xl font-extrabold leading-tight sm:text-[2rem]">
                  {course.courseName}
                </h2>
              </Reveal>

              <Reveal delay={0.16}>
                {course.description ? (
                  <div
                    className="prose-techstar mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft [&_a]:text-ember-600 [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:mb-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5"
                    // The course body is authored in the TechStar admin CMS.
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : (
                  <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-soft">
                    {course.briefDescription}
                  </p>
                )}
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <Reveal direction="left">
                <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-surface">
                  <div className="border-b border-hairline bg-gradient-to-br from-navy-900 to-navy-700 px-7 py-8 text-white">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-300">
                      Course fee
                    </span>
                    <p className="mt-2 font-display text-3xl font-extrabold">{price ?? 'On request'}</p>
                  </div>

                  <dl className="divide-y divide-hairline">
                    {[
                      {
                        label: 'Best for',
                        value: CATEGORY_LABEL[course.courseCategory] ?? 'All learners',
                        icon: Icon.users,
                      },
                      { label: 'Delivery', value: 'In-person, hands-on', icon: Icon.laptop },
                      { label: 'Materials', value: 'TechStar IoT kit included', icon: Icon.chip },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-4 px-7 py-5">
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-ember-500/12 text-ember-600 dark:text-ember-400">
                          <row.icon className="size-4" />
                        </span>
                        <span>
                          <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                            {row.label}
                          </dt>
                          <dd className="mt-1 text-[0.95rem] font-semibold text-ink">{row.value}</dd>
                        </span>
                      </div>
                    ))}
                  </dl>

                  <div className="space-y-3 p-7">
                    <Button to="/contact" fullWidth icon={Icon.arrowRight}>
                      Enrol / enquire
                    </Button>
                    <Link
                      to="/courses"
                      className="flex items-center justify-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-ember-600 dark:hover:text-ember-400"
                    >
                      <Icon.chevronLeft className="size-4" />
                      Back to all courses
                    </Link>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Have questions?"
        title="Reach out and our team will help you find the right fit"
        copy="We'll walk you through the curriculum, the schedule and what your learner needs to bring — which is usually nothing but curiosity."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'All courses', to: '/courses' }}
      />
    </>
  )
}
