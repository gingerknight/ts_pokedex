import { CLICommand, initState, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

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
    // can add more commands here
  };
}

export function cleanInput(input: string): string[] {
  // Split on whitespace, then filter on truthy values (drop whitespace)
  const lowerInput = input.toLowerCase();
  const values: string[] = lowerInput.split(" ").filter((val) => val);
  return values;
}

// Initialize State { readling, commands }
const replState = initState();

export function startREPL() {
  replState.rl.prompt();
  replState.rl.on("line", handleLine);
}

async function handleLine(input: string) {
  // define the callback inline instead of seperate func definition
  // console.log("We got an input capt: ", input);
  if (!input) {
    // empty input
    replState.rl.prompt();
  }
  const cleanedInput = cleanInput(input);
  const commandName = cleanedInput[0];
  // console.log("Your command was:", cleanedInput[0]);
  if (replState.commands[commandName]) {
    // console.log("found in getCommands");
    // console.log(commands[commandName].description);
    try {
      replState.commands[commandName].callback(replState);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("Unknown command");
  }
  replState.rl.prompt();
}
