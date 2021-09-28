import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';

export const FiltersBrowsers: FC = () => {
  return (
    <form className='filters-browsers'>
      <div className='row'>
        <Checkbox>Chrome</Checkbox>
      </div>
    </form>
  );
};
