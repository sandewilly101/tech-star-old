import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon } from '@/lib/icons'
import { api } from '@/data/site'

/**
 * Newsletter subscribe form. Talks to the same TechStar admin endpoint the
 * previous site used, and reports success/failure inline.
 */
export default function NewsletterForm({ className, variant = 'dark', compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(api.newsletter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = await response.json().catch(() => ({}))

      if (response.ok) {
        setStatus('success')
        setMessage(result?.message || 'Your subscription request has been sent. Thank you!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(
          result?.message || 'There was an error processing your request. Ensure the email address is valid.',
        )
      }
    } catch {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again later.')
    }
  }

  const onDark = variant === 'dark'

  return (
    <div className={cn('w-full', className)}>
      <form
        onSubmit={onSubmit}
        className={cn(
          'relative flex w-full flex-col gap-2.5 rounded-2xl border p-2 sm:flex-row sm:items-center sm:rounded-full',
          onDark
            ? 'border-white/18 bg-white/10 backdrop-blur-md focus-within:border-ember-400/70'
            : 'border-hairline bg-surface-2 focus-within:border-ember-500',
          'transition-colors duration-300',
        )}
      >
        <label htmlFor={`newsletter-${variant}`} className="sr-only">
          Email address
        </label>
        <div className="flex flex-1 items-center gap-3 px-4">
          <Icon.mail className={cn('size-4 shrink-0', onDark ? 'text-white/60' : 'text-ink-muted')} />
          <input
            id={`newsletter-${variant}`}
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            className={cn(
              'h-11 w-full bg-transparent text-sm outline-none',
              onDark
                ? 'text-white placeholder:text-white/50'
                : 'text-ink placeholder:text-ink-muted',
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold tracking-tight',
            'bg-[linear-gradient(110deg,var(--color-ember-600),var(--color-ember-500)_50%,var(--color-ember-400))] text-white',
            'shadow-[0_12px_30px_-12px_var(--color-ember-600)] transition-all duration-300 hover:shadow-[0_16px_38px_-12px_var(--color-ember-500)]',
            'disabled:cursor-not-allowed disabled:opacity-70',
            compact && 'px-5',
          )}
        >
          {status === 'loading' ? (
            <>
              <Icon.spinner className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Subscribe
              <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            className={cn(
              'mt-3 flex items-center gap-2 px-2 text-sm font-medium',
              status === 'success'
                ? onDark
                  ? 'text-ember-200'
                  : 'text-ember-400'
                : onDark
                  ? 'text-ember-300'
                  : 'text-ember-600',
            )}
          >
            {status === 'success' ? (
              <Icon.check className="size-4 shrink-0" />
            ) : (
              <Icon.warning className="size-4 shrink-0" />
            )}
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
