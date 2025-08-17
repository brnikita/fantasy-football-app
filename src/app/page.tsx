'use client'

import { AppProvider } from '@/contexts/FantasyFootballContext'
import FantasyDashboard from '@/components/FantasyDashboard'

export default function HomePage() {
  return (
    <AppProvider>
      <FantasyDashboard />
    </AppProvider>
  )
}
