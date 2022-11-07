import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';

export const Close: FC = () => (
  <Link href='/sites'>
    <a className='button close'>
      <Icon name='close-line' />
    </a>
  </Link>
);
