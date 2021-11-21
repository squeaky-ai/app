import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';

interface Props {
  show: boolean;
  sizes?: number[];
  value: number;
  onChange: (value: number) => void;
}

export const PageSize: FC<Props> = ({ show, value, sizes, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event.target.value);
    onChange(size);
  };

  if (!show) return null;

  const values = sizes || [25, 50, 100, 250, 500];

  return (
    <div className='page-size'>
      <Label htmlFor='page-size'>Items per page:</Label>
      <Select name='page-size' value={value} onChange={handleChange}>
        {values.map(v => (
          <Option key={v} value={v}>v</Option>
        ))}
      </Select>
    </div>
  );
};
