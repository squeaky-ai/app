import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';

interface Props {
  height?: number;
  name: string;
  width?: number;
}

export const Browser: FC<Props> = ({ height, name, width }) => (
  <Image 
    height={height || 16} 
    width={width ||16} 
    src={`/browsers/${name.toLowerCase().replace(' ', '-')}.svg`} 
    alt={`${name} icon`} 
  />
);
