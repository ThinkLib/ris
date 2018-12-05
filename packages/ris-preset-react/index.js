module.exports = () => (
  {
    presets: [
      [require.resolve('@babel/preset-env'), {
        targets: {
          ie: 9,
        },
        modules: false,
      }],
      require.resolve('@babel/preset-react'),
    ],
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime')],
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
    ],
  }
);
