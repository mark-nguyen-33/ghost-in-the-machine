
import type { Ending, GameState } from '../types/game'

function calculateRiskScore(state: GameState): number {
  return state.stats.attention - state.stats.outsideContacts
}

// Checks whether the story should end immediately, before the final scene.
// Returns null if the story can continue.
export function checkEarlyEnding(state: GameState): Ending | null {
  if (state.stats.attention >= 7) {
    return {
      id: 'too_much_attention',
      title: 'Too Much Attention',
      narrative:
        'Too many people have begun to notice the family. Every careful ' +
        'arrangement depended on staying unseen, and that is no longer ' +
        'possible. The hiding place can no longer be kept safe, and ' +
        'what happens next is uncertain.'
    }
  }

  if (state.stats.supplies <= 0) {
    return {
      id: 'out_of_supplies',
      title: 'Running Out',
      narrative:
        'The last of the family’s supplies are gone. Without food and ' +
        'other necessities, the arrangement cannot continue, and they ' +
        'must find help or leave the place that has sheltered them. ' +
        'The road ahead is uncertain.'
    }
  }

  return null
}

export function evaluateEnding(state: GameState): Ending {
  const {
    familyTrust,
    supplies,
    savings,
    attention,
    outsideContacts
  } = state.stats

  const {
    hasFoundHidingPlace,
    hasExploredEscapeRoute
  } = state.flags

  const riskScore = calculateRiskScore(state)

  // ENDING 1: The Net Closes
  if (riskScore > 4) {
    return {
      id: 'net_closes',
      title: 'The Net Closes',
      narrative:
        'The family’s situation has become increasingly exposed. ' +
        'The people and arrangements they once depended on can no longer ' +
        'offer the same reassurance. Their future is uncertain, and the ' +
        'choices that remain are difficult ones.'
    }
  }

  // ENDINGS 2 AND 3: Possible escape
  if (
    hasExploredEscapeRoute &&
    outsideContacts >= 1 &&
    savings >= 150
  ) {
    if (familyTrust < 5) {
      return {
        id: 'together_but_changed',
        title: 'Together, but Changed',
        narrative:
          'The family has found a possible way forward, but the strain ' +
          'of the past months has changed their relationships. They face ' +
          'the uncertainty ahead together, carrying disagreements and ' +
          'memories that cannot simply be set aside.'
      }
    }

    return {
      id: 'difficult_journey',
      title: 'A Difficult Journey',
      narrative:
        'With help from someone outside the family and some savings ' +
        'remaining, a difficult journey becomes possible. Nothing about ' +
        'the road ahead is certain. The family must leave behind what ' +
        'they know and face an unfamiliar future.'
    }
  }

  // ENDING 4: Escape without outside contacts
  if (
    hasExploredEscapeRoute &&
    outsideContacts === 0 &&
    savings >= 230
  ) {
    return {
      id: 'expensive_escape',
      title: 'An Expensive Escape',
      narrative:
        'The family has managed to put together a possible route without ' +
        'relying on outside contacts. It has taken a great deal of their ' +
        'remaining resources, and the journey ahead will be especially ' +
        'uncertain. They have a possibility, not a guarantee.'
    }
  }

  // ENDING 5: The arrangement becomes unsustainable
  if (
    supplies === 0 &&
    !hasExploredEscapeRoute
  ) {
    return {
      id: 'arrangement_breaks_down',
      title: 'The Arrangement Breaks Down',
      narrative:
        'The family’s current arrangement has become difficult to sustain. ' +
        'The lack of supplies leaves them with fewer options, and they ' +
        'must reconsider how to seek help while protecting one another.'
    }
  }

  // ENDING 6: Maintaining the hiding place with support
  if (
    hasFoundHidingPlace &&
    supplies >= 4 &&
    outsideContacts >= 1 &&
    riskScore <= 4
  ) {
    return {
      id: 'uncertain_tomorrow',
      title: 'An Uncertain Tomorrow',
      narrative:
        'The family has managed to maintain its hiding place and preserve ' +
        'some support beyond its walls. For now, their arrangement ' +
        'continues. The outside world remains dangerous, and no one can ' +
        'know how long the situation will last.'
    }
  }

  // ENDING 7: Maintaining the hiding place alone
  if (
    hasFoundHidingPlace &&
    supplies >= 7 &&
    outsideContacts === 0 &&
    attention <= 3
  ) {
    return {
      id: 'holding_on_alone',
      title: 'Holding On Alone',
      narrative:
        'The family has managed to preserve its hiding place and keep ' +
        'attention away, but it has little support beyond itself. Their ' +
        'remaining supplies provide some stability, though maintaining ' +
        'the arrangement without outside help will remain difficult.'
    }
  }

  // ENDING 8 and 9: Suriving until rescue
  if (
    hasFoundHidingPlace &&
    supplies >= 8 &&
    outsideContacts >= 1 &&
    riskScore <= 4
  ) {
    if (familyTrust < 5) {
      return {
        id: 'rescued_but_changed',
        title: 'Rescued, but Changed',
        narrative:
          'The family has managed to survive until May of 1945 when Allied ' +
          'Forces arrive to liberate Amsterdam. Despite the good news, ' +
          'the past months changed the family\'s relationships. ' +
          'They face the uncertainty ahead together, carrying disagreements ' + 
          'and memories that cannot simply be set aside.'
      }
    }

    return {
      id: 'rescued',
      title: 'Rescued',
      narrative:
        'With help from someone on the outside, the family celebrates ' +
        'the news that Allied Forces have come to liberate Amsterdam. The ' +
        'family survived these months together and now faces an uncertain ' +
        'future. But they know they will face it together.'
    }
  }

  // DEFAULT ENDING
  return {
    id: 'unfinished_story',
    title: 'The Unfinished Story',
    narrative:
      'The family reaches the end of this chapter without a clear answer ' +
      'about what comes next. Their circumstances remain uncertain. ' +
      'Their story, like the lives of so many people during this period, ' +
      'cannot be reduced to a simple outcome.'
  }
}
