
import './style.css'
import { scenes } from './data/scenes'
import type { Choice, Scene, GameStats } from './types/game'
import { createInitialGameState } from './game/state'
import {
  getScene,
  getChoice,
  resolveChoice,
  applyDailyUpkeep,
  advanceScene
} from './game/storyEngine'
import { evaluateEnding, checkEarlyEnding } from './game/endingEngine'
import type { AIChoiceResponse } from './types/ai'
import { responseTemplates } from './data/responseTemplates'

const API_URL = import.meta.env.VITE_API_URL ?? ''
let gameState = createInitialGameState()
let selectedChoiceId = ''
let additionalDetails = ''
let hasResolvedChoice = false
let latestResponse: AIChoiceResponse | null = null
let latestStatChanges: Partial<Record<keyof GameStats, number>> = {}
let latestUpkeepChange = 0
let isLoading = false
let endedEarly = false
let selectedAIModel: 'gemini' | 'gemma' = 'gemini'

const app = document.querySelector<HTMLDivElement>('#app')!

function getCurrentScene(): Scene {
  return getScene(scenes, gameState.currentSceneId)!
}

function getSelectedChoice(): Choice | undefined {
  return getChoice(getCurrentScene(), selectedChoiceId)
}

function calculateStatChanges(
  previousStats: GameStats,
  newStats: GameStats
): Partial<Record<keyof GameStats, number>> {
  const changes: Partial<Record<keyof GameStats, number>> = {}

  for (const key of Object.keys(previousStats) as (keyof GameStats)[]) {
    const change = newStats[key] - previousStats[key]

    if (change !== 0) {
      changes[key] = change
    }
  }

  return changes
}

function renderHeader(): string {
  return `
    <header class="game-header">
      <h1>Ghost in the Machine</h1>
      <p>A fictional historical survival story</p>
    </header>
  `
}

function renderStatusPanel(): string {
  const stats = gameState.stats

  return `
    <section class="status-panel">
      <h2>Family Status</h2>

      <div class="stat">
        <span>Family Trust</span>
        <strong>${stats.familyTrust}/10</strong>
      </div>

      <div class="stat">
        <span>Supplies</span>
        <strong>${stats.supplies}/${30}</strong>
      </div>

      <div class="stat">
        <span>Savings</span>
        <strong>${stats.savings}</strong>
      </div>

      <div class="stat">
        <span>Attention</span>
        <strong>${stats.attention}/7</strong>
      </div>

      <div class="stat">
        <span>Outside Contacts</span>
        <strong>${stats.outsideContacts}/5</strong>
      </div>
    </section>
  `
}

function renderStoryCard(): string {
  const scene = getCurrentScene()

  return `
    <section class="story-card">
      <div class="eyebrow">${escapeHtml(scene.date)}</div>
      <h2>${escapeHtml(scene.title)}</h2>

      ${scene.paragraphs
        .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
        .join('')}
    </section>
  `
}


function renderDecisionSection(): string {
  const scene = getCurrentScene()

  const availableChoices = scene.choices.filter(choice => {
    return !gameState.history.some(
      record =>
        record.sceneId === scene.id &&
        record.choiceId === choice.id
    )
  })

  const choiceCards = availableChoices
    .map(choice => {
      const selected = choice.id === selectedChoiceId

      return `
        <button
          class="choice-card ${selected ? 'selected' : ''}"
          data-choice-id="${escapeHtml(choice.id)}"
          type="button"
          aria-pressed="${selected}"
        >
          <span class="choice-title">${escapeHtml(choice.title)}</span>
          <span class="choice-description">${escapeHtml(choice.description)}</span>
        </button>
      `
    })
    .join('')

  const noChoicesMessage = availableChoices.length === 0
    ? '<p>You have explored all available choices in this scene.</p>'
    : ''

  const selectionControls = selectedChoiceId && !hasResolvedChoice
    ? `
      <div class="choice-details">
        <label for="additional-details">
          Any additional details? (Optional)
        </label>

        <textarea
          id="additional-details"
          placeholder="Describe how you want your character to approach this decision..."
        ></textarea>

        <label for="ai-model">Narrative AI:</label>

        <select id="ai-model">
          <option value="gemini" ${selectedAIModel === 'gemini' ? 'selected' : ''}>
            Gemini (Recommended)
          </option>
          <option value="gemma" ${selectedAIModel === 'gemma' ? 'selected' : ''}>
            Gemma (Open Weights)
          </option>
        </select>

        <button id="confirm-button" class="primary-button">
          Confirm choice
        </button>
      </div>
    `
    : ''

  return `
    <section class="decision-section">
      <h2>What will you do?</h2>

      <div class="choice-list">
        ${choiceCards}
      </div>

      ${noChoicesMessage}
      ${selectionControls}
    </section>
  `
}



