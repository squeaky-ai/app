const { NODE_ENV } = process.env;

const IS_DEV = NODE_ENV !== 'production';

const WEB_HOST_NAME = IS_DEV ? 'http://localhost:3333' : 'https://squeaky.ai';

const APP_HOST_NAME = IS_DEV ? 'http://localhost:3000' : 'https://app.squeaky.ai';

const API_HOST_NAME = IS_DEV ? 'http://localhost:4000' : 'https://api.squeaky.ai';

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
    appHost: APP_HOST_NAME,
    squeakySiteId: 82,
  },
  trailingSlash: true,
};
