import { Cache } from "./pokeCache.js";
import type { Pokemon } from "./types/pokemon_type.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(10000);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;

    // check cache
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    // go fish
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as ShallowLocations;
    //console.log("data:", data);

    //store in cache
    this.cache.add(url, data);
    return data;
  }
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    // check cache
    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as Location;
    //store in cache
    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(pokemon: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;

    // check cache
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    // go fetch
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as Pokemon;

    // store in cache
    this.cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number; // we don't need this
  next: string;
  previous: string;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
