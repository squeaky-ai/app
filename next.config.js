const { API_HOST, NODE_ENV } = process.env;

const IS_DEV = NODE_ENV !== 'production';

const BASE_PATH = IS_DEV ? '' : '/app';

module.exports = {
  basePath: BASE_PATH,
  publicRuntimeConfig: {
    apiHost: API_HOST || 'http://localhost:4000',
    webHost: IS_DEV ? 'http://localhost:3000' : 'https://squeaky.ai',
    basePath: BASE_PATH,
  },
  async rewrites() {
    return IS_DEV ? [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:4000/api/:slug*',
        basePath: false,
      }
    ] : [];
  }
};
