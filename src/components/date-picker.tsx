import React from 'react';
import type { FC } from 'react';
import { Input } from './input';

export const DatePicker: FC = () => {
  return (
    <div className='date-picker'>
      <i className='ri-calendar-line' />
      <Input placeholder='DD/MM/YYYY' />
    </div>
  );
};
