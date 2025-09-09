import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
};

export function initState(): State {
  //create rl with createInterface();
  //create commands with getCommands()
  //return { rl, commands }
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "(╯°□°)╯︵◓ >>",
  });

  const commands = getCommands();

  const pokeApi = new PokeAPI();

  return { rl, commands, pokeApi };
}
