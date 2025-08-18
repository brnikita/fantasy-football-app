'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFantasyFootball } from '@/contexts/FantasyFootballContext'
import { Player } from '@/services/fantasyDataService'

interface PlayerListProps {
  players: Player[]
  totalPlayers: number
  startIndex: number
  endIndex: number
}

/**
 * Tabular display of fantasy players with integrated pagination controls.
 * Manages player selection state, page navigation, and rows-per-page configuration.
 * Provides visual feedback for selected players and calculates pagination boundaries.
 * 
 * @param players - Array of players for current page
 * @param totalPlayers - Total count across all pages for pagination calculation
 * @param startIndex - Zero-based start index for current page display range
 * @param endIndex - Zero-based end index for current page display range
 * @returns Interactive player table with pagination footer
 */
export default function PlayerList({ players, totalPlayers, startIndex, endIndex }: PlayerListProps) {
  const { 
    state, 
    setSelectedPlayer, 
    setCurrentPage, 
    setRowsPerPage 
  } = useFantasyFootball()

  const totalPages = Math.ceil(totalPlayers / state.rowsPerPage)

  /**
   * Updates the globally selected player when a table row is clicked.
   * Triggers re-render of PlayerDetails component to show selected player information.
   */
  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  /**
   * Navigates to a different page via dropdown selection.
   * Converts string value from Select component to number for state management.
   */
  const handlePageChange = (newPage: string) => {
    setCurrentPage(parseInt(newPage))
  }

  /**
   * Updates the number of players displayed per page.
   * Automatically resets to page 1 via context logic to prevent invalid page states.
   */
  const handleRowsPerPageChange = (newRows: string) => {
    setRowsPerPage(parseInt(newRows))
  }

  /**
   * Navigates to the previous page if not already on the first page.
   * Boundary checking prevents navigation below page 1.
   */
  const handlePreviousPage = () => {
    if (state.currentPage > 1) {
      setCurrentPage(state.currentPage - 1)
    }
  }

  /**
   * Navigates to the next page if not already on the last page.
   * Boundary checking prevents navigation beyond available data.
   */
  const handleNextPage = () => {
    if (state.currentPage < totalPages) {
      setCurrentPage(state.currentPage + 1)
    }
  }

  // Generate page options
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={`flex flex-col w-[947px] min-w-[800px] h-[620px] bg-[#2f2f2f] rounded-lg overflow-hidden scrollbar-custom ${state.isLoading ? 'loading-container' : ''}`}>
      <Table className="w-full">
        <TableHeader className="fantasy-table-header bg-neutral-900">
          <TableRow className="border-none">
            <TableHead className="w-[200px] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
              Name
            </TableHead>
            <TableHead className="w-16 px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-center">
              Team
            </TableHead>
            <TableHead className="w-24 px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-center">
              Position
            </TableHead>
            <TableHead className="w-24 px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-right">
              Salary
            </TableHead>
            <TableHead className="w-[72px] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-right">
              Points
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.isLoading ? (
            // Show loading skeleton rows
            Array.from({ length: state.rowsPerPage }).map((_, index) => (
              <TableRow key={`loading-${index}`} className="border-none">
                <TableCell className="px-8 pt-8 pb-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
              </TableRow>
            ))
          ) : players.length === 0 ? (
            // Empty state message
            <TableRow className="border-none">
              <TableCell colSpan={5} className="px-8 py-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="font-inter font-normal text-white/70 text-2xl">
                    No players found for this selection
                  </div>
                  <div className="font-inter font-normal text-white/50 text-lg">
                    Try selecting a different operator or game type
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            players.map((player) => (
              <TableRow
                key={player.id}
                onClick={() => handlePlayerClick(player)}
                className={`border-none ${
                  state.selectedPlayer?.id === player.id ? "bg-[#7f7b0e]" : "bg-transparent"
                } hover:bg-opacity-80 cursor-pointer`}
              >
              <TableCell className="px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                {player.name}
              </TableCell>
              <TableCell className="px-8 py-4 font-inter font-normal text-white text-2xl text-center tracking-[0] leading-[normal]">
                {player.team}
              </TableCell>
              <TableCell className="px-8 py-4 font-inter font-normal text-white text-2xl text-center tracking-[0] leading-[normal]">
                {player.position}
              </TableCell>
              <TableCell className="px-8 py-4 font-inter font-normal text-white text-2xl text-right tracking-[0] leading-[normal]">
                {player.salary}
              </TableCell>
              <TableCell className="px-8 py-4 font-inter font-normal text-white text-2xl text-right tracking-[0] leading-[normal]">
                {player.points}
              </TableCell>
            </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPlayers > 0 && !state.isLoading && (
        <footer className="flex h-[71px] items-center justify-between px-8 py-4 relative self-stretch w-full bg-neutral-800 mt-auto">
          <div className="flex items-center gap-4">
            <span className="font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
              Page
            </span>
            <Select 
              value={state.currentPage.toString()} 
              onValueChange={handlePageChange}
            >
              <SelectTrigger className="w-fit h-12 fantasy-select fantasy-select-footer
               [&>svg]:h-8 [&>svg]:w-8 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="fantasy-select-content">
                {pageOptions.map((page) => (
                  <SelectItem key={page} value={page.toString()} className="fantasy-select-item">
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-inter font-normal text-white text-2xl text-center tracking-[0] leading-[normal]">
              Rows per page
            </span>
            <Select 
              value={state.rowsPerPage.toString()} 
              onValueChange={handleRowsPerPageChange}
            >
              <SelectTrigger className="w-fit h-12 fantasy-select fantasy-select-footer
               [&>svg]:h-8 [&>svg]:w-8 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="fantasy-select-content">
                <SelectItem value="8" className="fantasy-select-item">8</SelectItem>
                <SelectItem value="16" className="fantasy-select-item">16</SelectItem>
                <SelectItem value="24" className="fantasy-select-item">24</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span className="font-inter font-normal text-white text-2xl text-center tracking-[0] leading-[normal]">
            {`${startIndex + 1} - ${endIndex} of ${totalPlayers}`}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 fantasy-button"
              onClick={handlePreviousPage}
              disabled={state.currentPage <= 1}
            >
              <ChevronLeftIcon className="!h-8 !w-8" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 fantasy-button"
              onClick={handleNextPage}
              disabled={state.currentPage >= totalPages}
            >
              <ChevronRightIcon className="!h-8 !w-8" />
            </Button>
          </div>
        </footer>
      )}
    </div>
  )
}
