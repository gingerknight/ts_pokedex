import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  //console.log("help man");
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  for (const [name, cmd] of Object.entries(commands)) {
    console.log(`${name}: ${cmd.description}`);
  }
}
