
import type {
  Choice,
  Consequences,
  GameState,
  Scene
} from '../types/game'

// RESOURCE SETTINGS
const FAMILY_SIZE = 3
const MAX_SUPPLIES = 30
const SUPPLY_COST = Math.ceil(FAMILY_SIZE / 2)

function applyConsequences(
  state: GameState,
  consequences: Consequences
): GameState {
  const newStats = { ...state.stats }

  for (const [stat, change] of Object.entries(consequences)) {
    if (change === undefined) continue

    const statName = stat as keyof GameState['stats']
    newStats[statName] += change
  }

  // Keep stats within their allowed ranges
  newStats.familyTrust = Math.min(10, Math.max(0, newStats.familyTrust))
  newStats.supplies = Math.min(MAX_SUPPLIES, Math.max(0, newStats.supplies))
  newStats.savings = Math.max(0, newStats.savings)
  newStats.attention = Math.min(7, Math.max(0, newStats.attention))
  newStats.outsideContacts = Math.min(5, Math.max(0, newStats.outsideContacts))

  return { ...state, stats: newStats }
}

export function getScene(
  scenes: Scene[],
  sceneId: string
): Scene | undefined {
  return scenes.find(scene => scene.id === sceneId)
}

export function getChoice(
  scene: Scene,
  choiceId: string
): Choice | undefined {
  return scene.choices.find(choice => choice.id === choiceId)
}

export function resolveChoice(
  state: GameState,
  scene: Scene,
  choice: Choice,
  additionalDetails: string,
  aiAdjustments: Consequences = {}
): GameState {
  const combinedConsequences: Consequences = {
    ...choice.baseConsequences
  }

  for (const [stat, change] of Object.entries(aiAdjustments)) {
    if (change === undefined) continue

    const statName = stat as keyof GameState['stats']

    combinedConsequences[statName] =
      (combinedConsequences[statName] ?? 0) + change
  }

  const updatedState = applyConsequences(
    state,
    combinedConsequences
  )

  const newHistory = [
    ...updatedState.history,
    {
      sceneId: scene.id,
      choiceId: choice.id,
      additionalDetails
    }
  ]

  const newFlags = { ...updatedState.flags }

  if (scene.id === 'scene1' && choice.id === 'escape') {
    newFlags.hasExploredEscapeRoute = true
  }

  return {
    ...updatedState,
    flags: newFlags,
    history: newHistory
  }
}

export function applyDailyUpkeep(state: GameState): GameState {
  return applyConsequences(state, {
    supplies: -SUPPLY_COST
  })
}

export function advanceScene(
  state: GameState,
  scenes: Scene[],
  choice: Choice
): GameState {
  // Some choices let the player explore without advancing the story
  if (!choice.advancesScene) {
    return state
  }

  const currentIndex = scenes.findIndex(
    scene => scene.id === state.currentSceneId
  )

  const nextScene = scenes[currentIndex + 1]

  // No next scene means the player has reached the ending
  if (!nextScene) {
    return {
      ...state,
      flags: {
        ...state.flags,
        hasReachedEnding: true
      }
    }
  }

  const newFlags = { ...state.flags }

  // The family finds its hiding place when entering Scene 2
  if (nextScene.id === 'scene2') {
    newFlags.hasFoundHidingPlace = true
  }

  let newState: GameState = {
    ...state,
    currentSceneId: nextScene.id,
    flags: newFlags
  }

  // The person who had been helping stops coming when Scene 3 begins
  if (nextScene.id === 'scene3') {
    newState = applyConsequences(newState, { outsideContacts: -1 })
  }

  return newState
}
