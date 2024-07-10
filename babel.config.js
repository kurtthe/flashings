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
            '@navigators': './src/navigators',
            '@routes': './src/routes',
            '@contexts': './src/contexts',
            '@components': './src/components',
            '@services': './src/core/services',
            '@hooks': './src/core/hooks',
            '@store': './src/core/store',
            '@shared': './src/shared',
            '@models': './src/models',
            '@core': './src/core',
            '@theme': './src/theme',
            '@ui': './src/ui',
            '@env': './env',
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
