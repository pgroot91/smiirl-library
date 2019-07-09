/* eslint-disable no-undef */
const assert = require("assert");
const SmiirlCustomChecker = require("../src/index.js");

describe("Smiirl Library Tests", () => {
  let scc;

  before(() => {
    try {
      scc = new SmiirlCustomChecker();
    } catch (e) {
      throw new Error(e);
    }
  });

  describe("checkURLDownloading", () => {
    it("URL is not gived, so it will return an error", done => {
      scc
        .checkURLDownloading()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("URL is gived but it's a wrong url, so it will return an error", done => {
      scc
        .checkURLDownloading("http://ceciestuntest.org")
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("URL is give and it's a valid url, so it will return the axios object", done => {
      scc
        .checkURLDownloading("http://api.smiirl.com/number")
        .then(res => {
          assert.equal(typeof res, "string");
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });
  });

  describe("checkCounterAddons", () => {
    it("URL is not gived, so it will return an error", done => {
      scc
        .checkCounterAddons()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("URL is gived but it's a wrong url, so it will return an error", done => {
      scc
        .checkCounterAddons("http://ceciestuntest.org")
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("URL is give and it's a valid url, so it will return the axios object", done => {
      scc
        .checkCounterAddons("http://api.smiirl.com/number")
        .then(res => {
          assert.equal(typeof res, "string");
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });
  });

  describe("checkJSON", () => {
    it("JSON is not gived, so it will return an error", done => {
      scc
        .checkJSON()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("JSON is gived but it's an object, so it will return an error", done => {
      scc
        .checkJSON({ test: "eze" })
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("JSON is gived but it's not a valid json, so it will return an error", done => {
      scc
        .checkJSON('{"test":|"toto"}')
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("JSON is gived and it's a valid json, so it will be okay", done => {
      scc
        .checkJSON('{"test":"toto"}')
        .then(json => {
          assert.equal(typeof json, "object");
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });
  });

  describe("checkAttributeIsInJson", () => {
    it("JSON & attribute are not gived, so it will return an error", done => {
      scc
        .checkAttributeIsInJson()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("JSON & attribute are gived but there the attribute doesn't exist, so it will return an error", done => {
      scc
        .checkAttributeIsInJson({ test: "toto" }, "tuyto")
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("JSON & attribute are gived and the attribute exist on the JSON, so it will be okay", done => {
      scc
        .checkAttributeIsInJson({ test: "toto" }, "test")
        .then(() => {
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });
  });

  describe("checkCarriageReturn", () => {
    it("Data is not gived, so it will return an error", done => {
      scc
        .checkCarriageReturn()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Data contain Carriage return, so it will return an error", done => {
      scc
        .checkCarriageReturn('{"test":"toto"}^M')
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Data doesn't contain Carriage return, so it will be okay", done => {
      scc
        .checkCarriageReturn('{"test":"toto"}')
        .then(() => {
          done();
        })
        .catch(() => {
          done(new Error("It should return an error"));
        });
    });
  });

  describe("checkSingleQuote", () => {
    it("Data is not gived, so it will return an error", done => {
      scc
        .checkSingleQuote()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Data contain Single Quote, so it will return an error", done => {
      scc
        .checkSingleQuote(`{'test':"toto"}^M`)
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Data doesn't contain Single Quote, so it will be okay", done => {
      scc
        .checkSingleQuote(`{"test":"toto"}`)
        .then(() => {
          done();
        })
        .catch(() => {
          done(new Error("It should return an error"));
        });
    });
  });

  describe("checkIfValueIsNumber", () => {
    it("Value is not gived, so it will return an error", done => {
      scc
        .checkIfValueIsNumber()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Value is a String, so it will return an error", done => {
      scc
        .checkIfValueIsNumber("123")
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Value is a number, so it will be okay", done => {
      scc
        .checkIfValueIsNumber(123)
        .then(() => {
          done();
        })
        .catch(() => {
          done(new Error("It should return an error"));
        });
    });
  });

  describe("checkIfHttps", () => {
    it("URL is not gived, so it will return an error", done => {
      scc
        .checkIfHttps()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("URL is a HTTPS, so it will return 1", done => {
      scc
        .checkIfHttps("https://google.fr")
        .then(res => {
          assert.equal(typeof res, "boolean");
          assert.equal(res, true);
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });

    it("URL is not a HTTPS, so it will return 0", done => {
      scc
        .checkIfHttps("http://google.fr")
        .then(res => {
          assert.equal(typeof res, "boolean");
          assert.equal(res, false);
          done();
        })
        .catch(() => {
          done(new Error("It should not return an error"));
        });
    });
  });

  describe("pushNumberOnCounter", () => {
    it("Give wrong attribute will return an Error", done => {
      scc
        .pushNumberOnCounter()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });

    it("Forgot Attribute will return an Error", done => {
      scc
        .pushNumberOnCounter()
        .then(() => {
          done(new Error("It should return an error"));
        })
        .catch(err => {
          assert.equal(typeof err, "object");
          done();
        });
    });
  });
});
