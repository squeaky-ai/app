import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Option, Select } from 'components/select';

interface Props {
  depth: number;
  setDepth: (depth: number) => void;
}

export const JourneysDepth: FC<Props> = ({ depth, setDepth }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepth(Number(event.target.value));
  };

  return (
    <div className='journeys-depth'>
      <Label htmlFor='depth'>
        Journey length:
      </Label>
      <Select name='depth' value={depth} onChange={handleChange}>
        <Option value='1'>1 page</Option>
        <Option value='2'>2 pages</Option>
        <Option value='3'>3 pages</Option>
        <Option value='4'>4 pages</Option>
        <Option value='5'>5 pages</Option>
        <Option value='6'>6 pages</Option>
        <Option value='7'>7 pages</Option>
        <Option value='8'>8 pages</Option>
        <Option value='9'>9 pages</Option>
        <Option value='10'>10 pages</Option>
        <Option value='-1'>All pages</Option>
      </Select>
    </div>
  );
};
