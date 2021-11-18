import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { BASE_PATH } from 'data/common/constants';

export const NoResponses: FC = () => (
  <div className='no-responses'>
    <Image src={`${BASE_PATH}/empty-state-2.svg`} height={180} width={280} />
    <h4>There are currently no responses available</h4>
  </div>
);
