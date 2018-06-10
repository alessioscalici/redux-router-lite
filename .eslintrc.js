module.exports = {
  "extends": ["airbnb", "airbnb-flow"],
  "parser": "babel-eslint",
  "plugins": ["flowtype"],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "strict": 0,
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1
  }
};
