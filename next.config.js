const { API_HOST } = process.env;

module.exports = {
  publicRuntimeConfig: {
    apiHost: API_HOST || 'http://localhost:4000'
  }
};
