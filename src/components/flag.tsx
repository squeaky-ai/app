import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';

interface Props {
  code: string;
}

export const Flag: FC<Props> = ({ code }) => (
  <span className='flag'>
    <Image src={`/flags/${code.toLowerCase()}.svg`} width={16} height={16} />
  </span>
);
