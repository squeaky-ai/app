import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';

interface Props {
  show: boolean;
  value: number;
  onChange: (value: number) => void;
}

export const PageSize: FC<Props> = ({ show, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event.target.value);
    onChange(size);
  };

  if (!show) return null;

  return (
    <div className='page-size'>
      <Label htmlFor='page-size'>Items per page:</Label>
      <Select name='page-size' value={value} onChange={handleChange}>
        <Option value={25}>25</Option>
        <Option value={50}>50</Option>
        <Option value={100}>100</Option>
        <Option value={250}>250</Option>
        <Option value={500}>500</Option>
      </Select>
    </div>
  );
};
