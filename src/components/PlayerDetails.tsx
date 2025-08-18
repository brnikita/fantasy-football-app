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
    <Card className="w-[400px] h-[620px] fantasy-card rounded-lg overflow-hidden border-none">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="pt-12 pb-0 px-0 flex justify-center">
          <Image
            className="w-full h-64 object-cover"
            alt={state.selectedPlayer?.name || "Player"}
            src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop"
            width={400}
            height={256}
          />
        </div>

        <div className="flex flex-col h-[316px] items-start relative w-full bg-[#2f2f2f] rounded-[8px_8px_0px_0px] flex-1 text-white/90">
          <div className="w-full font-inter font-normal  text-[32px] text-center tracking-[0] leading-[72px]">
            {state.selectedPlayer?.name || "Select a player"}
          </div>

          <div className="w-full font-inter font-normal text-9xl text-center tracking-[0] leading-[172px]">
            {state.selectedPlayer?.points || "0"}
          </div>

          <div className="w-full font-inter font-normal  text-base text-center tracking-[0] leading-4">
            Points
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
