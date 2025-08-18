'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Player, getOperators, getGameTypes, getSlateNames } from '@/services/fantasyDataService'
import { useUrlSync } from '@/hooks/useUrlSync'

interface FantasyFootballState {
  selectedOperator: string | null
  selectedGameType: string | null
  selectedSlateName: string | null
  selectedPlayer: Player | null
  currentPage: number
  rowsPerPage: number
  isLoading: boolean
}

interface FantasyFootballContextType {
  state: FantasyFootballState
  setSelectedOperator: (operator: string | null) => void
  setSelectedGameType: (gameType: string | null) => void
  setSelectedSlateName: (slateName: string | null) => void
  setSelectedPlayer: (player: Player | null) => void
  setCurrentPage: (page: number) => void
  setRowsPerPage: (rows: number) => void
  setIsLoading: (loading: boolean) => void
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
  const { getFromUrl, updateUrl } = useUrlSync();
  const urlParams = getFromUrl();
  const operators = getOperators();
  const validOperator =
    urlParams.operator && operators.includes(urlParams.operator)
      ? urlParams.operator
      : null;
  const validGameType =
    validOperator &&
    urlParams.gameType &&
    getGameTypes(validOperator).includes(urlParams.gameType)
      ? urlParams.gameType
      : null;
  const validSlateName =
    validOperator &&
    validGameType &&
    urlParams.slateName &&
    getSlateNames(validOperator, validGameType).includes(urlParams.slateName)
      ? urlParams.slateName
      : null;

  const [state, setState] = useState<FantasyFootballState>({
    selectedOperator: validOperator,
    selectedGameType: validGameType,
    selectedSlateName: validSlateName,
    selectedPlayer: null,
    currentPage: urlParams.page || 1,
    rowsPerPage: [8, 16, 24].includes(urlParams.rowsPerPage)
      ? urlParams.rowsPerPage
      : 8,
    isLoading: true, // Start with loading state
  });

  // Sync state to URL whenever state changes (but not during initial load)
  useEffect(() => {
    if (state.isLoading) return;

    updateUrl({
      operator: state.selectedOperator,
      gameType: state.selectedGameType,
      slateName: state.selectedSlateName,
      page: state.currentPage,
      rowsPerPage: state.rowsPerPage,
    });
  }, [
    state.selectedOperator,
    state.selectedGameType,
    state.selectedSlateName,
    state.currentPage,
    state.rowsPerPage,
    state.isLoading,
    updateUrl,
  ]);

  // Handle loading state based on whether we have URL params or need to auto-select
  useEffect(() => {
    const operators = getOperators();

    if (
      state.selectedOperator &&
      state.selectedGameType &&
      state.selectedSlateName
    ) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    if (operators.length > 0 && !state.selectedOperator) {
      const firstOperator = operators[0];
      const gameTypes = getGameTypes(firstOperator);

      if (gameTypes.length > 0) {
        const firstGameType = gameTypes[0];
        const slateNames = getSlateNames(firstOperator, firstGameType);

        if (slateNames.length > 0) {
          const firstSlateName = slateNames[0];

          setState((prev) => ({
            ...prev,
            selectedOperator: firstOperator,
            selectedGameType: firstGameType,
            selectedSlateName: firstSlateName,
            isLoading: false,
          }));
        }
      }
    }
  }, [state.selectedOperator, state.selectedGameType, state.selectedSlateName]);

  /**
   * Updates the selected fantasy sports operator and cascades reset to dependent filters.
   * Clears game type, slate name, and player selections since they depend on operator choice.
   * Resets pagination to first page as the player dataset will change.
   *
   * @param operator - The fantasy sports platform name or null to clear selection
   */
  const setSelectedOperator = (operator: string | null) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    setState((prev) => ({
      ...prev,
      selectedOperator: operator,
      selectedGameType: null, // Reset dependent selections
      selectedSlateName: null,
      selectedPlayer: null,
      currentPage: 1,
      isLoading: false,
    }));
  };

  /**
   * Updates the selected game type and cascades reset to slate and player selections.
   * Maintains operator selection but clears downstream dependencies since available slates change.
   * Resets pagination as the filtered player set will be different.
   *
   * @param gameType - The game type within the selected operator or null to clear
   */
  const setSelectedGameType = (gameType: string | null) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    setState((prev) => ({
      ...prev,
      selectedGameType: gameType,
      selectedSlateName: null, // Reset dependent selections
      selectedPlayer: null,
      currentPage: 1,
      isLoading: false,
    }));
  };

  /**
   * Updates the selected slate name and resets player selection.
   * Completes the filter hierarchy, determining the final player dataset to display.
   * Clears selected player since the available roster changes with different slates.
   *
   * @param slateName - The specific contest/slate name or null to clear
   */
  const setSelectedSlateName = (slateName: string | null) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    setState((prev) => ({
      ...prev,
      selectedSlateName: slateName,
      selectedPlayer: null,
      currentPage: 1,
      isLoading: false,
    }));
  };

  /**
   * Updates the currently selected player for detailed view.
   * Does not affect other state since player selection is independent of filtering and pagination.
   *
   * @param player - The Player object to display in details panel or null to clear
   */
  const setSelectedPlayer = (player: Player | null) => {
    setState((prev) => ({
      ...prev,
      selectedPlayer: player,
    }));
  };

  /**
   * Updates the current page number for player list pagination.
   * Maintains all other state since pagination is independent of filter selections.
   *
   * @param page - The page number to navigate to (1-based indexing)
   */
  const setCurrentPage = (page: number) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  /**
   * Updates the number of players displayed per page and resets to first page.
   * Page reset is necessary because the total page count changes with different page sizes,
   * and the current page might become invalid.
   *
   * @param rows - Number of player rows to display per page
   */
  const setRowsPerPage = (rows: number) => {
    setState((prev) => ({
      ...prev,
      rowsPerPage: rows,
      currentPage: 1, // Reset to first page when changing rows per page
    }));
  };

  /**
   * Updates the loading state for the application.
   * Used to show loading animations while data is being processed.
   *
   * @param loading - Boolean indicating if the app is in loading state
   */
  const setIsLoading = (loading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading,
    }));
  };

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
        setIsLoading,
      }}
    >
      {children}
    </FantasyFootballContext.Provider>
  );
}
