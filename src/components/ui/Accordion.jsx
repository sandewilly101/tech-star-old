import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'

/** Single-open accordion used for the FAQ block. */
export default function Accordion({ items = [], className }) {
  const [open, setOpen] = useState(0)

  return (
    <div className={cn('divide-y divide-hairline overflow-hidden rounded-3xl border border-hairline bg-surface', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-surface-2 sm:px-8 sm:py-6"
              >
                <span
                  className={cn(
                    'text-base font-bold tracking-tight transition-colors sm:text-lg',
                    isOpen ? 'text-ember-600 dark:text-ember-400' : 'text-ink',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-400',
                    isOpen
                      ? 'rotate-180 border-ember-500 bg-ember-500 text-white'
                      : 'border-hairline-strong text-ink-muted group-hover:border-ember-500 group-hover:text-ember-500',
                  )}
                >
                  <Icon.chevronDown className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[0.97rem] leading-relaxed text-ink-soft sm:px-8 sm:pb-8 sm:pr-20">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
