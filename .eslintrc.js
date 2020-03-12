module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 10,
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'global-require': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
  },
};