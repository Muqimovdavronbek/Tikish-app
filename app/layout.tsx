import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TIKISH.UZ - Raqamli Modelyer',
  description: "O'zbekistondagi eng yaxshi tikuvchilar bilan bog'laning. Maxsus kiyimlar, o'zgartirishlar va an'anaviy milliy kiyimlar uchun.",
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
