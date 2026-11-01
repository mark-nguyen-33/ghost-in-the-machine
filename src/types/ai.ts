import type {
  GameState,
  Scene,
  Choice,
  Consequences
} from './game'

import type { ResponseTemplate } from '../data/responseTemplates'

export type AIChoiceRequest = {
  scene: Scene
  choice: Choice
  gameState: GameState
  additionalDetails: string
  responseTemplate: ResponseTemplate
}

// A single line of character dialogue.
export type AIDialogue = {
  speaker: string
  text: string
}

// Information returned by the AI.
export type AIChoiceResponse = {
  narrative: string
  dialogue: AIDialogue[]
  adjustments: Consequences
}