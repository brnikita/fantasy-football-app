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

export default function PlayerList({ players, totalPlayers, startIndex, endIndex }: PlayerListProps) {
  const { 
    state, 
    setSelectedPlayer, 
    setCurrentPage, 
    setRowsPerPage 
  } = useFantasyFootball()

  const totalPages = Math.ceil(totalPlayers / state.rowsPerPage)

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  const handlePageChange = (newPage: string) => {
    setCurrentPage(parseInt(newPage))
  }

  const handleRowsPerPageChange = (newRows: string) => {
    setRowsPerPage(parseInt(newRows))
  }

  const handlePreviousPage = () => {
    if (state.currentPage > 1) {
      setCurrentPage(state.currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (state.currentPage < totalPages) {
      setCurrentPage(state.currentPage + 1)
    }
  }

  // Generate page options
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col w-[947px] h-[620px] relative bg-[#2f2f2f] rounded-lg overflow-hidden scrollbar-custom">
      <Table className="w-full">
        <TableHeader className="fantasy-table-header">
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
          {players.map((player) => (
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
          ))}
        </TableBody>
      </Table>

      <footer className="flex h-[71px] items-center justify-between px-8 py-4 relative self-stretch w-full bg-neutral-800 mt-auto">
        <div className="flex items-center gap-4">
          <span className="font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
            Page
          </span>
          <Select 
            value={state.currentPage.toString()} 
            onValueChange={handlePageChange}
            disabled={totalPages === 0}
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
          {totalPlayers > 0 ? `${startIndex + 1} - ${endIndex} of ${totalPlayers}` : "0 - 0 of 0"}
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
    </div>
  )
}
