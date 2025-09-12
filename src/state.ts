import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./types/pokemon_type.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  nextUrl: string;
  prevUrl: string;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "(╯°□°)╯︵◓ >>",
  });

  const commands = getCommands();
  const pokeApi = new PokeAPI();

  return {
    rl,
    commands,
    pokeApi,
    nextUrl: "",
    prevUrl: "",
    pokedex: {},
  };
}
