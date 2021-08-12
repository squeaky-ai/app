import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { clamp } from 'lodash';
import { Input } from 'components/input';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  onChange: (value: number) => void;
}

export const Slider: FC<Props> = ({ className, max, min, step, value, onChange }) => {
  const progress = clamp(value / (max - min), min, max);
  const buffered = .75;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    onChange(number);
  };

  return (
    <div className={classnames('slider', className)}>
      <div className='bar buffered' style={{ width: `${buffered * 100}%` }} />
      <div className='bar progress' style={{ width: `${progress * 100}%` }} />

      <Input 
        type='range' 
        min={min} 
        max={max} 
        step={step} 
        value={value}
        onChange={handleChange} 
      />
    </div>
  );
};