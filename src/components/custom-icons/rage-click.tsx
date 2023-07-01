import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

import icon from '../../../public/icons/rage-click.svg';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  alt?: string;
}

export const RageClick: FC<Props> = (props) => (
  <Image src={icon} {...props} className='rage-click' alt='Rage click icon' unoptimized />
);
