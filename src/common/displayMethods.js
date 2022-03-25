import chalk from 'chalk';
import boxen from 'boxen';

export const derived = {
  logBox: (msg) => console.log(boxen(msg)),
  logCyanBox: (msg) => console.log(chalk.cyan(boxen(msg))),
  logYellow: (msg) => console.log(chalk.yellow(msg)),
  logYellowBox: (msg) => console.log(chalk.yellow(boxen(msg))),
  logYellowInverse: (msg) => console.log(chalk.yellow.inverse(msg)),
  underline: (msg) => chalk.underline(msg),
};