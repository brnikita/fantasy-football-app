'use client'

import { useEffect, useMemo } from 'react'
import PlayerList from './PlayerList'
import PlayerDetails from './PlayerDetails'
import { useFantasyFootball } from '@/contexts/FantasyFootballContext'
import { getPlayers } from '@/services/fantasyDataService'

export default function PlayerDataTable() {
  const { state, setSelectedPlayer } = useFantasyFootball()

  // Get players based on current selections
  const allPlayers = useMemo(() => {
    if (state.selectedOperator && state.selectedGameType && state.selectedSlateName) {
      return getPlayers(state.selectedOperator, state.selectedGameType, state.selectedSlateName)
    }
    return []
  }, [state.selectedOperator, state.selectedGameType, state.selectedSlateName])

  // Calculate pagination
  const totalPlayers = allPlayers.length
  const startIndex = (state.currentPage - 1) * state.rowsPerPage
  const endIndex = Math.min(startIndex + state.rowsPerPage, totalPlayers)
  const paginatedPlayers = allPlayers.slice(startIndex, endIndex)

  // Auto-select first player when players change
  useEffect(() => {
    if (paginatedPlayers.length > 0 && !state.selectedPlayer) {
      setSelectedPlayer(paginatedPlayers[0])
    }
  }, [paginatedPlayers, state.selectedPlayer, setSelectedPlayer])

  return (
    <section className="px-8 py-0 self-stretch w-full max-w-[1440px] mx-auto flex-[0_0_auto]
     flex gap-6 mb-[30px]">
      <PlayerList 
        players={paginatedPlayers}
        totalPlayers={totalPlayers}
        startIndex={startIndex}
        endIndex={endIndex}
      />
      <PlayerDetails />
    </section>
  )
}
