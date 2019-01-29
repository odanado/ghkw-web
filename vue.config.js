const package = require("./package.json");

module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = package.name;
      args[0].description = package.description;
      args[0].origin = "https://ghkw-web.firebaseapp.com";
      return args;
    });
  }
};
