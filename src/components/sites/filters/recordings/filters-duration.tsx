import React from 'react';
import type { FC } from 'react';
import { Radio } from 'components/radio';
import { Option, Select } from 'components/select';
import { Input } from 'components/input';

export const FiltersDuration: FC = () => {
  return (
    <form className='filters-duration'>
      <div className='row'>
        <Radio />
        <Select>
          <Option>Greater than</Option>
          <Option>Less than</Option>
        </Select>
        <Input placeholder='00:00' className='time' />
      </div>
      <div className='row'>
        <Radio />
        <p>Between</p>
        <Input placeholder='00:00' className='time' />
        <p>and</p>
        <Input placeholder='00:00' className='time' />
      </div>
    </form>
  );
};
