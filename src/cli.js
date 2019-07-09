/* eslint-disable no-console */
const program = require("commander");
const SmiirlLibrary = require("./index");
const { version } = require("../package.json");

program.description("Smiirl Library CLI");
program.version(version, "-v, --version");

program
  .command("pushnumber <mac> <token> <number>")
  .description("Push Number on Counter")
  .action((mac, token, number) => {
    const smiirl = new SmiirlLibrary();

    smiirl
      .pushNumberOnCounter(mac, token, parseInt(number, 10))
      .then(result => {
        console.log("\x1b[32m", `${result}`);
      })
      .catch(err => {
        console.log("\x1b[31m", `Error - ${err.message}`);
      });
  });

program
  .command("checkjson <url> <attribute>")
  .description("Check if JSON Url is compatible with Custom Counter")
  .action((url, attribute) => {
    const smiirl = new SmiirlLibrary();

    console.log(`URL : ${url}`);
    console.log(`Attribute : ${attribute}`);
    console.log("\n");

    smiirl
      .verifyJSONUrl(url, attribute)
      .then(res => {
        console.log("\x1b[32m", `${res}`);
      })
      .catch(err => {
        console.log("\x1b[31m", `Error - ${err.message}`);
      });
  });
program.parse(process.argv);
