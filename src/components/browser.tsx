import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { BASE_PATH } from 'data/common/constants';

interface Props {
  height?: number;
  name: string;
  width?: number;
}

const getIconName = (name: string) => {
  switch(name) {
    case 'Chrome':
      return 'chrome.svg';
    case 'Firefox':
    case 'Mozilla':
      return 'firefox.svg';
    case 'Internet Explorer':
      return 'internet-explorer.svg';
    case 'Edge':
      return 'edge.svg';
    case 'Opera':
      return 'opera.svg';
    case 'Safari':
      return 'safari.svg';
    default:
      return 'unknown.svg';
  }
};

export const Browser: FC<Props> = ({ height, name, width }) => (
  <Image 
    height={height || 16} 
    width={width ||16} 
    src={`${BASE_PATH}/browsers/${getIconName(name)}`} 
    alt={`${name} icon`} 
  />
);
