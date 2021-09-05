const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ua',
    locales: ['ua', 'ru'],
    localePath: path.resolve('./public/locales'),
  },
  react: {
    useSuspense: false,
  },
};
