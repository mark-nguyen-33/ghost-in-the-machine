import type { Choice } from '../src/types/game'
import type { AIChoiceResponse } from '../src/types/ai'

// Checks whether Gemma's response follows our expected structure.
export function validateAIResponse(
  data: unknown,
  choice: Choice
): AIChoiceResponse {

  // Make sure the response is an object.
  if (
    typeof data !== 'object' ||
    data === null ||
    Array.isArray(data)
  ) {
    throw new Error('AI response must be an object.')
  }

  const response = data as Record<string, unknown>

  // Check the narrative.
  if (
    typeof response.narrative !== 'string' ||
    response.narrative.trim().length === 0 ||
    response.narrative.length > 3000
  ) {
    throw new Error('Invalid narrative.')
  }

  // Check the dialogue array.
  if (
    !Array.isArray(response.dialogue) ||
    response.dialogue.length > 8
  ) {
    throw new Error('Invalid dialogue array.')
  }

  for (const line of response.dialogue) {
    if (
      typeof line !== 'object' ||
      line === null ||
      typeof line.speaker !== 'string' ||
      typeof line.text !== 'string' ||
      line.speaker.trim().length === 0 ||
      line.speaker.length > 50 ||
      line.text.trim().length === 0 ||
      line.text.length > 500
    ) {
      throw new Error('Invalid dialogue entry.')
    }
  }

  // Check the adjustments object.
  if (
    typeof response.adjustments !== 'object' ||
    response.adjustments === null ||
    Array.isArray(response.adjustments)
  ) {
    throw new Error('Invalid adjustments.')
  }

  const adjustments = response.adjustments as Record<string, unknown>

  const allowedStats = [
    'familyTrust',
    'supplies',
    'savings',
    'attention',
    'outsideContacts'
  ]

  for (const [stat, amount] of Object.entries(adjustments)) {

    // Make sure Gemma only uses existing stats.
    if (!allowedStats.includes(stat)) {
      throw new Error(`Unknown stat: ${stat}`)
    }

    // Make sure the adjustment is a reasonable number.
    if (
      typeof amount !== 'number' ||
      !Number.isInteger(amount)
    ) {
      throw new Error(`Invalid adjustment for ${stat}`)
    }

    // Get the allowed adjustment range for this choice.
    const limit = choice.adjustmentLimits[
      stat as keyof typeof choice.adjustmentLimits
    ]

    if (!limit) {
      throw new Error(`No adjustment allowed for ${stat}`)
    }

    // Check whether the adjustment stays within the allowed range.
    if (amount < limit.min || amount > limit.max) {
      throw new Error(`Adjustment exceeds limit for ${stat}`)
    }
  }

  return {
    narrative: response.narrative,
    dialogue: response.dialogue as AIChoiceResponse['dialogue'],
    adjustments: adjustments as AIChoiceResponse['adjustments']
  }
}