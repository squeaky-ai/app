import React from 'react';
import type { FC } from 'react';
import { Illustration } from 'components/illustration';

export const NoResponses: FC = () => (
  <div className='no-responses'>
    <Illustration illustration='illustration-2' height={180} width={280} />
    <h4>There are currently no responses available</h4>
  </div>
);
