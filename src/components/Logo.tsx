import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import logo from '@/assets/logo.svg'
import logoLight from '@/assets/logo-light.svg'

export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-x-2">
      {invert ? (
        <Image src={invert ? logoLight : logo} alt="logo etherwavelabs" width={40} height={40} />
      ) : (
        <Image src={logo} alt="logo light etherwavelabs" width={40} height={40} />
      )}
      <span
        className={clsx(invert && 'text-white', 'hidden font-display text-lg font-medium sm:block')}
      >
        Etherwave Labs
      </span>
    </div>
  )
}
