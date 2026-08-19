import { Icon } from '@/lib/icons'
import { faqs } from '@/data/content'
import { SectionHeading } from '@/components/ui/Atoms'
import Accordion from '@/components/ui/Accordion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'

export default function FaqSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 size-[28rem] rounded-full bg-ember-600/8 blur-[130px]"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            eyebrowIcon={Icon.message}
            title="Questions we get asked a lot"
            accent="asked a lot"
            subtitle="Still unsure whether TechStar is the right fit for your learner, school or organisation? Start here."
          />
          <Reveal delay={0.15} className="mt-8">
            <Button to="/contact" variant="navy" icon={Icon.arrowRight}>
              Ask us anything
            </Button>
          </Reveal>
        </div>

        <Reveal direction="left">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  )
}
