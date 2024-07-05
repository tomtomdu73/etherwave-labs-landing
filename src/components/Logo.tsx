import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import favicon from '@/app/icon.svg'

export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        className={invert ? 'rounded-full bg-white p-1' : ''}
        src={favicon}
        alt="logo"
        width={32}
        height={32}
      />
      <span
        className={clsx(invert && 'text-white', 'hidden font-display text-lg font-medium sm:block')}
      >
        Etherwave Labs
      </span>
    </div>
  )
}
