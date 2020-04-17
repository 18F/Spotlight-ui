'use-strict';

module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'color-contrast',
      'tap-targets',
      'image-alt',
      'input-image-alt',
      'font-size',
      'unminified-css',
      'unminified-javascript',
      'uses-text-compression',
      'total-byte-weight',
      'performance-budget',
      'timing-budget',
      'viewport',
    ],
  },
};
