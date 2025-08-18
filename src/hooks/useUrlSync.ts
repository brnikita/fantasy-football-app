'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Lightweight hook for syncing app state with URL parameters.
 * Works with existing state management without replacing it.
 */
export function useUrlSync() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read values from URL
  const getFromUrl = useCallback(() => {
    if (!searchParams) return { operator: null, gameType: null, slateName: null, page: 1, rowsPerPage: 8, playerId: null }
    
    return {
      operator: searchParams.get('operator'),
      gameType: searchParams.get('gameType'),
      slateName: searchParams.get('slateName'),
      page: parseInt(searchParams.get('page') || '1', 10),
      rowsPerPage: parseInt(searchParams.get('rowsPerPage') || '8', 10),
      playerId: searchParams.get('playerId'),
    }
  }, [searchParams])

  // Update URL without full page reload
  const updateUrl = useCallback((params: Record<string, string | number | null>) => {
    if (!searchParams) return
    
    // Get current values and merge with updates
    const currentParams = getFromUrl()
    const updatedParams = { ...currentParams, ...params }
    
    // Build URL parameters in the desired order
    const urlParams = new URLSearchParams()
    
    if (updatedParams.operator) urlParams.set('operator', updatedParams.operator)
    if (updatedParams.gameType) urlParams.set('gameType', updatedParams.gameType)
    if (updatedParams.slateName) urlParams.set('slateName', updatedParams.slateName)
    if (updatedParams.page && updatedParams.page !== 1) urlParams.set('page', updatedParams.page.toString())
    if (updatedParams.rowsPerPage && updatedParams.rowsPerPage !== 8) urlParams.set('rowsPerPage', updatedParams.rowsPerPage.toString())
    if (updatedParams.playerId) urlParams.set('playerId', updatedParams.playerId)

    const newUrl = `${pathname}?${urlParams.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [searchParams, pathname, router, getFromUrl])

  return {
    getFromUrl,
    updateUrl,
  }
}
