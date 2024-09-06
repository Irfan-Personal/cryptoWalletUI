module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '~src': './src',
          '~shared': './src/modules/shared',
          '~assets': './src/assets',
          '~authentication': './src/modules/authentication',
          '~wallet': './src/modules/wallet',
          '~account': './src/modules/account',
          '~transaction': './src/modules/transaction',
          '~token': './src/modules/token',
          '~network': './src/modules/network',
        },
      },
    ],
  ],
};
