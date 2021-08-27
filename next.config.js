const { API_HOST, NODE_ENV, BASE_PATH = '/app' } = process.env;

module.exports = {
  basePath: BASE_PATH,
  publicRuntimeConfig: {
    apiHost: API_HOST || 'http://localhost:4000',
    webHost: NODE_ENV === 'production' ? 'https://squeaky.ai' : 'http://localhost:3000',
    basePath: BASE_PATH,
  },
  async rewrites() {
    return NODE_ENV !== 'production' ? [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:4000/api/:slug*',
        basePath: false,
      }
    ] : [];
  }
};
