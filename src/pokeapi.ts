export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() { }

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
    //if (!pageURL) {
    const url = PokeAPI.baseURL + "/location-area/";
    const response: Response = await fetch(url, {
      method: "GET",
    });
    const data = (await response.json()) as ShallowLocations;
    console.log("data:", data);
    //}
    return data;
  }
  /*
  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
  */
}

export type ShallowLocations = {
  // count: number, // we don't need this
  next: string;
  previous: null | string;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
};

export type Location = {
  // add properties here
};
