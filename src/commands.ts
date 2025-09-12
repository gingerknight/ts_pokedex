import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokédex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display locations on the map",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Go back to previous locations page on map",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "List pokémon that can be found in the location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throw a pokéball and attempt to catch a pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Get details of a Pokemon you have caught in your pokedex",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List your caught pokemon from your pokedex",
      callback: commandPokedex,
    },
    // can add more commands here
  };
}
