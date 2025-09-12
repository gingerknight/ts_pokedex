import type { State } from "./state.js";

export async function commandCatch(state: State, name: string): Promise<void> {
  try {
    const pokemon = await state.pokeApi.fetchPokemon(name);
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    const chance: number = Math.floor(Math.random() * 500);
    if (chance >= pokemon.base_experience) {
      console.log(`You caught yourself a pokemon!`);
      state.pokedex[pokemon.name] = pokemon;
    } else {
      console.log(`${pokemon.name} ran away!`);
    }
  } catch (err) {
    console.error("Error fetching pokemon api:", err);
  }
}
