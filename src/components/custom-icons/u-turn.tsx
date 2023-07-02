import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

import icon from '../../../public/icons/u-turn.svg';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  alt?: string;
}

export const UTurn: FC<Props> = (props) => (
  <Image src={icon} {...props} className='u-turn' alt='U-turn icon' unoptimized />
);
