import React from 'react';
import type { FC } from 'react';
import { Radio } from 'components/radio';
import { Option, Select } from 'components/select';
import { DatePicker } from 'components/date-picker';

export const FiltersDate: FC = () => {
  return (
    <form className='filters-date'>
      <div className='row'>
        <Radio />
        <Select>
          <Option>Before</Option>
          <Option>After</Option>
        </Select>
        <DatePicker />
      </div>
      <div className='row'>
        <Radio />
        <p>Between</p>
        <DatePicker />
        <p>and</p>
        <DatePicker />
      </div>
    </form>
  );
};
