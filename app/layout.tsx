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
  title: 'UNDP | United Nations Development Programme',
  description: 'UNDP works in about 170 countries and territories, helping to eradicate poverty, reduce inequalities and exclusion, and build resilience so countries can sustain progress.',
  keywords: ['UNDP', 'United Nations', 'development', 'sustainable development', 'poverty reduction', 'climate action'],
  openGraph: {
    title: 'UNDP | United Nations Development Programme',
    description: 'Working to eradicate poverty and reduce inequalities through sustainable development.',
    type: 'website',
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
