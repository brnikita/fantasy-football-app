'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { useFantasyFootball } from '@/contexts/FantasyFootballContext'

/**
 * Player details panel displaying selected player information in a card layout.
 * Shows player image, name, and fantasy points in a focused detail view.
 * Gracefully handles no-selection state with placeholder content.
 * 
 * @returns Card component with player image, name, and fantasy points display
 */
export default function PlayerDetails() {
  const { state } = useFantasyFootball()

  return (
    <Card className={`w-[400px] min-w-[350px] h-[620px] bg-[#2f2f2f] rounded-lg overflow-hidden border-none ${state.isLoading ? 'card-loading' : ''}`}>
      <CardContent className="p-0 h-full flex flex-col">
        <div className="pt-12 pb-0 px-0 flex justify-center bg-[#1d1d1d]">
          {state.selectedPlayer ? (
            <Image
              className="w-full h-64 object-cover"
              alt={state.selectedPlayer.name}
              src="/tom-brady-1.png"
              width={400}
              height={256}
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <div className="text-white/50 text-lg">
                Select a player to view details
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col h-[316px] items-start relative w-full rounded-[8px_8px_0px_0px] flex-1 text-white/90">
          {state.isLoading ? (
            <>
              <div className="w-full h-[72px] flex justify-center items-center">
                <div className="w-48 h-8 bg-gray-600 rounded table-loading"></div>
              </div>
              <div className="w-full h-[172px] flex justify-center items-center">
                <div className="w-32 h-24 bg-gray-600 rounded table-loading"></div>
              </div>
              <div className="w-full h-4 flex justify-center items-center">
                <div className="w-16 h-4 bg-gray-600 rounded table-loading"></div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full font-inter font-normal  text-[32px] text-center tracking-[0] leading-[72px]">
                {state.selectedPlayer?.name || "Select a player"}
              </div>

              <div className="w-full font-inter font-normal text-9xl text-center tracking-[0] leading-[172px]">
                {state.selectedPlayer?.points || "0"}
              </div>

              <div className="w-full font-inter font-normal  text-base text-center tracking-[0] leading-4">
                Points
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
