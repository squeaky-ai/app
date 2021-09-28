import React from 'react';
import type { FC } from 'react';
import { Input } from 'components/input';

export const FiltersLanguage: FC = () => {
  return (
    <form className='filters-language'>
      <div className='row'>
        <Input placeholder='Search...' />
      </div>
    </form>
  );
};
