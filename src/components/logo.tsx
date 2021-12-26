import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { BASE_PATH } from 'data/common/constants';

interface Props extends ImageProps {
  dark?: boolean;
}

export const Logo: FC<Props> = ({ src, dark, ...props }) => {
  return <Image src={`${BASE_PATH}/${src}${dark ? '-dark' : ''}.svg`} {...props} />;
};
