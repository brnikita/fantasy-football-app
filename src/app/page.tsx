'use client'

import { Suspense } from 'react'
import { AppProvider } from '@/contexts/FantasyFootballContext'
import FantasyDashboard from '@/components/FantasyDashboard'
import { DashboardLoadingSkeleton } from '@/components/LoadingSkeletons'

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <AppProvider>
        <FantasyDashboard />
      </AppProvider>
    </Suspense>
  )
}