function renderDialogue(): string {
  if (!latestResponse) return ''

  const dialogue = latestResponse.dialogue ?? []

  return `
    <section class="dialogue-section">
      <h3>What happens next</h3>

      <p>${escapeHtml(latestResponse.narrative)}</p>

      ${dialogue.map(line => `
        <p>
          <strong>${escapeHtml(line.speaker)}:</strong>
          ${escapeHtml(line.text)}
        </p>
      `).join('')}
    </section>
  `
}


function renderStatChanges(): string {
  const changes = Object.entries(latestStatChanges)

  if (changes.length === 0) {
    return ''
  }

  const labels: Record<string, string> = {
    familyTrust: 'Family Trust',
    supplies: 'Supplies',
    savings: 'Savings',
    attention: 'Attention',
    outsideContacts: 'Outside Contacts'
  }

  return `
    <section class="stat-changes">
      <h3>Changes</h3>

      ${changes
        .map(([stat, change]) => {
          const sign = (change ?? 0) > 0 ? '+' : ''

          return `
            <p>
              ${labels[stat]}:
              ${sign}${change}
            </p>
          `
        })
        .join('')}

      ${
        latestUpkeepChange !== 0
          ? `<p>Daily supplies used: ${Math.abs(latestUpkeepChange)}</p>`
          : ''
      }
    </section>
  `
}

function renderSceneEntryNotice(): string {
  if (gameState.currentSceneId !== 'scene3') return ''

  return `
    <section class="scene-notice">
      <p>Outside Contacts: -1. The person who helped with errands has stopped coming.</p>
    </section>
  `
}

function renderResponseSection(): string {
  if (!hasResolvedChoice) return ''

  const choice = getSelectedChoice()
  const sceneIndex = scenes.findIndex(
    scene => scene.id === gameState.currentSceneId
  )

  return `
    <section class="response-section">
      ${renderDialogue()}
      ${renderStatChanges()}

      <button id="continue-button" class="primary-button">
        ${
          checkEarlyEnding(gameState)
            ? 'See what happens'
            : !choice?.advancesScene
              ? 'Return to choices'
              : sceneIndex === scenes.length - 1
                ? 'Finish story'
                : 'Continue'
        }
      </button>
    </section>
  `
}

function renderFooter(): string {
  return `
    <footer class="game-footer">
      <p>
        This is a fictional story inspired by historical events.
        It does not represent every person's experience.
      </p>
    </footer>
  `
}

function render(): void {
  if (gameState.flags.hasReachedEnding) {
    showEnding()
    return
  }

  app.innerHTML = `
    <main class="game">
      ${renderHeader()}

      <div class="game-layout">
        <div class="main-column">
          ${renderStoryCard()}
          ${renderSceneEntryNotice()}
          ${renderDecisionSection()}
          ${renderResponseSection()}
        </div>

        <aside class="side-column">
          ${renderStatusPanel()}
        </aside>
      </div>

      ${renderFooter()}
    </main>
  `

  attachEventListeners()
}

function attachEventListeners(): void {
  // Selecting a choice
  document.querySelectorAll<HTMLButtonElement>('[data-choice-id]')
    .forEach(button => {
      button.addEventListener('click', () => {
        if (hasResolvedChoice || isLoading) return

        selectedChoiceId = button.dataset.choiceId ?? ''
        additionalDetails = ''
        render()
      })
    })

  // Confirming a choice
  const confirmButton =
    document.querySelector<HTMLButtonElement>('#confirm-button')

  confirmButton?.addEventListener('click', confirmChoice)

  // Returning to choices or advancing the story
  const continueButton =
    document.querySelector<HTMLButtonElement>('#continue-button')

  continueButton?.addEventListener('click', () => {
    const choice = getSelectedChoice()
    if (!choice) return
    
    // End the story early if supplies ran out or attention got too high
    if (checkEarlyEnding(gameState)) {
      endedEarly = true
      gameState = {
        ...gameState,
        flags: { ...gameState.flags, hasReachedEnding: true }
      }
      showEnding()
      return
    }

    gameState = advanceScene(gameState, scenes, choice)

    if (gameState.flags.hasReachedEnding) {
      showEnding()
      return
    }

    selectedChoiceId = ''
    additionalDetails = ''
    hasResolvedChoice = false
    latestResponse = null
    latestStatChanges = {}
    latestUpkeepChange = 0
    isLoading = false

    render()
  })

  // Additional details
  const modelInput =
      document.querySelector<HTMLSelectElement>('#ai-model')

  modelInput?.addEventListener('change', () => {
      selectedAIModel = modelInput.value as 'gemini' | 'gemma'
  })

  const detailsInput =
    document.querySelector<HTMLTextAreaElement>('#additional-details')

  detailsInput?.addEventListener('input', () => {
    additionalDetails = detailsInput.value
  })
}


