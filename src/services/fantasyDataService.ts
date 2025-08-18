// Data service to load and parse the fantasy football data from data.json
import rawData from '../../data.json'

export interface Player {
  id: string
  name: string
  team: string
  position: string
  salary: string
  points: string
}

export interface SlateData {
  _id: string
  operator: string
  operatorGameType: string
  operatorName: string
  dfsSlatePlayers: RawPlayer[]
}

export interface RawPlayer {
  slatePlayerId: number
  operatorPlayerName: string
  operatorPosition: string
  operatorSalary: number
  team: string
  fantasyPoints: number
}

export interface GameData {
  operators: string[]
  gameTypes: { [operator: string]: string[] }
  slateNames: { [operator: string]: { [gameType: string]: string[] } }
  players: { [operator: string]: { [gameType: string]: { [slateName: string]: Player[] } } }
}

/**
 * Transforms raw JSON data into a hierarchical structure optimized for cascading filter selections.
 * Creates nested objects for efficient O(1) lookups when users select operator → game type → slate name.
 * Filters out defense/special teams players to focus on individual fantasy players.
 * 
 * @returns Structured data with operators as top-level keys, enabling dependent dropdown population
 */
export const getFantasyData = (): GameData => {
  const data = rawData as SlateData[]
  
  // Check if data is loaded correctly
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn('No data loaded from data.json')
    return {
      operators: [],
      gameTypes: {},
      slateNames: {},
      players: {}
    }
  }
  
  // Extract unique operators, filtering out null/undefined values
  const operators = Array.from(new Set(data
    .filter(item => item && item.operator)
    .map(item => item.operator)
  ))
  
  // Build game types for each operator
  const gameTypes: { [operator: string]: string[] } = {}
  operators.forEach(operator => {
    gameTypes[operator] = Array.from(new Set(
      data
        .filter(item => item && item.operator === operator && item.operatorGameType)
        .map(item => item.operatorGameType)
    ))
  })
  
  // Build slate names for each operator and game type combination
  const slateNames: { [operator: string]: { [gameType: string]: string[] } } = {}
  operators.forEach(operator => {
    slateNames[operator] = {}
    gameTypes[operator].forEach(gameType => {
      slateNames[operator][gameType] = Array.from(new Set(
        data
          .filter(item => 
            item && 
            item.operator === operator && 
            item.operatorGameType === gameType && 
            item.operatorName
          )
          .map(item => item.operatorName)
      ))
    })
  })
  
  // Build players for each operator, game type, and slate name combination
  const players: { [operator: string]: { [gameType: string]: { [slateName: string]: Player[] } } } = {}
  operators.forEach(operator => {
    players[operator] = {}
    gameTypes[operator].forEach(gameType => {
      players[operator][gameType] = {}
      slateNames[operator][gameType].forEach(slateName => {
        const slateData = data.find(item => 
          item && 
          item.operator === operator && 
          item.operatorGameType === gameType && 
          item.operatorName === slateName
        )
        
        if (slateData && slateData.dfsSlatePlayers) {
          players[operator][gameType][slateName] = slateData.dfsSlatePlayers
            .filter(player => 
              player && 
              player.operatorPlayerName && 
              !player.operatorPlayerName.includes('D/ST') // Filter out defense players for cleaner display
            )
            .map(player => ({
              id: player.slatePlayerId ? player.slatePlayerId.toString() : '',
              name: player.operatorPlayerName || 'Unknown Player',
              team: player.team || 'N/A',
              position: player.operatorPosition || 'N/A',
              salary: player.operatorSalary ? `$${player.operatorSalary.toLocaleString()}` : '$0',
              points: player.fantasyPoints ? player.fantasyPoints.toString() : '0'
            }))
        } else {
          players[operator][gameType][slateName] = []
        }
      })
    })
  })
  
  return {
    operators,
    gameTypes,
    slateNames,
    players
  }
}

/**
 * Extracts unique fantasy sports operators from the dataset.
 * Used to populate the first dropdown in the filter cascade, determining available platforms.
 * 
 * @returns Array of operator names (e.g., ['DraftKings', 'FanDuel'])
 */
export const getOperators = (): string[] => {
  const data = getFantasyData()
  return data.operators
}

/**
 * Retrieves game types available for a specific operator.
 * Enables dependent filtering where game type options change based on selected operator.
 * 
 * @param operator - The fantasy sports platform to get game types for
 * @returns Array of game type strings, empty if operator not found
 */
export const getGameTypes = (operator: string): string[] => {
  const data = getFantasyData()
  return data.gameTypes[operator] || []
}

/**
 * Fetches slate names (specific contests/tournaments) for an operator-gameType combination.
 * Completes the filter hierarchy, providing the final level of contest selection.
 * 
 * @param operator - The fantasy sports platform
 * @param gameType - The type of game within that platform
 * @returns Array of slate/contest names, empty if combination not found
 */
export const getSlateNames = (operator: string, gameType: string): string[] => {
  const data = getFantasyData()
  return data.slateNames[operator]?.[gameType] || []
}

/**
 * Retrieves the final player roster for a fully specified contest.
 * Provides the actual fantasy players with salary and projection data for lineup building.
 * 
 * @param operator - The fantasy sports platform
 * @param gameType - The type of game within that platform  
 * @param slateName - The specific contest/slate name
 * @returns Array of Player objects with fantasy-relevant data, empty if not found
 */
export const getPlayers = (operator: string, gameType: string, slateName: string): Player[] => {
  const data = getFantasyData()
  return data.players[operator]?.[gameType]?.[slateName] || []
}
