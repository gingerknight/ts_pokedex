import chalk from "chalk";

const typeColors: Record<string, (text: string) => string> = {
  fire: chalk.redBright,
  water: chalk.blueBright,
  grass: chalk.greenBright,
  electric: chalk.yellowBright,
  psychic: chalk.magentaBright,
  ice: chalk.cyanBright,
  dragon: chalk.hex("#7038F8"), // custom hex for purple dragon color
  dark: chalk.gray,
  fairy: chalk.hex("#EE99AC"),
  normal: chalk.white,
  fighting: chalk.red,
  flying: chalk.cyan,
  poison: chalk.magenta,
  ground: chalk.yellow,
  rock: chalk.hex("#B8A038"),
  bug: chalk.green,
  ghost: chalk.hex("#705898"),
  steel: chalk.hex("#B8B8D0"),
};

export function colorType(type: string) {
  return typeColors[type] ? typeColors[type](type) : type;
}
