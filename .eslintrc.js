module.exports = {
  plugins: ['import', 'prettier'],
  env: {
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'error',
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'import/no-extraneous-dependencies': 'error',
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
  },
};
