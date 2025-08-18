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

/**
 * Custom hook providing access to fantasy football application state and actions.
 * Enforces proper context usage by throwing an error if used outside the provider tree.
 * 
 * @throws Error when used outside of AppProvider component tree
 * @returns Context object containing state and setter functions for fantasy football data
 */
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

/**
 * Context provider component managing all fantasy football application state.
 * Centralizes state management for filter selections, pagination, and player data.
 * Implements cascade reset logic where changing higher-level filters clears dependent selections.
 * 
 * @param children - React components that need access to fantasy football context
 * @returns Context provider wrapping children with fantasy football state access
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<FantasyFootballState>({
    selectedOperator: null,
    selectedGameType: null,
    selectedSlateName: null,
    selectedPlayer: null,
    currentPage: 1,
    rowsPerPage: 8,
  })

  /**
   * Updates the selected fantasy sports operator and cascades reset to dependent filters.
   * Clears game type, slate name, and player selections since they depend on operator choice.
   * Resets pagination to first page as the player dataset will change.
   * 
   * @param operator - The fantasy sports platform name or null to clear selection
   */
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

  /**
   * Updates the selected game type and cascades reset to slate and player selections.
   * Maintains operator selection but clears downstream dependencies since available slates change.
   * Resets pagination as the filtered player set will be different.
   * 
   * @param gameType - The game type within the selected operator or null to clear
   */
  const setSelectedGameType = (gameType: string | null) => {
    setState(prev => ({
      ...prev,
      selectedGameType: gameType,
      selectedSlateName: null, // Reset dependent selections
      selectedPlayer: null,
      currentPage: 1,
    }))
  }

  /**
   * Updates the selected slate name and resets player selection.
   * Completes the filter hierarchy, determining the final player dataset to display.
   * Clears selected player since the available roster changes with different slates.
   * 
   * @param slateName - The specific contest/slate name or null to clear
   */
  const setSelectedSlateName = (slateName: string | null) => {
    setState(prev => ({
      ...prev,
      selectedSlateName: slateName,
      selectedPlayer: null,
      currentPage: 1,
    }))
  }

  /**
   * Updates the currently selected player for detailed view.
   * Does not affect other state since player selection is independent of filtering and pagination.
   * 
   * @param player - The Player object to display in details panel or null to clear
   */
  const setSelectedPlayer = (player: Player | null) => {
    setState(prev => ({
      ...prev,
      selectedPlayer: player,
    }))
  }

  /**
   * Updates the current page number for player list pagination.
   * Maintains all other state since pagination is independent of filter selections.
   * 
   * @param page - The page number to navigate to (1-based indexing)
   */
  const setCurrentPage = (page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
    }))
  }

  /**
   * Updates the number of players displayed per page and resets to first page.
   * Page reset is necessary because the total page count changes with different page sizes,
   * and the current page might become invalid.
   * 
   * @param rows - Number of player rows to display per page
   */
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
