export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // implment this
    // this is the pagination part
    // https://pokeapi.co/api/v2/location-area/
    /* {
        "count": 1089,
        "next": "https://pokeapi.co/api/v2/location-area/?offset=20&limit=20",
        "previous": null,
        "results": [
          {
            "name": "canalave-city-area",
            "url": "https://pokeapi.co/api/v2/location-area/1/"
          },
        }
    */
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as ShallowLocations;
    //console.log("data:", data);
    return data;
  }
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as Location;
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
