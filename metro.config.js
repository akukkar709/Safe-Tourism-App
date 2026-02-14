// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { assetExts } = config.resolver;

  return {
    resolver: {
      // Add bin to assetExts
      assetExts: [...assetExts, 'bin'],
    },
  };
})();