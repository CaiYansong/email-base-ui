const path = require('path');

module.exports = async function ({ config }) {
  // config.resolve.alias['fs'] = path.resolve(__dirname, './mocks/fs.js');
  // config.resolve.alias['uglify-js'] = path.resolve(__dirname, './mocks/uglify-js.js');
  config.resolve.alias['mjml-custom'] = path.resolve(__dirname, '../packages/mjml-custom/lib/mjml-custom.js');
  // require
  // config.module.unknownContextRegExp = /$^/;
  // config.module.unknownContextCritical = false;
  // require(expr)
  config.module.exprContextRegExp = /$^/;
  config.module.exprContextCritical = false;
  // require("prefix" + expr + "surfix")
  // config.module.wrappedContextRegExp = /$^/;
  // config.module.wrappedContextCritical = false;
  return config;
};
