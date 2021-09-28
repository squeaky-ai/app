import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';

export const FiltersDevice: FC = () => {
  return (
    <form className='filters-device'>
      <div className='row'>
        <Checkbox>Desktop/Laptop</Checkbox>
        <Checkbox>Mobile</Checkbox>
      </div>
    </form>
  );
};
