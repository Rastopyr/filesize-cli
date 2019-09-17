#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require('yargs');

const readFileSize = require('.');

const { argv } = yargs;
const filename = `${argv._[0]}`;
const format = (argv.format && argv.format.toLowerCase()) || "b";
const round = (argv.round && Number(argv.round)) || 2;

const errorMessage = (messageText) => `${chalk.bgRed.white("Error:")} ${messageText}`;

const exitWithError = (error, code = 1) => {
  process.stderr.write(error);
  process.exit(code);
};

if (!filename) {
  exitWithError(
    errorMessage(`\`${chalk.black("filename")}\` argument is required`)
  )
}


readFileSize({filename, format, round})
  .then((formattedValue) => {
     process.stdout.write(`${formattedValue}`);
  }).catch((err) => {
    exitWithError(
      errorMessage(err.message)
    )
  });
