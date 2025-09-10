## Overview

ts_pokedex is a lightweight CLI REPL application that lets you explore Pokémon data by location. It utilizes the [PokeApi](https://pokeapi.co/docs/v2#info) to get details about the pokemon universe. It also utilizes simple cache mechanism for recent queries to the API.

### Features

- Interactive REPL: Enter commands like map <location-area> to list available Pokémon.
- Pagination support: Navigate through paginated results (next, prev).
- (SOON) Colorized output using chalk, highlighting Pokémon types in their signature colors.
- Well-typed with TypeScript, keeping API calls and state management robust.
- Test suite using Vitest, with mocked PokeAPI and CLI I/O.



## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- Git for cloning

### Installation
```
git clone https://github.com/gingerknight/ts_pokedex.git
cd ts_pokedex
npm install
```

### Run the REPL
```
npm run dev
```
You will be greeted with a prompt like this:
```
~/dev/ts_pokedex main
❯ npm run dev

> ts_pokedex@1.0.0 dev
> npx tsc && node dist/main.js

(╯°□°)╯︵◓ >>
```
> Use `help` to get learn what commands are available

### Project Structure
```
src/
├── command_map.ts      ← `map` command logic
├── command_map_back.ts ← `prev` command logic
├── repl.ts             ← REPL loop & input handling
├── pokeapi.ts          ← API client for fetching Pokémon data
├── state.ts            ← Shared state (commands, pokeApi, pagination)
└── ...                 ← Other commands and utils
tests/
├── cmd_map.test.ts
├── repl.test.ts
└── ...other tests
```

## Writing Tests
Vitest is the test running. You can write tests for:
- Pure Logic (cleanInput, parseCommand)
- UI commands (commandMap, commandMapBack) with mocks and console spies
- Error normalization and graceful fallback behavior

To run tests:
```
npm run test
```

## Future Enhancements
- Add commands like pokemon <name> to fetch details about the capture pokemon
- Add rich temrinal enhancements like colors for pokemon types, and table formatting
- Package as global CLI (avilable via npm)
