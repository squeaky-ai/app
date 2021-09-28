import React from 'react';
import type { FC } from 'react';
import { Input } from 'components/input';

export const FiltersPages: FC = () => {
  return (
    <form className='filters-pages'>
      <div className='row'>
        <Input placeholder='Search...' />
      </div>
    </form>
  );
};
