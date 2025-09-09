import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const locations = await state.pokeApi.fetchLocations();
    console.log("\nAvailable Locations:");

    locations.results.forEach((loc, i) => {
      console.log(`${i + 1}. ${loc.name}`);
    });

    console.log(`\nNext page: ${locations.next}`);
    console.log(`Previous page: ${locations.previous}`);
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}
