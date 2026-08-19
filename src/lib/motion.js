/** The site's single easing curve — a long, soft deceleration. */
export const EASE = [0.16, 1, 0.3, 1]

/** Shared entrance variant for children of <RevealGroup>. */
export const revealItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}
