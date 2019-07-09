const SmiirlLibrary = require("../dist/node-smiirl");

// Load Class
const smiirlLibrary = new SmiirlLibrary();

// Display Number on Counter with Push Method
const CounterMac = "";
const CounterToken = "";
const NumberToDisplay = 12345;

smiirlLibrary
  .pushNumberOnCounter(CounterMac, CounterToken, NumberToDisplay)
  .then(result => {
    console.log(`${result}`);
  })
  .catch(err => {
    console.log(`Error - ${err.message}`);
  });

// Check if JSON URL is good
const JSONUrl = "";
const Attribute = "";

smiirlLibrary
  .verifyJSONUrl(JSONUrl, Attribute)
  .then(result => {
    console.log(`${result}`);
  })
  .catch(err => {
    console.log(`Error - ${err.message}`);
  });
