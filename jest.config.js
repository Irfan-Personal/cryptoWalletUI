module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'js', 'd.ts'],
  moduleNameMapper: {
    '\\.css$': require.resolve('./mocks/styleMock.js'),
  },
};
