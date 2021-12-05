import React from 'react';
import type { FC } from 'react';
import { Illustration } from 'components/illustration';

interface Props {
  type: string;
  search: boolean;
}

export const EmptyState: FC<Props> = ({ type, search }) => (
  <>
    {search && (
      <div className='empty-state filters'>
        <Illustration src='illustration-4' height={240} width={320} alt='Illustration to represent that there were no search results' />
        <h5>There are no {type} matching your search.</h5>
      </div>
    )}

    {!search && (
      <div className='empty-state filters'>
        <Illustration src='illustration-13' height={240} width={320} alt='Illustration to represent that there were no filtered results' />
        <h5>There are no {type} matching your selected filters.</h5>
      </div>
    )}
  </>
);
