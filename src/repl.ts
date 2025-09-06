import * as readline from "node:readline";
import { CLICommand } from "./command.js";
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "(╯°□°)╯︵◓ >>",
});

export function startREPL() {
  rl.prompt();
  rl.on("line", handleLine);
}

async function handleLine(input: string) {
  // define the callback inline instead of seperate func definition
  // console.log("We got an input capt: ", input);
  if (!input) {
    // empty input
    rl.prompt();
  }
  const cleanedInput = cleanInput(input);
  const commandName = cleanedInput[0];
  // console.log("Your command was:", cleanedInput[0]);
  const commands = getCommands();
  if (commands[commandName]) {
    // console.log("found in getCommands");
    // console.log(commands[commandName].description);
    try {
      commands[commandName].callback(commands);
    } catch (err) {
      console.error(err);
    }
    rl.prompt();
  } else {
    console.log("Unknown command");
    rl.prompt();
  }
}
