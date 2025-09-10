import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { commandMap, commandMapBack } from "../command_map";
import { PokeAPI } from "../pokeapi";
import type { State } from "../state";

describe("commandMap unit and integration tests: DORA THE EXPLORER YO", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("replace pokeApi with mock", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      next: "next-url",
      previous: "prev-url",
      results: [{ name: "pallet-town", url: "https://choose_squirtle.org/profOak" }],
    });

    const mockState = {
      rl: {} as any,
      commands: {},
      pokeApi: { fetchLocations: mockFetch },
      nextUrl: "",
      prevUrl: "",
    } as unknown as State;

    await commandMap(mockState);

    expect(mockFetch).toHaveBeenCalledWith("");
    expect(mockState.nextUrl).toBe("next-url");
    expect(logSpy).toHaveBeenCalledWith("1. pallet-town");
  });

  test("integration-ish test (spy on real PokeAPI)", async () => {
    const pokeApi = new PokeAPI();
    const spy = vi.spyOn(pokeApi, "fetchLocations").mockResolvedValue({
      count: 1,
      next: "next-url",
      previous: "prev-url",
      results: [{ name: "viridian-city", url: "https://giovanni_and_his_groundgame.com/team_rocket" }],
    });

    const mockState: State = {
      rl: {} as any,
      commands: {},
      pokeApi,
      nextUrl: "",
      prevUrl: "",
    } as State;

    await commandMap(mockState);

    expect(spy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("1. viridian-city");
  });
});

// BACK COMMAND MAP TESTS
describe("commandMapBack unit and integration tests ==> WE WENT THE WRONG WAY", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("replace pokeApi with mock", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      next: "bulba-bulbasaur.org",
      previous: "choose_squirtle.org/profOak",
      results: [{ name: "pallet-town", url: "choose_squirtle.org/profOak" }],
    });

    const mockState = {
      rl: {} as any,
      commands: {},
      pokeApi: { fetchLocations: mockFetch },
      nextUrl: "simply_charmander.com",
      prevUrl: "squirtlebros.com",
    } as unknown as State;

    await commandMapBack(mockState);

    expect(mockFetch).toHaveBeenCalledWith("squirtlebros.com");
    expect(mockState.nextUrl).toBe("bulba-bulbasaur.org");
    expect(logSpy).toHaveBeenCalledWith("1. pallet-town");
  });

  test("integration-ish test (spy on PokeAPI)", async () => {
    const pokeApi = new PokeAPI();
    const spy = vi.spyOn(pokeApi, "fetchLocations").mockResolvedValue({
      count: 1,
      next: "mewtwo-is-a-criminal.org",
      previous: "mew-is-a-messed-up-cat.com",
      results: [{ name: "viridian-city", url: "giovanni_and_his_groundgame.com/team_rocket" }],
    });

    const mockState: State = {
      rl: {} as any,
      commands: {},
      pokeApi,
      nextUrl: "team_rocket_got_game.com",
      prevUrl: "mewtwo-is-a-criminal.org",
    } as State;

    await commandMap(mockState);

    expect(spy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("1. viridian-city");
  });
});
