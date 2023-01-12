module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null
  },
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less'
    }
  ]
}
