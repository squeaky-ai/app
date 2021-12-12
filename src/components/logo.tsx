import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { BASE_PATH } from 'data/common/constants';

interface Props extends ImageProps {}

export const Logo: FC<Props> = ({ src, ...props }) => {
  return <Image src={`${BASE_PATH}/${src}.svg`} {...props} />;
};
