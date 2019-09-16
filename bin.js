#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const argv = require("yargs").argv;
const filesize = require("filesize");
const filename = `${argv._[0]}`;
const format = argv.format || "KB";

const formatOptions = {
  mb: {
    exponent: 1
  },

  kb: {
    exponent: 0
  },

  b: {
    exponent: -1
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
    ...
  });
  process.stdout.write(`${formatted.value}`);
});
