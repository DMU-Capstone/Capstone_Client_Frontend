module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-transform-react-jsx',
    [
      'module-resolver',
      {
        alias: {
          '@shared': '../package/shared',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
  ],
};
