'use client'

import React, { useEffect } from 'react'

export default function ({ url }: { url: string }) {
  useEffect(() => {
    const head = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
    head.appendChild(script)
  }, [])

  return <div className="calendly-inline-widget h-[900px] w-full sm:h-[700px]" data-url={url}></div>
}
