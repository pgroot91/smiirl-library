# Smiirl Library

Features :

- Check if JSON Url is compatible with Smiirl Custom Counter
- Change number on counter (Push Method)

## Installation

To use the library, you need to install this library with npm.

```bash
npm install @smiirl/smiirl-library
```

## Usage

```javascript
// Load Dep
const SmiirlLibrary = require("@smiirl/smiirl-library");

// Load Class
const smiirlLibrary = new SmiirlLibrary();
```

## Fonctions

### pushnumberOnCounter(mac, token, number)

Will push a number on your Custom Counter

**Parameters** :

- mac : String | Counter Mac (found behind your Smiirl Custom Counter)
- token : String | Counter Token (found on my.smiirl.com)
- number: Number | Number to show

**Return**:

- Promise <Object|Error>

```javascript
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
```

### verifyJSONUrl(url, attribute)

Will check if your JSON Url is compatible with Smiirl Custom Counter

**Parameters** :

- url : String | Your JSON url
- attribute : String | Your JSON attribute

**Return**:

- Promise <Object|Error>

```javascript
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Information on LICENSE.
