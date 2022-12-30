module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less'
    }
  ]
}
