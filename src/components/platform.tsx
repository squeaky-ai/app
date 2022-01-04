import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

import wordpress from '../../public/platforms/wordpress.png';
import shopify from '../../public/platforms/shopify.png';
import wix from '../../public/platforms/wix.png';
import webflow from '../../public/platforms/webflow.png';
import magento from '../../public/platforms/magento.png';
import drupal from '../../public/platforms/drupal.png';

type PlatformType = 'wordpress' | 'shopify' | 'wix' | 'webflow' | 'magento' | 'drupal';

interface Props extends Omit<ImageProps, 'src'> {
  platform: PlatformType;
}

const getPlatformSrc = (platform: PlatformType) => {
  switch(platform) {
    case 'wordpress':
      return wordpress;
    case 'shopify':
      return shopify;
    case 'wix':
      return wix;
    case 'webflow':
      return webflow;
    case 'magento':
      return magento;
    case 'drupal':
      return drupal;
  }
};

export const Platform: FC<Props> = ({ platform, ...props }) => {
  return <Image src={getPlatformSrc(platform)} {...props} alt='Platform logo' />;
};
