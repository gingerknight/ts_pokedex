import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  // list all pokemon in pokedex
  if (!state.pokedex) {
    console.log("You do not have any pokemon...");
  } else {
    console.log("Your Pokedex:");
    const myPokemon = Object.keys(state.pokedex)
      .map((t) => `  - ${t}`)
      .join("\n");
    console.log(myPokemon);
  }
}
