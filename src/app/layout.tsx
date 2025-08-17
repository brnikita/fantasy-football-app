import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fantasy Football Dashboard',
  description: 'A comprehensive fantasy football player dashboard with real-time data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black font-inter">
        {children}
      </body>
    </html>
  )
}
