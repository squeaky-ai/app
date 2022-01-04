import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';

import chrome from '../../public/browsers/chrome.svg';
import firefox from '../../public/browsers/firefox.svg';
import ie from '../../public/browsers/internet-explorer.svg';
import edge from '../../public/browsers/edge.svg';
import opera from '../../public/browsers/opera.svg';
import safari from '../../public/browsers/safari.svg';
import unknown from '../../public/browsers/unknown.svg';

interface Props {
  height?: number;
  name: string;
  width?: number;
}

const getIconSrc = (name: string) => {
  switch(name) {
    case 'Chrome':
      return chrome;
    case 'Firefox':
    case 'Mozilla':
      return firefox;
    case 'Internet Explorer':
      return ie;
    case 'Edge':
      return edge;
    case 'Opera':
      return opera;
    case 'Safari':
      return safari;
    default:
      return unknown;
  }
};

export const Browser: FC<Props> = ({ height, name, width }) => (
  <span className='browser'>
    <Image 
      height={height || 16} 
      width={width ||16} 
      src={getIconSrc(name)} 
      alt={`${name} icon`} 
      unoptimized
    />
  </span>
);
