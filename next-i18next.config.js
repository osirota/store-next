const path = require('path');

module.exports = {
  i18n: {
    locales: ['ua', 'en'],
    defaultLocale: 'ua',
    localePath: path.resolve('./public/locales'),
  },
};
