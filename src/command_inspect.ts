import type { State } from "./state.js";

export async function commandInspect(state: State, name: string) {
  const pokemonDetails = state.pokedex[name];
  if (pokemonDetails) {
    const stats = pokemonDetails.stats.map((s) => `  -${s.stat.name}: ${s.base_stat}`).join("\n");

    const types = pokemonDetails.types.map((t) => `  - ${t.type.name}`).join("\n");

    const output = [
      `Name: ${pokemonDetails.name}`,
      `Height: ${pokemonDetails.height}`,
      `Weight: ${pokemonDetails.weight}`,
      `Stats:\n${stats}`,
      `Types:\n${types}`,
    ].join("\n");
    console.log(output);
  } else {
    console.log("you have not caught that pokemon");
  }
}
