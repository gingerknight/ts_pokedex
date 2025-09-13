import type { State } from "./state.js";
import Table from "cli-table3";
import chalk from "chalk";
import { colorType } from "./types/color_type.js";

export async function commandPokedex(state: State) {
  const table = new Table({
    head: ["Name", "Type(s)"],
  });
  // list all pokemon in pokedex
  if (!state.pokedex) {
    console.log("You do not have any pokemon...");
  } else {
    console.log("Your Pokedex:");
    Object.values(state.pokedex).forEach((p) => {
      const types = p.types.map((t) => colorType(t.type.name)).join(", ");
      table.push([chalk.bold(p.name), types]);
    });
  }
  console.log(table.toString());
}
