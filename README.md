# Ghost in the Machine

An AI-powered historical survival narrative game built with TypeScript, Express, and Google's Gemini API.

## About the Project

*Ghost in the Machine* is an interactive narrative game inspired by the experiences of Jewish families during the Holocaust.

The player takes the role of a parent trying to protect their family while navigating the uncertainty, difficult decisions, and dangers of life under Nazi occupation in the Netherlands during 1942.

Players make decisions that influence their family's circumstances, relationships, available resources, and ultimately the direction of their story.

The game combines a predetermined historical timeline with AI-generated narrative responses, allowing for more personalized interactions while maintaining the structure of the story.

**Note:** The characters and family depicted in the game are fictional. The project is inspired by historical events and is not intended to recreate the experiences of any specific historical individual.

## Features

- **Interactive storytelling:** Make decisions that influence how the story unfolds.
- **AI-generated responses:** Gemini generates narrative passages and character dialogue based on player choices.
- **Dynamic game statistics:** Choices can affect family trust, supplies, savings, attention, and outside contacts.
- **Consequences and endings:** Player decisions influence the family's circumstances and possible outcomes.
- **Historical setting:** The story is grounded in the historical context of the Holocaust and Nazi occupation of the Netherlands.

## Technologies Used

| Technology | Purpose |
|---|---|
| TypeScript | Game logic, state management, and frontend |
| Vite | Frontend development and build tooling |
| Node.js | Backend runtime |
| Express | Backend API |
| Google Gemini API | AI-generated narrative and dialogue |

## How It Works

The game uses a combination of predetermined story content and AI-generated responses.

1. The player selects a choice within the current scene.
2. The frontend sends the selected choice, current game state, and optional player details to the Express backend.
3. The backend sends the relevant context to Gemini.
4. Gemini generates a narrative response, character dialogue, and proposed adjustments to game statistics.
5. The backend validates the AI response before returning it.
6. The game engine applies the approved adjustments and updates the game state.

This approach allows AI to add variety to the storytelling without giving it unrestricted control over the game's underlying mechanics.

## Running Locally

### Prerequisites

- Node.js and npm
- A Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mark-nguyen-33/ghost-in-the-machine.git
   cd ghost-in-the-machine
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your own Gemini API key.

### Starting the Application

The frontend and backend run separately during development.

**Terminal 1 — Start the backend:**

```bash
npm run server
```

**Terminal 2 — Start the frontend:**

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Project Structure

```text
ghost-in-the-machine/
├── server/
│   ├── server.ts
│   └── validate
