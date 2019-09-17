#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const argv = require("yargs").argv;
const filesize = require("filesize");
const filename = `${argv._[0]}`;
const format = (argv.format && argv.format.toLowerCase()) || "b";
const round = (argv.round && Number(argv.round)) || 2;

const formatOptions = {
  b: {
    exponent: 0
  },
  kb: {
    exponent: 1
  },

  mb: {
    exponent: 2
  },

  gb: {
    exponent: 3
  }
};

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

  const formatted = filesize(stats.size, {
    output: "object",
    round,
    ...formatOptions[format]
  });

  process.stdout.write(`${formatted.value}`);
});
