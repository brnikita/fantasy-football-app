'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Loading skeleton for the player table matching the PlayerList component structure
 */
export function PlayerListSkeleton({ rowsPerPage = 8 }: { rowsPerPage?: number }) {
  return (
    <div className="flex flex-col w-[947px] min-w-[800px] h-[620px] bg-[#2f2f2f] rounded-lg overflow-hidden loading-container">
      <div className="fantasy-table-header bg-neutral-900 rounded-t-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="w-[30%] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                Name
              </TableHead>
              <TableHead className="w-[17.5%] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-center">
                Team
              </TableHead>
              <TableHead className="w-[17.5%] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-center">
                Position
              </TableHead>
              <TableHead className="w-[17.5%] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-right">
                Salary
              </TableHead>
              <TableHead className="w-[17.5%] px-8 py-4 font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] text-right">
                Points
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      
      {/* Scrollable Body */}
      <div className="flex-1 overflow-auto scrollbar-custom">
        <Table className="w-full">
          <TableBody>
            {Array.from({ length: rowsPerPage }).map((_, index) => (
              <TableRow key={`loading-${index}`} className="border-none">
                <TableCell className="w-[30%] px-8 pt-8 pb-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="w-[17.5%] px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="w-[17.5%] px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="w-[17.5%] px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
                <TableCell className="w-[17.5%] px-8 py-4">
                  <div className="h-6 bg-gray-600 rounded table-loading"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/**
 * Loading skeleton for the player details matching the PlayerDetails component structure
 */
export function PlayerDetailsSkeleton() {
  return (
    <Card className="w-[400px] min-w-[350px] h-[620px] bg-[#2f2f2f] rounded-lg overflow-hidden border-none card-loading">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="pt-12 pb-0 px-0 flex justify-center bg-[#1d1d1d]">
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-full h-64 bg-gray-600 rounded table-loading"></div>
          </div>
        </div>

        <div className="flex flex-col h-[316px] items-start relative w-full rounded-[8px_8px_0px_0px] flex-1 text-white/90">
          <div className="w-full h-[72px] flex justify-center items-center">
            <div className="w-48 h-8 bg-gray-600 rounded table-loading"></div>
          </div>
          <div className="w-full h-[172px] flex justify-center items-center">
            <div className="w-32 h-24 bg-gray-600 rounded table-loading"></div>
          </div>
          <div className="w-full h-4 flex justify-center items-center">
            <div className="w-16 h-4 bg-gray-600 rounded table-loading"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Loading skeleton for the filter controls
 */
export function FilterControlsSkeleton() {
  return (
    <section className="mx-auto mb-[70px] px-8">
      <div className="bg-[#303030] rounded-lg h-[138px] w-full max-w-[1035px] min-w-[900px] gap-8 p-9 justify-center flex filter-loading">
        {/* Operator Select Skeleton */}
        <div className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto min-w-[280px] max-w-[320px]">
          <div className="w-full h-8 bg-gray-600 rounded table-loading"></div>
        </div>
        
        {/* Game Type Select Skeleton */}
        <div className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto min-w-[280px] max-w-[320px]">
          <div className="w-full h-8 bg-gray-600 rounded table-loading"></div>
        </div>
        
        {/* Slate Name Select Skeleton */}
        <div className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto min-w-[280px] max-w-[320px]">
          <div className="w-full h-8 bg-gray-600 rounded table-loading"></div>
        </div>
      </div>
    </section>
  )
}

/**
 * Complete loading layout matching the FantasyDashboard structure
 */
export function DashboardLoadingSkeleton() {
  return (
    <>
      <header className="w-full h-24 flex items-center justify-center bg-black">
        <div className="max-w-[1440px] w-full flex">
          <div className="w-12 h-[41px] ml-[34px] bg-gray-600 rounded table-loading"></div>
          <div className="ml-[35px] w-48 h-6 bg-gray-600 rounded table-loading self-center"></div>
        </div>
      </header>
      <div className="w-full flex flex-col items-center bg-neutral-900 pt-[68px]">
        <FilterControlsSkeleton />
        <section className="px-8 py-0 self-stretch w-full max-w-[1440px] min-w-[1200px] mx-auto flex-[0_0_auto] flex gap-6 mb-[30px]">
          <PlayerListSkeleton />
          <PlayerDetailsSkeleton />
        </section>
      </div>
    </>
  )
}

