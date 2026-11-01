
// The normal effects of a player's choice
export type Consequences = Partial<Record<keyof GameStats, number>>

// The minimum and maximum amount AI can adjust each consequence
export type AdjustmentLimits = Partial<
  Record<keyof GameStats, { min: number; max: number }>
>

// Represents a single pre-determined choice the player can choose in a scene
export type Choice = {
  id: string
  title: string
  description: string
  baseConsequences: Consequences
  adjustmentLimits: AdjustmentLimits

  // Determines whether selecting this choice advances the story
  advancesScene: boolean
}

export type Scene = {
  id: string
  date: string
  title: string
  paragraphs: string[]
  choices: Choice[]
}

export type GameStats = {
  familyTrust: number
  supplies: number
  savings: number
  attention: number
  outsideContacts: number
}

// Keeps track of the player's progress along the fixed general story line
export type StoryFlags = {
  hasFoundHidingPlace: boolean
  hasExploredEscapeRoute: boolean
  hasReachedEnding: boolean
}

// Tracks the player's decisions from previous scenes
export type DecisionRecord = {
  sceneId: string
  choiceId: string
  additionalDetails: string
}

// Represents the overall state of the game at any given time
export type GameState = {
  currentSceneId: string
  stats: GameStats
  flags: StoryFlags
  history: DecisionRecord[]
}

// Possible endings
export type EndingId =
  | 'net_closes'
  | 'difficult_journey'
  | 'expensive_escape'
  | 'together_but_changed'
  | 'uncertain_tomorrow'
  | 'holding_on_alone'
  | 'arrangement_breaks_down'
  | 'unfinished_story'
  | 'rescued_but_changed'
  | 'rescued'
  | 'out_of_supplies'
  | 'too_much_attention'

export type Ending = {
  id: EndingId
  title: string
  narrative: string
}
