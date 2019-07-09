/* eslint-disable class-methods-use-this */
const axios = require("axios");

class SmiirlLibrary {
  /**
   * Push number on Counter
   * @param {string} mac Counter Mac (found behind counter)
   * @param {string} token Counter Token (found on My)
   * @param {number} number Number to display
   */
  pushNumberOnCounter(mac, token, number) {
    return new Promise((resolve, reject) => {
      if (!mac || typeof mac !== "string") {
        reject(new Error("Counter Mac is not defined."));
        return;
      }

      if (!token || typeof token !== "string") {
        reject(new Error("Counter Token is not defined."));
        return;
      }

      if (!number || typeof number !== "number") {
        reject(new Error("Number is not defined."));
        return;
      }

      const url = `https://connect.smiirl.com/?s=pushnumber&mac=${mac}&token=${token}&number=${number}`;

      axios(url)
        .then(res => {
          resolve(res.data.message);
        })
        .catch(resp => {
          const err = resp.response;
          if (err.data && err.data.error) {
            reject(new Error(err.data.error));
          } else {
            reject(new Error("Server is not reacheable. Please Try Again."));
          }
        });
    });
  }

  /**
   * Check if we can download the JSON
   * @param {strin} url
   */
  checkURLDownloading(url) {
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== "string") {
        reject(new Error("checkURLDownloading - URL is not specified"));
      }

      axios(url, { transformResponse: [], maxRedirects: 0, timeout: 5000 })
        .then(res => {
          if (res.data.length > 0) {
            resolve(res.data);
          } else {
            reject(new Error("Impossible to fetch data. Page empty."));
          }
        })
        .catch(() => {
          reject(
            new Error(
              "Impossible to fetch data. Impossible to reach your server. Proxy problem, redirection not allowed"
            )
          );
        });
    });
  }

  /**
   * Check if we can download the HTTPS JSON by counter-addons
   * @param {string} url
   */
  checkCounterAddons(url) {
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== "string") {
        reject(new Error("checkCounterAddons - URL is not specified"));
      }
      axios(`http://counter-addons.smiirl.com/?s=bypass&url=${encodeURIComponent(url)}`, {
        transformResponse: [],
        maxRedirects: 0,
        timeout: 5000
      })
        .then(res => {
          if (res.data === "null") {
            reject(
              new Error(
                "Impossible to fetch data. Please contact Support Team to allow our IPs for HTTPS. (Redirection are not allowed)"
              )
            );
          } else {
            resolve(res.data);
          }
        })
        .catch(() => {
          reject(new Error("Impossible to reach counter-addons servers"));
        });
    });
  }

  /**
   * Check if the data is a valid json
   * @param {string} data
   */
  checkJSON(data) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data !== "string") {
        reject(new Error("checkJSON - Data is not specified"));
      }

      try {
        const json = JSON.parse(data);
        if (typeof json !== "object") reject(new Error("Data is not a valid JSON"));
        resolve(json);
      } catch (error) {
        reject(new Error("Data is not a valid JSON"));
      }
    });
  }

  /**
   * Check if attribute exist on json
   * @param {object} data
   * @param {string} attribute
   */
  checkAttributeIsInJson(data, attribute) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data !== "object") {
        reject(new Error("checkAttributeIsInJson - Data is not specified"));
      }

      if (!attribute || typeof attribute !== "string") {
        reject(new Error("checkAttributeIsInJson - Attribute is not specified"));
      }

      if (data[attribute]) {
        resolve(data[attribute]);
      } else {
        reject(new Error("Attribute is not found in the json"));
      }
    });
  }

  /**
   * Check if carriage return is present on string
   * @param {string} data
   */
  checkCarriageReturn(data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        reject(new Error("checkCarriageReturn - Data is not specified"));
      }

      if (data.indexOf("^M") >= 0) {
        reject(new Error("Carriage Return character found"));
      } else {
        resolve();
      }
    });
  }

  /**
   * Check if single quote exist on JSON
   * @param {string} data
   */
  checkSingleQuote(data) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data !== "string") {
        reject(new Error("checkSingleQuote - Data is not specified"));
      }

      if (data.indexOf("'") >= 0) {
        reject(new Error("Data contain single quote"));
      } else {
        resolve();
      }
    });
  }

  /**
   * Check if value is a number
   * @param {any} value
   */
  checkIfValueIsNumber(value) {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject(new Error("checkIfValueIsNumber - Value is not specified"));
      }

      if (typeof value === "number") {
        resolve();
      } else {
        reject(new Error("Value is not a number"));
      }
    });
  }

  /**
   * Check if url use HTTPS
   * @param {string} url
   */
  checkIfHttps(url) {
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== "string") {
        reject(new Error("checkIfHttps - URL is not specified"));
      }

      if (url.startsWith("https://")) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Verify if custom link is good or not
   * @param {string} url
   * @param {string} attribute
   */
  verifyJSONUrl(url, attribute) {
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== "string") {
        reject(new Error("verify - URL is not specified"));
      }

      if (!attribute || typeof attribute !== "string") {
        reject(new Error("verify - Attribute is not specified"));
      }

      (async () => {
        try {
          const https = await this.checkIfHttps(url);
          let data;

          // Download JSON
          if (https === true) {
            data = await this.checkCounterAddons(url);
          } else {
            data = await this.checkURLDownloading(url);
          }

          // Check Carriage Return
          await this.checkCarriageReturn(data);

          // Check Single Quote
          await this.checkSingleQuote(data);

          // Check JSON
          const json = await this.checkJSON(data);

          // Check Attribute is in JSon
          const value = await this.checkAttributeIsInJson(json, attribute);

          // Check if Value is Number
          await this.checkIfValueIsNumber(value);

          resolve("Everything is good ! Your counter will display your number :)");
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

module.exports = SmiirlLibrary;
