import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LTE Table Maker',
  description: 'Friday Meetup English Table Maker App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
