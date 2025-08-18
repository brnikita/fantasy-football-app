import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fantasy Football Dashboard',
  description: 'A comprehensive fantasy football player dashboard with real-time data',
  icons: {
    icon: '/football-icon-1.png',
    shortcut: '/football-icon-1.png',
    apple: '/football-icon-1.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1a1a1a] font-inter">
        {children}
      </body>
    </html>
  )
}
