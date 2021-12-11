import React from 'react';
import type { FC } from 'react';
import { Illustration } from 'components/illustration';

interface Props {
  type: string;
}

export const EmptyState: FC<Props> = ({ type }) => (
  <div className='empty-state filters'>
    <Illustration src='illustration-13' height={240} width={320} alt='Illustration to represent that there were no filtered results' />
    <h5>There are no {type} matching your selected filters.</h5>
  </div>
);
