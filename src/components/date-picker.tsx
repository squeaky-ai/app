import React from 'react';
import type { FC } from 'react';
import { Input } from 'components/input';
import { Icon } from 'components/icon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const DatePicker: FC<Props> = (props) => (
  <div className='date-picker'>
    <Input 
      placeholder='DD/MM/YYYY' 
      autoComplete='off'
      type='date'
      autoFocus
      {...props} 
    />
    <Icon name='calendar-line' />
  </div>
);
