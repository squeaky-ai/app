const { API_HOST, NODE_ENV } = process.env;

const IS_DEV = NODE_ENV !== 'production';

// In production we point to the squeaky.ai/api but in
// development we use a local running instance
const API_HOST_NAME = API_HOST || 'http://localhost:3333';

// All of the meta tags in _document.tsx need to point to the
// correct host as it will be no good having localhost in
// production!
const WEB_HOST_NAME = IS_DEV ? 'http://localhost:3333' : 'https://squeaky.ai';

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  publicRuntimeConfig: {
    dev: IS_DEV,
    apiHost: API_HOST_NAME,
    webHost: WEB_HOST_NAME,
    squeakySiteId: 82,
  },
  trailingSlash: true,
};
