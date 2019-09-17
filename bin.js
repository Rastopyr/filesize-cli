#!/usr/bin/env node

const chalk = require("chalk");
const readFileSize = require('.');

const errorMessage = (messageText) => `${chalk.bgRed.white("Error:")} ${messageText}`;

const exitWithError = (error, code = 1) => {
  process.stderr.write(error);
  process.exit(code);
};

require('yargs')
  .config({
    format: "b",
    round: 2
  })
  .usage('$0 <filePath>', 'show the size of `filePath` file', (yargs) => {
      yargs.positional('filePath', {
        describe: 'path to any file',
        type: 'string'
      });
  }, (argv) => {
    readFileSize({
      filename: argv.filePath,
      format: argv.format,
      round: argv.round
    })
      .then((formattedValue) => {
         process.stdout.write(`${formattedValue}`);
      }).catch((err) => {
        exitWithError(
          errorMessage(err.message)
        )
      });
  })
  .option('format', {
    alias: 'f',
    describe: 'format unit of size',
    choices: ['b', 'kb', 'mb', 'gb'],
    type: 'string'
  })
  .option('round', {
    alias: 'r',
    describe: 'decimal place of file size',
    type: 'number'
  })
  .help()
  .argv

// if (!filename) {
//   exitWithError(
//     errorMessage(`\`${chalk.black("filename")}\` argument is required`)
//   )
// }


