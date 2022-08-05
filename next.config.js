const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  images: {
    domains: ['res.cloudinary.com', 'wise.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // eslint-disable-next-line global-require
      require('./sitemap.js');
    }
    return config;
  },
};
