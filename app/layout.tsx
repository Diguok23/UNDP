import React from "react"
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    default: 'UNEDF | UN Economic Development Fund',
    template: '%s | UNEDF'
  },
  description: 'UNEDF works globally to promote sustainable economic development, reduce poverty and inequality, and build resilient economies for a better future.',
  keywords: ['UNEDF', 'United Nations', 'economic development', 'sustainable development', 'poverty reduction', 'investment', 'global development'],
  icons: {
    icon: '/images/unedf-logo.jpg',
    shortcut: '/images/unedf-logo.jpg',
    apple: '/images/unedf-logo.jpg',
  },
  openGraph: {
    title: 'UNEDF | UN Economic Development Fund',
    description: 'Promoting sustainable economic development and reducing poverty worldwide.',
    type: 'website',
    siteName: 'UNEDF',
    images: [
      {
        url: '/images/unedf-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'UN Economic Development Fund',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNEDF | UN Economic Development Fund',
    description: 'Promoting sustainable economic development and reducing poverty worldwide.',
    images: ['/images/unedf-logo.jpg'],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
