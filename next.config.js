const { API_HOST, NODE_ENV } = process.env;

const IS_DEV = NODE_ENV !== 'production';

// In production the whole app runs under the /app
// subdomain but it's annoying in development
const BASE_PATH = IS_DEV ? '' : '/app';

// In production all the assets are served from S3/
// Cloudfront, but in development they are loaded from
// disk
const ASSET_PREFIX = IS_DEV ? '' : 'https://cdn.squeaky.ai/app';

// In production we point to the squeaky.ai/api but in
// development we use a local running instance
const API_HOST_NAME = API_HOST || 'http://localhost:4000';

// All of the meta tags in _document.tsx need to point to the
// correct host as it will be no good having localhost in
// production!
const WEB_HOST_NAME = IS_DEV ? 'http://localhost:3000' : 'https://squeaky.ai';

module.exports = {
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX,
  publicRuntimeConfig: {
    apiHost: API_HOST_NAME,
    webHost: WEB_HOST_NAME,
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
