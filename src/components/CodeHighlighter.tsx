'use client'

import { useRef, useEffect } from 'react'
import clsx from 'clsx'
import hljs from 'highlight.js'

import 'highlight.js/styles/github-dark-dimmed.css'
import ClipboardCopy from '@/components/ClipboardCopy'

export default function CodeHighlighter({
  code,
  language,
  filename,
}: {
  code: string
  language: string
  filename: string
}) {
  const codeRef = useRef(null)

  useEffect(() => {
    hljs.highlightBlock(codeRef.current)
  }, [code, language])

  return (
    <>
      {filename && (
        <div className="relative flex items-center justify-between rounded-t-md bg-lime-200 py-2">
          <div className="px-2 text-sm leading-6 text-lime-600 sm:px-4 lg:px-6">
            {filename}
          </div>
          <ClipboardCopy copyText={code} />
        </div>
      )}
      <pre
        className={clsx(
          filename ? 'rounded-b-md' : 'my-5 rounded-md',
          'relative overflow-auto bg-zinc-800 font-mono text-white dark:text-zinc-200',
        )}
      >
        {!filename && (
          <div className="absolute right-0 mr-3 mt-3 rounded-md bg-lime-100 py-1 text-lime-500">
            <ClipboardCopy copyText={code} />
          </div>
        )}
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </>
  )
}
