'use client'

import { useState } from 'react'
import { ClipboardIcon } from '@heroicons/react/24/outline'

export default function ClipboardCopy({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <button
        onClick={handleCopyClick}
        className="flex items-center gap-x-1 px-1 text-xs text-lime-600 lg:px-2 lg:text-sm"
      >
        <ClipboardIcon className="h-5 w-5" />
        <span className="hidden lg:block">{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  )
}
