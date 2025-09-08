import { CLICommand, State } from "./state.js";

export function commandHelp(replState: State) {
  //console.log("help man");
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  for (const [name, cmd] of Object.entries(replState.commands)) {
    console.log(`${name}: ${cmd.description}`);
  }
}
