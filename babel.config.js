module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@features': './src/features',
            '@assets': './src/assets',
            '@navigation': './src/navigation',
            '@environment': './src/environment',
            '@navigators': './src/navigators',
            '@routes': './src/routes',
            '@contexts': './src/contexts',
            '@components': './src/components',
            '@services': './src/core/services',
            '@hooks': './src/core/hooks',
            '@shared': './src/shared',
            '@models': './src/models',
            '@module': './src/core/module',
            '@core': './src/core',
            '@theme': './src/theme',
            '@ui': './src/ui',
          },
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
