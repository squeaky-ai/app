import React from 'react';
import type { FC } from 'react';
import { Input } from './input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const DatePicker: FC<Props> = (props) => {
  return (
    <div className='date-picker'>
      <i className='ri-calendar-line' />
      <Input placeholder='DD/MM/YYYY' {...props} />
    </div>
  );
};
