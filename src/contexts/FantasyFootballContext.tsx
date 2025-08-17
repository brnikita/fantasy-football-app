'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Player } from '@/services/fantasyDataService'

interface FantasyFootballState {
  selectedOperator: string | null
  selectedGameType: string | null
  selectedSlateName: string | null
  selectedPlayer: Player | null
  currentPage: number
  rowsPerPage: number
}

interface FantasyFootballContextType {
  state: FantasyFootballState
  setSelectedOperator: (operator: string | null) => void
  setSelectedGameType: (gameType: string | null) => void
  setSelectedSlateName: (slateName: string | null) => void
  setSelectedPlayer: (player: Player | null) => void
  setCurrentPage: (page: number) => void
  setRowsPerPage: (rows: number) => void
}

const FantasyFootballContext = createContext<FantasyFootballContextType | undefined>(undefined)

export const useFantasyFootball = () => {
  const context = useContext(FantasyFootballContext)
  if (!context) {
    throw new Error('useFantasyFootball must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<FantasyFootballState>({
    selectedOperator: null,
    selectedGameType: null,
    selectedSlateName: null,
    selectedPlayer: null,
    currentPage: 1,
    rowsPerPage: 8,
  })

  const setSelectedOperator = (operator: string | null) => {
    setState(prev => ({
      ...prev,
      selectedOperator: operator,
      selectedGameType: null, // Reset dependent selections
      selectedSlateName: null,
      selectedPlayer: null,
      currentPage: 1,
    }))
  }

  const setSelectedGameType = (gameType: string | null) => {
    setState(prev => ({
      ...prev,
      selectedGameType: gameType,
      selectedSlateName: null, // Reset dependent selections
      selectedPlayer: null,
      currentPage: 1,
    }))
  }

  const setSelectedSlateName = (slateName: string | null) => {
    setState(prev => ({
      ...prev,
      selectedSlateName: slateName,
      selectedPlayer: null,
      currentPage: 1,
    }))
  }

  const setSelectedPlayer = (player: Player | null) => {
    setState(prev => ({
      ...prev,
      selectedPlayer: player,
    }))
  }

  const setCurrentPage = (page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
    }))
  }

  const setRowsPerPage = (rows: number) => {
    setState(prev => ({
      ...prev,
      rowsPerPage: rows,
      currentPage: 1, // Reset to first page when changing rows per page
    }))
  }

  return (
    <FantasyFootballContext.Provider
      value={{
        state,
        setSelectedOperator,
        setSelectedGameType,
        setSelectedSlateName,
        setSelectedPlayer,
        setCurrentPage,
        setRowsPerPage,
      }}
    >
      {children}
    </FantasyFootballContext.Provider>
  )
}
