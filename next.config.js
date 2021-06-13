module.exports = {
  future: {
    webpack5: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:4000/api/:slug*'
      }
    ];
  }
};
