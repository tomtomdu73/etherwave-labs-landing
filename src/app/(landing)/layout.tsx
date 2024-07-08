import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { RootLayout } from '@/components/RootLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'Blockchain Development Agency - Etherwave Labs',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-brand-500 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
      <GoogleAnalytics />
    </html>
  )
}
