import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  //create rl with createInterface();
  //create commands with getCommands()
  //return { rl, commands }
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "(╯°□°)╯︵◓ >>",
  });

  const commands = getCommands();

  return { rl, commands };
}
