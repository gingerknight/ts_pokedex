import * as readline from "node:readline";

export function cleanInput(input: string): string[] {
  // Split on whitespace, then filter on truthy values (drop whitespace)
  const lowerInput = input.toLowerCase();
  const values: string[] = lowerInput.split(" ").filter((val) => val);
  return values;
}
export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "(╯°□°)╯︵◓ >>",
  });
  rl.prompt();
  rl.on("line", (input) => {
    // define the callback inline instead of seperate func definition
    // console.log("We got an input capt: ", input);
    if (!input) {
      // empty input
      rl.prompt();
    }
    const cleanedInput = cleanInput(input);
    console.log("Your command was:", cleanedInput[0]);
    rl.prompt();
  });
}
