import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';

import cheese from '../../public/cheese.svg';

export const Cheese: FC = () => (
  <div className='cheese'>
    <Image src={cheese} height={80} width={80} alt='Loading icon' />
  </div>
);
