const path = require("path");

const APP_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "dist");

const configWeb = {
  entry: ["regenerator-runtime", `${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: "web-smiirl.js",
    library: "SmiirlLibrary",
    libraryTarget: "var"
  },
  target: "web"
};

const configNode = {
  entry: ["regenerator-runtime", `${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: "node-smiirl.js",
    library: "SmiirlLibrary",
    libraryTarget: "commonjs2"
  },
  target: "node"
};

const configCLI = {
  entry: ["regenerator-runtime", `${APP_DIR}/cli.js`],
  output: {
    path: BUILD_DIR,
    filename: "smiirl",
    library: "SmiirlLibrary",
    libraryTarget: "commonjs2"
  },
  target: "node"
};

const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      include: path.resolve(__dirname, "src"),
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }
  ]
};

configWeb.module = moduleConfig;
configNode.module = moduleConfig;
configCLI.module = moduleConfig;

module.exports = [configWeb, configNode, configCLI];
