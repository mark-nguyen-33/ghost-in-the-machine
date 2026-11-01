
import type { Scene } from '../types/game'

// All AI adjustments are additional to the base consequences.
// Positive values increase a stat; negative values decrease it.
export const scenes: Scene[] = [
  // SCENE 1: THE LETTER
  {
    id: 'scene1',
    date: 'AMSTERDAM · JULY 1942',
    title: 'The Letter',
    paragraphs: [
      'It is a warm morning in July 1942, and Amsterdam feels quieter than it used to. Over the past year, new rules have narrowed your family’s world: the yellow star sewn onto your coats, the shops you may visit only at certain hours, the bicycles you are no longer allowed to ride.',
      'Inside your apartment, you and David have tried to keep life steady. You cook what you can, mend what you have, and speak in low voices in the evenings once Anna is asleep.',
      'You have heard whispers of people being sent to “work camps” in the east, and of families who quietly disappeared overnight. No one seems to know what is true.',
      'The letter arrived in the morning. It was addressed to your husband, David.',
      'Its language is formal and strangely vague. It instructs him to report to the authorities for a labor assignment. You have heard troubling accounts of other families receiving similar letters.',
      'Your daughter, Anna, sits at the kitchen table with her favorite book. She has not noticed how quietly you and David are speaking.',
      'David reads the letter a second time, as though it might say something different. When he finally looks up, you can tell he is thinking what you are thinking: that some families have already chosen not to answer such a letter at all.',
      'Somewhere in the back of your mind is a conversation you and David have only half finished, about a place where the family might hide if it ever came to that.',
      'You have little time to decide what to do, but you do not know exactly how much time you have.'
    ],
    choices: [
      {
        id: 'neighbor',
        title: 'Ask a trusted neighbor for help',
        description: 'Approach someone you know, even though involving them could put them at risk.',
        baseConsequences: {
          outsideContacts: 1,
          attention: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 3 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'escape',
        title: 'Investigate a way out of the Netherlands',
        description: 'Look into possible routes, documents, and people who might help.',
        baseConsequences: {
          savings: -10,
          attention: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -2, max: 3 },
          supplies: { min: -2, max: 4 },
          savings: { min: -30, max: 10 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: false
      },
      {
        id: 'community',
        title: 'Seek advice from the local community',
        description: 'Try to find reliable information from people facing similar circumstances.',
        baseConsequences: {
          outsideContacts: 1,
          attention: 2,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 2 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: false
      },
      {
        id: 'prepare',
        title: 'Begin preparing the family',
        description: 'Quietly organize essential belongings and go to your planned hiding spot.',
        baseConsequences: {
          attention: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -2, max: 4 },
          savings: { min: -30, max: 5 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      },
      {
        id: 'wait',
        title: 'Wait and gather more information',
        description: 'Avoid making a rushed decision until you understand the situation better.',
        baseConsequences: {
          attention: 1,
          familyTrust: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 5 },
          savings: { min: -20, max: 20 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      }
    ]
  },

  // SCENE 2: A PLACE TO HIDE
  {
    id: 'scene2',
    date: 'AMSTERDAM · JULY 1942',
    title: 'A Place to Hide',
    paragraphs: [
      'The family has found a temporary place to stay. It is not a home, and the arrangement depends on the cooperation of people outside your family.',
      'The rooms are small. Ordinary activities now require careful planning, and even a quiet conversation can feel unusually loud.',
      'Anna is trying to understand why she cannot go outside whenever she wants. You and David try to keep her days as normal as possible.',
      'During the day, you must move quietly and speak more quietly still. Anyone nearby might hear a footstep or a cough, so the hours pass in whispers and careful stillness. Only at night does the family dare to stretch their legs.'
    ],
    choices: [
      {
        id: 'routine',
        title: 'Establish a daily routine',
        description: 'Give Anna a predictable schedule and familiar activities.',
        baseConsequences: {
          attention: 1,
          familyTrust: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'contact',
        title: 'Maintain contact with someone outside',
        description: 'Try to preserve a connection to the world beyond the hiding place.',
        baseConsequences: {
          outsideContacts: 1,
          attention: 2,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 4 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: true
      },
      {
        id: 'supplies',
        title: 'Organize the available supplies',
        description: 'Make an inventory and discuss how to use what you have carefully.',
        baseConsequences: {
          familyTrust: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 3 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'family',
        title: 'Spend time together as a family',
        description: 'Prioritize conversation, reassurance, and small moments of normality.',
        baseConsequences: {
          familyTrust: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 3 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      }
    ]
  },

  // SCENE 3: COMPLICATIONS
  {
    id: 'scene3',
    date: 'AMSTERDAM · AUTUMN 1942',
    title: 'Complications',
    paragraphs: [
      'The weeks have become difficult to distinguish from one another. News arrives irregularly, and much of it is uncertain.',
      'A person who had been helping with errands has not appeared as expected. Your supplies are becoming more difficult to manage.',
      'David thinks you should be cautious about asking for additional help. You worry about what might happen if you become too isolated.'
    ],
    choices: [
      {
        id: 'ask',
        title: 'Ask for help with supplies',
        description: 'Contact someone you trust and explain the situation.',
        baseConsequences: {
          attention: 1,
          savings: -15,
          supplies: 4
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 3 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: false
      },
      {
        id: 'conserve',
        title: 'Make the supplies last longer',
        description: 'Review what you have and adjust the household routine.',
        baseConsequences: {
          supplies: 4,
          familyTrust: -2
        },
        adjustmentLimits: {
          familyTrust: { min: -2, max: 1 },
          supplies: { min: -1, max: 3 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'information',
        title: 'Try to learn what is happening outside',
        description: 'Seek reliable news without relying on rumors.',
        baseConsequences: {
          outsideContacts: 1,
          attention: 2,
          supplies: 2
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -1, max: 2 },
          savings: { min: -20, max: 5 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: false
      },
      {
        id: 'reassure',
        title: 'Focus on Anna and the family',
        description: 'Try to reduce tension and help everyone cope with uncertainty.',
        baseConsequences: {
          familyTrust: 2,
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'struggle_through',
        title: 'Try to endure after doing all you could',
        description: 'Things are rough but your family must try to ednure',
        baseConsequences: {
          familyTrust: -3
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      }
    ]
  },

  // SCENE 4: A LITTLE LIGHT
  {
    id: 'scene4',
    date: 'AMSTERDAM · DECEMBER 1942',
    title: 'A Little Light',
    paragraphs: [
      'It is Hanukkah. The celebration is smaller and quieter than in previous years, but you have found a way to mark the occasion.',
      'There is no proper menorah, only a few candle stubs and a makeshift holder. Anna watches each flame as it is lit, and for a moment the small room feels warmer.',
      'She remembers celebrations from before the family went into hiding. She asks whether things will ever be like that again.',
      'For a little while, the family can focus on something other than the uncertainty outside.'
    ],
    choices: [
      {
        id: 'celebrate',
        title: 'Celebrate together as a family',
        description: 'Make the evening feel special, even with limited supplies.',
        baseConsequences: {
          familyTrust: 1,
          savings: -10,
          attention: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -2, max: 2 },
          savings: { min: -20, max: 5 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      },
      {
        id: 'stories',
        title: 'Share memories from before the war',
        description: 'Tell Anna stories about family traditions and familiar places.',
        baseConsequences: {
          familyTrust: 1,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: false
      },
      {
        id: 'hope',
        title: 'Gather all you know for a celebration',
        description: 'In these trying times your family forgets it all to have one day of joy.',
        baseConsequences: {
          familyTrust: 2,
          savings: -10,
          attention: 2
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      },
      {
        id: 'quiet',
        title: 'Keep the evening simple and quiet',
        description: 'Avoid drawing attention and spend a peaceful evening together.',
        baseConsequences: {
          familyTrust: -2,
          supplies: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -2, max: 2 },
          savings: { min: -10, max: 5 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      }
    ]
  },

  // SCENE 5: AN UNCERTAIN FUTURE
  {
    id: 'scene5',
    date: 'AMSTERDAM · EARLY 1943',
    title: 'An Uncertain Future',
    paragraphs: [
      'Another season has passed. The family has adapted to routines that once seemed impossible, but uncertainty remains.',
      'You think about the people who have helped you, the people you have not heard from, and the life your family had before all of this.',
      'There is no way to know what the coming months will bring. For now, you must decide how to face them together.'
    ],
    choices: [
      {
        id: 'continue',
        title: 'Continue the current arrangement',
        description: 'Keep relying on the people and routines that have helped so far.',
        baseConsequences: {
          attention: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 1 },
          supplies: { min: -2, max: 2 },
          savings: { min: -20, max: 10 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      },
      {
        id: 'reconsider',
        title: 'Discuss changing the arrangement',
        description: 'Consider whether the current situation is still sustainable.',
        baseConsequences: {
          attention: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -2, max: 2 },
          supplies: { min: -2, max: 2 },
          savings: { min: -30, max: 10 },
          attention: { min: -1, max: 2 },
          outsideContacts: { min: -1, max: 2 }
        },
        advancesScene: true
      },
      {
        id: 'family_future',
        title: 'Focus on the family’s future',
        description: 'Talk together about hopes, fears, and what matters most.',
        baseConsequences: {
          familyTrust: 1
        },
        adjustmentLimits: {
          familyTrust: { min: -1, max: 2 },
          supplies: { min: -1, max: 3 },
          savings: { min: -10, max: 10 },
          attention: { min: -1, max: 1 },
          outsideContacts: { min: -1, max: 1 }
        },
        advancesScene: true
      }
    ]
  }
]
