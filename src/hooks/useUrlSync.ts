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
    
    const current = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        current.delete(key)
      } else {
        current.set(key, value.toString())
      }
    })

    const newUrl = `${pathname}?${current.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [searchParams, pathname, router])

  return {
    getFromUrl,
    updateUrl,
  }
}
