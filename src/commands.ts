import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
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
      description: "List pokemon that can be found in the location",
      callback: commandExplore,
    },
    // can add more commands here
  };
}
