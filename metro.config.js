const path = require('path');
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts: [
        ...assetExts,
        'png',
        'jpg',
        'jpeg',
        'bmp',
        'gif',
        'webp',
        'svg',
      ],
      sourceExts: [...sourceExts, 'js', 'json', 'ts', 'tsx'],
      extraNodeModules: {
        appjson: path.resolve(__dirname, 'app.json'),
        'missing-asset-registry-path': require.resolve(
          'react-native/Libraries/Image/AssetRegistry',
        ),
      },
    },
  };
})();
