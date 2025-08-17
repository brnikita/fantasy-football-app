'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFantasyFootball } from '@/contexts/FantasyFootballContext'
import { getOperators, getGameTypes, getSlateNames } from '@/services/fantasyDataService'

export default function FilterControls() {
  const { 
    state, 
    setSelectedOperator, 
    setSelectedGameType, 
    setSelectedSlateName 
  } = useFantasyFootball()

  const operators = getOperators()
  const gameTypes = state.selectedOperator ? getGameTypes(state.selectedOperator) : []
  const slateNames = (state.selectedOperator && state.selectedGameType) 
    ? getSlateNames(state.selectedOperator, state.selectedGameType) 
    : []

  return (
    <section className="flex h-[138px] items-center w-full max-w-[1035px] justify-center gap-8 p-9 bg-[#ffffff1a] rounded-lg mb-10">
      {/* Operator Select */}
      <Select 
        value={state.selectedOperator || ""} 
        onValueChange={(value) => setSelectedOperator(value)}
      >
        <SelectTrigger className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] [&>svg]:h-6 [&>svg]:w-6">
          <SelectValue
            placeholder={
              <span className="font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                Select Operator
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {operators.map((operator) => (
            <SelectItem key={operator} value={operator}>
              {operator}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Game Type Select */}
      <Select 
        value={state.selectedGameType || ""} 
        onValueChange={(value) => setSelectedGameType(value)}
        disabled={!state.selectedOperator}
      >
        <SelectTrigger className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] [&>svg]:h-6 [&>svg]:w-6">
          <SelectValue
            placeholder={
              <span className="font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                Select Game Type
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {gameTypes.map((gameType) => (
            <SelectItem key={gameType} value={gameType}>
              {gameType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Slate Name Select */}
      <Select 
        value={state.selectedSlateName || ""} 
        onValueChange={(value) => setSelectedSlateName(value)}
        disabled={!state.selectedGameType}
      >
        <SelectTrigger className="inline-flex items-center gap-4 px-8 py-4 fantasy-select rounded-lg h-auto font-inter font-normal text-white text-2xl tracking-[0] leading-[normal] [&>svg]:h-6 [&>svg]:w-6">
          <SelectValue
            placeholder={
              <span className="font-inter font-normal text-white text-2xl tracking-[0] leading-[normal]">
                Select Slate Name
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {slateNames.map((slateName) => (
            <SelectItem key={slateName} value={slateName}>
              {slateName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}
