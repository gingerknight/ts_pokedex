import { Cache } from "./pokeCache.js";

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
  id: number;
  name: string;
  game_index: number;
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
  location: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details2: {
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: {
        min_level: number;
        max_level: number;
        condition_values: any[];
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
};
