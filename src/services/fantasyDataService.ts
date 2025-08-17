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

// Parse the raw data and organize it into the structure we need
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

export const getOperators = (): string[] => {
  const data = getFantasyData()
  return data.operators
}

export const getGameTypes = (operator: string): string[] => {
  const data = getFantasyData()
  return data.gameTypes[operator] || []
}

export const getSlateNames = (operator: string, gameType: string): string[] => {
  const data = getFantasyData()
  return data.slateNames[operator]?.[gameType] || []
}

export const getPlayers = (operator: string, gameType: string, slateName: string): Player[] => {
  const data = getFantasyData()
  return data.players[operator]?.[gameType]?.[slateName] || []
}
