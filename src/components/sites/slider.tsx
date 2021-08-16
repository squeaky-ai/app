import React from 'react';
import type { FC } from 'react';
import { clamp } from 'lodash';
import { Input } from 'components/input';
import type { Recording } from 'types/recording';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  recording: Recording;
  onChange: (value: number) => void;
}

export const Slider: FC<Props> = ({ max, min, step, value, recording, onChange }) => {
  const { totalPages, currentPage } = recording?.events?.pagination || { 
    totalPages: 0, 
    currentPage: 0 
  };

  const progress = clamp(value / (max - min), min, max);
  const buffered = currentPage / totalPages;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    onChange(number);
  };

  return (
    <div className='slider'>
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