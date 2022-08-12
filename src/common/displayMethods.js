import chalk from 'chalk';
import boxen from 'boxen';

const { log } = console;

export const derived = {
  logBox: (msg) => log(boxen(msg)),
  logCyanBox: (msg) => log(chalk.cyan(boxen(msg))),
  logGreenBox: (msg) => log(chalk.green(boxen(msg))),
  logRedBox: (msg) => log(chalk.red(boxen(msg))),
  logYellow: (msg) => log(chalk.yellow(msg)),
  logYellowBox: (msg) => log(chalk.yellow(boxen(msg))),
  logYellowInverse: (msg) => log(chalk.yellow.inverse(msg)),
  underline: (msg) => chalk.underline(msg),
};
