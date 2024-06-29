import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { RootLayout } from '@/components/RootLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-brand-500 h-full text-base antialiased">
      <GoogleAnalytics />
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
