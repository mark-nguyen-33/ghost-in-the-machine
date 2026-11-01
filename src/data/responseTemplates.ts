
export type ResponseTemplate = {
  narrative: string
  dialogue: {
    speaker: string
    text: string
  }[]
}

export const responseTemplates: Record<string, ResponseTemplate> = {

  // SCENE 1: THE LETTER

  'Ask a trusted neighbor for help': {
    narrative:
      'You approach your neighbor carefully. After explaining your situation, you ask whether they might be able to offer assistance. They listen quietly, aware that helping your family could put them at risk. You leave the conversation uncertain about what they will be able to do.',
    dialogue: [
      {
        speaker: 'Neighbor',
        text: '"I will see what I can do. Please be careful."'
      }
    ]
  },

  'Investigate a way out of the Netherlands': {
    narrative:
      'You and David begin considering whether leaving the Netherlands is possible. You discuss what documents the family has, how much money is available, and whether anyone might know more about the practical difficulties of travel. Every possibility raises new questions, and you realize that making arrangements could be difficult and uncertain.',
    dialogue: [
      {
        speaker: 'David',
        text: '"We need to understand what is actually possible before we make a decision."'
      }
    ]
  },

  'Seek advice from the local community': {
    narrative:
      'You look for an opportunity to speak with people in the local community who may have heard reliable information. Some are frightened and reluctant to talk openly; others share what they have heard while admitting that much remains uncertain. You return with a few useful leads, but no clear answer about what your family should do.',
    dialogue: [
      {
        speaker: 'Community member',
        text: '"Please be careful about what you hear. Not every story going around is true."'
      }
    ]
  },

  'Begin preparing the family': {
    narrative:
      'You quietly begin sorting the family’s belongings, setting aside a few practical necessities and deciding what could be carried if you had to leave. David helps make a list while you try to explain the changes to Anna in a way she can understand. The preparations give you something useful to do, though they do not make the uncertainty disappear.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"Are we going somewhere, or are we just putting things away?"'
      },
      {
        speaker: 'David',
        text: '"We are getting organized. We will explain more when we know more."'
      }
    ]
  },

  'Wait and gather more information': {
    narrative:
      'You decide not to make an immediate move. Instead, you and David try to compare what you have heard and look for information from sources you consider more dependable. Waiting gives you time to think, but it also leaves the family facing the same unanswered questions.',
    dialogue: [
      {
        speaker: 'David',
        text: '"I understand wanting to wait. I just hope we learn something useful soon."'
      }
    ]
  },

  // SCENE 2: A PLACE TO HIDE

  'Establish a daily routine': {
    narrative:
      'You work out a simple schedule for the day, with familiar activities for Anna and regular times for meals, reading, and rest. The routine gives everyone something predictable to rely on. It cannot make the rooms larger or remove the worries outside, but it helps the days feel a little less uncertain.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"Can we read the next chapter at the same time tomorrow?"'
      },
      {
        speaker: 'You',
        text: '"Yes. Let us make that part of our day."'
      }
    ]
  },

  'Maintain contact with someone outside': {
    narrative:
      'You consider how to maintain a connection with someone beyond the place where your family is staying. You and David discuss whom you trust and what information or help might be useful. Keeping in touch could bring reassurance and practical support, but it also requires care because other people may face risks by becoming involved.',
    dialogue: [
      {
        speaker: 'David',
        text: '"It matters that we are not completely cut off, but we must think carefully about who we contact."'
      }
    ]
  },

  'Organize the available supplies': {
    narrative:
      'You and David gather what supplies you have and begin making an inventory. Every item is considered carefully, and you discuss how to make what you have last. The task is ordinary, but the circumstances make even simple decisions feel important.',
    dialogue: [
      {
        speaker: 'David',
        text: '"We should make sure we know exactly what we have."'
      }
    ]
  },

  'Spend time together as a family': {
    narrative:
      'You set aside time to be together without focusing on lists or difficult decisions. You listen to Anna talk about her book and ask David about something he remembers from before the family went into hiding. For a while, the conversation turns toward familiar things. The worries remain, but the family has shared a moment that is not defined entirely by them.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"I like it when we all sit together like this."'
      },
      {
        speaker: 'David',
        text: '"So do I. We should make time for it when we can."'
      }
    ]
  },

  // SCENE 3: COMPLICATIONS

  'Ask for help with supplies': {
    narrative:
      'You decide to contact someone you trust and explain that the family is having difficulty managing its supplies. You try to be clear about what would help without asking for more than the person can safely offer. The conversation is uncomfortable, but the person listens and says they will consider what may be possible. You do not know when, or whether, help will arrive.',
    dialogue: [
      {
        speaker: 'Contact',
        text: '"I cannot promise anything, but I will see what I can do."'
      }
    ]
  },

  'Make the supplies last longer': {
    narrative:
      'You review the household supplies with David and consider how to make them last. You discuss portions, reduce unnecessary waste, and adjust the daily routine where you can. The changes require cooperation from everyone, especially Anna, who does not always understand why familiar habits have to change.',
    dialogue: [
      {
        speaker: 'David',
        text: '"We cannot make more appear, but we can be careful with what we have."'
      },
      {
        speaker: 'Anna',
        text: '"I can help keep track if you show me how."'
      }
    ]
  },

  'Try to learn what is happening outside': {
    narrative:
      'You look for dependable news about events beyond the hiding place. Different accounts do not always agree, so you try to separate what someone has witnessed from what has merely been repeated. You gain a little more context, but the information offers no certainty about what will happen next.',
    dialogue: [
      {
        speaker: 'David',
        text: '"We should listen, but we should not treat every rumor as fact."'
      }
    ]
  },

  'Focus on Anna and the family': {
    narrative:
      'You notice how much the uncertainty has affected the atmosphere at home. You spend time with Anna, answer what questions you can, and speak with David about how the adults can support one another. You cannot promise that everything will be all right, but you can make sure Anna knows that she is being listened to and cared for.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"You do not know when things will change, do you?"'
      },
      {
        speaker: 'You',
        text: '"No, not yet. But we are here together, and you can always talk to us."'
      }
    ]
  },

  // SCENE 4: A LITTLE LIGHT

  'Celebrate together as a family': {
    narrative:
      'You make a modest effort to mark Hanukkah together. The celebration is quieter and simpler than those you remember, and you use only what the family can spare. Anna takes part with care, while David helps create a familiar sense of occasion. The evening does not change the circumstances outside, but it gives the family time to observe a meaningful tradition.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"It is different this year, but I am glad we are doing it together."'
      },
      {
        speaker: 'David',
        text: '"So am I. The tradition still matters, even when things are difficult."'
      }
    ]
  },

  'Share memories from before the war': {
    narrative:
      'You begin telling Anna about family traditions, familiar streets, and ordinary moments from life before the war. David adds details that you had forgotten, and Anna asks questions about places she remembers only faintly. The memories bring comfort, though they also remind everyone how much has changed.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"Do you think we will visit those places again someday?"'
      },
      {
        speaker: 'You',
        text: '"I hope so. I am glad we can remember them together."'
      }
    ]
  },

  'Talk about the future': {
    narrative:
      'You invite David and Anna to talk about what they hope to do when the family can leave hiding. You keep the conversation open rather than making promises you cannot guarantee. Anna imagines returning to familiar activities, while David speaks about the ordinary freedom of making plans. For a little while, the family can think beyond the immediate routine.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"When things are different, I want to go to the park again."'
      },
      {
        speaker: 'David',
        text: '"I would like that too. We can hope for it without pretending we know when it will happen."'
      }
    ]
  },

  'Keep the evening simple and quiet': {
    narrative:
      'You decide to keep the evening low-key. The family spends time together without making elaborate preparations, choosing a quiet conversation and a familiar activity instead. The simplicity feels appropriate to the circumstances, and everyone has a chance to rest. It is not the celebration you once imagined, but the evening still belongs to the family.',
    dialogue: [
      {
        speaker: 'David',
        text: '"A quiet evening together is enough for tonight."'
      },
      {
        speaker: 'Anna',
        text: '"Can we sit together a little longer?"'
      }
    ]
  },

  // SCENE 5: AN UNCERTAIN FUTURE

  'Continue the current arrangement': {
    narrative:
      'After discussing the situation, you decide to continue with the current arrangement for now. The familiar routines and existing relationships offer some stability, even though they cannot remove the uncertainty. You and David agree to keep paying attention to changing circumstances and to revisit the decision if needed.',
    dialogue: [
      {
        speaker: 'David',
        text: '"For now, we know how this arrangement works. We will keep talking and reconsider if we need to."'
      }
    ]
  },

  'Discuss changing the arrangement': {
    narrative:
      'You and David talk honestly about whether the current arrangement can continue. You consider the strain on the family, the people who have been helping, and the uncertainty surrounding any alternative. There is no simple answer. The discussion does not settle everything, but it helps you understand one another’s concerns before making any further decisions.',
    dialogue: [
      {
        speaker: 'David',
        text: '"I do not want us to make a decision out of fear alone. Let us consider what we know and what we do not."'
      },
      {
        speaker: 'You',
        text: '"Whatever we decide, I want us to decide together."'
      }
    ]
  },

  'Focus on the family’s future': {
    narrative:
      'You make time to talk as a family about what matters most and what each of you hopes for. Anna speaks about ordinary things she misses, while you and David share hopes that are more difficult to put into words. You avoid promising a particular outcome. Instead, the conversation becomes a way to listen to one another and acknowledge that you are facing uncertainty together.',
    dialogue: [
      {
        speaker: 'Anna',
        text: '"I want us to do ordinary things together again."'
      },
      {
        speaker: 'David',
        text: '"That is something we can all hope for. We will take things one day at a time."'
      }
    ]
  }
}
