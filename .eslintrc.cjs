require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ]
      }
    }
  ]
}
