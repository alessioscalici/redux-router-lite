const transform = require('babel-transform-dir');

// Transform all javascript files in `./src` and write the result to `./build`
const BABEL_CONFIG = require('../.babelrc.json');

transform('./src', './build', {
  babel: BABEL_CONFIG,
  // Invokes whenever a file is transformed and written.
  onFile: (file) => {
    // eslint-disable-next-line no-console
    console.log(`src/${file} -> build/${file}`);
  },
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('build ready');
  });
