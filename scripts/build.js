// eslint-disable-next-line import/no-extraneous-dependencies
const transform = require('babel-transform-dir');
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const BABEL_CONFIG = JSON.parse(fs.readFileSync(resolveApp('.babelrc'), 'utf8'));

// Transform all javascript files in `./src` and write the result to `./build`

transform('./src', './build', {
  babel: BABEL_CONFIG,
  // Invokes whenever a file is transformed and written.
  onFile: (file) => {
    // eslint-disable-next-line no-console
    console.log(`src/${file} -> build/${file}`);
  },
})
  .then(() => {
    fs.copyFileSync(resolveApp('src/index.js'), resolveApp('build/index.js.flow'));
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('build ready');
  });
