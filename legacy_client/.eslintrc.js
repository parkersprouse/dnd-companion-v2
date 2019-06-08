module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'brace-style': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    camelcase: 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};