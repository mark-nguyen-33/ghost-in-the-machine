import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import type {
    AIChoiceRequest,
} from '../src/types/ai'

import { validateAIResponse } from './validateAIResponse'

const app = express()
const PORT = Number(process.env.PORT) || 3000

// Check that the API key exists.
const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from .env')
}

// Create the AI client.
const ai = new GoogleGenAI({ apiKey })

app.use(cors())
app.use(express.json())

// Test whether the backend is running.
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Backend is running!'
    })
})

// Generate a narrative response to a player's decision.
app.post('/api/choice', async (req, res) => {
    let prompt = ''

    try {
        const request = req.body as AIChoiceRequest

        prompt = `
            You are the narrative engine for a historical survival game
            called Ghost in the Machine.

            Your job is to generate believable fictional dialogue and
            narrative based on the player's decision.

            HISTORICAL RULES:
            - The game takes place in the Netherlands under German occupation in 1942.
            - Preserve the historical timeline and known historical facts.
            - Do not invent major historical events.
            - Do not claim fictional characters or conversations are real historical records.
            - Keep the tone grounded, respectful, and non-graphic.
            - Do not guarantee survival based on a player's choices.

            GAME STATE:
            ${JSON.stringify({
                stats: request.gameState.stats,
                flags: request.gameState.flags
            })}

            ORIGINAL NARRATIVE TEMPLATE:
            ${JSON.stringify(request.responseTemplate)}

            PLAYER'S CHOICE:
            ${request.choice.title}

            BASE CONSEQUENCES (already applied by the game):
            ${JSON.stringify(request.choice.baseConsequences)}

            ALLOWED ADDITIONAL STAT ADJUSTMENTS:
            ${JSON.stringify(request.choice.adjustmentLimits)}

            ADDITIONAL PLAYER DETAILS:
            ${request.additionalDetails || 'None provided.'}

            YOUR TASK:
            Modify the supplied narrative template based on the player's additional details.

            RULES:
            - Preserve the original narrative's important events and meaning.
            - Fill in relevant gaps using the player's suggestions where appropriate.
            - You should slightly rewrite sentences to incorporate the player's input when able.
            - Add at most one short paragraph at the end if the player's input warrants it.
            - Do not blindly accept every suggestion. Keep character reactions believable.
            - If the player's input is irrelevant or unrealistic then ignore it and just return the original narrative with no changes
            - Do not invent major historical events or claim fictional events are historical facts.
            - Keep the tone grounded, respectful, and non-graphic.
            - Make sure you adjust the stats based on the player's input as appropriate so their choices matter

            Very Important:
            - Do not accept whatever the input is if it is unrealistic or supernatural. It is better to be on the safe side and ignore possibly unrealistic input

            STAT ADJUSTMENTS:
            - Adjust stats based on the player's input but within listed adjustmentLimits.
            - Food, water, and most other items can counted as the supplies stat
            - Each adjustment must be an integer within its specified min and max.
            - Do not adjust unlisted stats.
            - Return {} if no adjustment is appropriate.

            Return ONLY valid JSON:
            {
            "narrative": "The complete modified narrative",
            "dialogue": [
                {
                "speaker": "Character name",
                "text": "Dialogue"
                }
            ],
            "adjustments": {}
            }
            `

        let response

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: 'gemini-3.5-flash-lite',
                    contents: prompt,
                    config: {
                        responseMimeType: 'application/json'
                    }
                })

                break
            } catch (error: any) {
                if (error.status !== 503 || attempt === 3) {
                    throw error
                }

                console.log(`Model busy. Retrying (${attempt}/3)...`)
                await new Promise(resolve => setTimeout(resolve, attempt * 2000))
            }
        }

        if (!response) {
            throw new Error('Model failed after 3 attempts.')
        }

        // Inspect the response if Gemini doesn't generate any text.
        if (!response.text) {
            console.error(
                'Gemini response diagnostics:',
                JSON.stringify({
                    promptFeedback: response.promptFeedback,

                    candidates: response.candidates?.map(candidate => ({
                        finishReason: candidate.finishReason,
                        finishMessage: candidate.finishMessage,
                        safetyRatings: candidate.safetyRatings
                    })),

                    usageMetadata: response.usageMetadata
                }, null, 2)
            )

            throw new Error(
                'Gemma returned no text. Check the response diagnostics above.'
            )
        }

        const result = response.text

        // Parse Gemma's JSON response.
        const parsed: unknown = JSON.parse(result)

        // Validate the response before sending it to the frontend.
        const validated = validateAIResponse(parsed, request.choice)

        res.json(validated)

    } catch (error) {
        console.error('AI request failed:', error)
        console.error('Prompt context sent to Gemini:')
        console.error(prompt)

        res.status(500).json({
            error: 'Failed to generate the narrative.',
            details: error instanceof Error ? error.message : String(error)
        })
    }
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`)
})