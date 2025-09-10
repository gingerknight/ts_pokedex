import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const locations = await state.pokeApi.fetchLocations(state.nextUrl);
    state.nextUrl = locations.next;
    state.prevUrl = locations.previous;
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

export async function commandMapBack(state: State): Promise<void> {
  try {
    if (!state.prevUrl) {
      throw new Error("You are on fekking first page ya idgit.");
    }

    const locations = await state.pokeApi.fetchLocations(state.prevUrl);

    state.nextUrl = locations.next;
    state.prevUrl = locations.previous;

    locations.results.forEach((loc, i) => {
      console.log(`${i + 1}. ${loc.name}`);
    });

    console.log(`\nNext page: ${locations.next}`);
    console.log(`Previous page: ${locations.previous}`);
  } catch (err) {
    console.error("Error fetching previous locations:", err);
  }
}