async function confirmChoice(): Promise<void> {
  const choice = getSelectedChoice()
  if (!choice || hasResolvedChoice || isLoading) return

  isLoading = true

  const confirmButton =
    document.querySelector<HTMLButtonElement>('#confirm-button')

  if (confirmButton) {
    confirmButton.disabled = true
    confirmButton.textContent = 'Processing...'
  }

  const scene = getCurrentScene()
  const previousStats = { ...gameState.stats }

  try {
    // Find the response template using the choice's title
    const responseTemplate = responseTemplates[choice.title]

    let aiResponse: AIChoiceResponse

    // If there are no additional details, use the prepared response
    if (!additionalDetails.trim() && responseTemplate) {
      aiResponse = {
        narrative: responseTemplate.narrative,
        dialogue: responseTemplate.dialogue,
        adjustments: {}
      }
    } else {
      // Otherwise, ask the AI to generate a response
      const response = await fetch(`${API_URL}/api/choice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          scene,
          choice,
          gameState,
          additionalDetails,
          responseTemplate,
          model: selectedAIModel
        })
      })

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }

      aiResponse = await response.json()
    }

    latestResponse = aiResponse

    gameState = resolveChoice(
      gameState,
      scene,
      choice,
      additionalDetails,
      aiResponse.adjustments ?? {}
    )

    // Apply the daily cost of maintaining the family's supplies
    const beforeUpkeep = { ...gameState.stats }
    gameState = applyDailyUpkeep(gameState)

    latestStatChanges = calculateStatChanges(
      previousStats,
      beforeUpkeep
    )

    latestUpkeepChange =
      gameState.stats.supplies - beforeUpkeep.supplies

    hasResolvedChoice = true

  } catch (error) {
    console.error('Could not generate AI narrative:', error)
    
    // Use the prepared response if the AI request fails
    const fallbackTemplate = responseTemplates[choice.title]

    latestResponse = {
      narrative:
        fallbackTemplate?.narrative ??
        'The family considers the consequences of this decision.',
      dialogue: fallbackTemplate?.dialogue ?? [],
      adjustments: {}
    }

    gameState = resolveChoice(
      gameState,
      scene,
      choice,
      additionalDetails
    )

    const beforeUpkeep = { ...gameState.stats }
    gameState = applyDailyUpkeep(gameState)

    latestStatChanges = calculateStatChanges(
      previousStats,
      beforeUpkeep
    )

    latestUpkeepChange =
      gameState.stats.supplies - beforeUpkeep.supplies

    hasResolvedChoice = true

  } finally {
    isLoading = false
    render()
  }
}


function showEnding(): void {
  const ending = endedEarly
    ? checkEarlyEnding(gameState)!
    : evaluateEnding(gameState)
    
  app.innerHTML = `
    <main class="game ending-screen">
      ${renderHeader()}

      <section class="story-card">
        <div class="eyebrow">YOUR STORY'S OUTCOME</div>

        <h2>${escapeHtml(ending.title)}</h2>

        <p>${escapeHtml(ending.narrative)}</p>

        <p>
          The experiences of people living through the Holocaust
          were complex and varied. This fictional story represents
          only one imagined family's experience.
        </p>

        <button id="restart-button" class="primary-button">
          Start again
        </button>
      </section>
    </main>
  `

  document
    .querySelector<HTMLButtonElement>('#restart-button')!
    .addEventListener('click', () => {
      gameState = createInitialGameState()
      endedEarly = false
      selectedChoiceId = ''
      additionalDetails = ''
      hasResolvedChoice = false
      latestResponse = null
      latestStatChanges = {}
      latestUpkeepChange = 0
      isLoading = false

      render()
    })
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Start the game
render()
