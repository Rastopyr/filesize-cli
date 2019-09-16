#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const filename = process.argv[2];

if (!filename) {
  const errorMessage = `${chalk.bgRed.white("Error:")}  \`${chalk.green(
    "filename"
  )}\` argument is required`;

  process.stderr.write(errorMessage);
  process.exit(1);
}

fs.stat(filename, (err, stats) => {
  if (err) {
    const errorMessage = `${chalk.bgRed.white("Error:")} ${err.message}`;
    process.stderr.write(errorMessage);
    process.exit(1);
  }
  process.stdout.write(`${stats.size}`);
});
