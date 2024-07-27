'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type ButtonProps = {
  invert?: boolean
  withMotion?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  withMotion = false,
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-brand-500 hover:bg-neutral-200 disabled:bg-neutral-300 disabled:text-neutral-500'
      : 'bg-brand-500 text-white hover:bg-brand-400 disabled:bg-neutral-300 disabled:text-neutral-500',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link {...props}>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} className={className}>
        {inner}
      </motion.button>
    </Link>
  )
}
