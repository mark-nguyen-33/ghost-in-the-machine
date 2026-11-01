
import type { GameState } from '../types/game'

export function createInitialGameState(): GameState {
  return {
    currentSceneId: 'scene1',

    stats: {
      familyTrust: 5,
      supplies: 10,
      savings: 200,
      attention: 2,
      outsideContacts: 1
    },

    flags: {
      hasFoundHidingPlace: false,
      hasExploredEscapeRoute: false,
      hasReachedEnding: false
    },

    history: []
  }
}
