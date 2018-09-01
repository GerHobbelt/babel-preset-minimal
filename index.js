module.exports = (_, { jsx = 'react', mode } = {}) => {
  const presets = [
    [
      require.resolve('@gerhobbelt/babel-preset-env'),
      {
        modules: false,
        loose: mode === 'loose',
        useBuiltIns: 'entry',
        exclude: [
          'transform-async-to-generator',
          'transform-regenerator',
          'proposal-object-rest-spread'
        ],
        targets: mode === 'modern' ? {
          esmodules: true
        } : {
          ie: 9
        }
      }
    ],
    jsx !== 'vue' && [
      require.resolve('@gerhobbelt/babel-preset-react'),
      {
        pragma: jsx === 'react' ? null : jsx
      }
    ]
  ].filter(Boolean)

  const plugins = [
    require.resolve('@gerhobbelt/babel-plugin-syntax-dynamic-import'),
    jsx === 'vue' && require.resolve('babel-plugin-transform-vue-jsx'),
    mode !== 'modern' && [
      require.resolve('fast-async'),
      {
        spec: true
      }
    ],
    [
      require.resolve('@gerhobbelt/babel-plugin-proposal-object-rest-spread'),
      {
        loose: true,
        useBuiltIns: true
      }
    ]
  ].filter(Boolean)

  return {
    presets,
    plugins
  }
}
