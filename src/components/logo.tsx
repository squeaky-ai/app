import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

import logoMain from '../../public/logo.svg';
import logoDark from '../../public/logo-dark.svg';
import logoSmall from '../../public/logo-small.svg';

type Logo = 'main' | 'small' | 'dark';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  logo: Logo;
  alt?: string;
}

const getLogoSrc = (logo: Logo) => {
  switch(logo) {
    case 'main':
      return logoMain;
    case 'small':
      return logoSmall;
    case 'dark':
      return logoDark;
  }
};

export const Logo: FC<Props> = ({ logo, ...props }) => (
  <Image src={getLogoSrc(logo)} {...props} alt='Squeaky logo' unoptimized />
);
