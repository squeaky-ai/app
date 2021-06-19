const { API_HOST, NODE_ENV } = process.env;

module.exports = {
  publicRuntimeConfig: {
    apiHost: API_HOST || 'http://localhost:4000'
  },
  async rewrites() {
    return NODE_ENV !== 'production' ? [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:4000/api/:slug*'
      }
    ] : [];
  }
};
