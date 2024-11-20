import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Nest',
  description: 'Travel website',
  icons: {
    icon: "/icon.ico",
    href: "/icon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
        <link rel='icon' href='/icon.ico?v=2' />
        </head>
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
