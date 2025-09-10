import type { State } from "./state.js";

export async function commandExplore(state: State, name: string): Promise<void> {
  try {
    const location = await state.pokeApi.fetchLocation(name);
    console.log("\nPokemon in the area:");

    location.pokemon_encounters.forEach((loc, i) => {
      console.log(`${i + 1}. ${loc.pokemon.name}`);
    });

    console.log(`\nLocation Name: ${location.name}`);
    console.log(`Location URL: ${location.location.url}`);
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}
