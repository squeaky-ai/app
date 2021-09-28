import React from 'react';
import type { FC } from 'react';
import { Radio } from 'components/radio';

export const FiltersStatus: FC = () => {
  return (
    <form className='filters-status'>
      <div className='row'>
        <Radio>New</Radio>
        <Radio>Viewed</Radio>
      </div>
    </form>
  );
};
