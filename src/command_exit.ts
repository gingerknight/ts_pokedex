import { State } from "./state.js";

export async function commandExit(replState: State) {
  console.log("Closing the Pokedex... Goodbye!");
  replState.rl.close();
  process.exit(0);
}
