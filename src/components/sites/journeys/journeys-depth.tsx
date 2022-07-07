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
        <Option value='1'></Option>
        <Option value='2'>2</Option>
        <Option value='3'>3</Option>
        <Option value='4'>4</Option>
        <Option value='5'>5</Option>
        <Option value='6'>6</Option>
        <Option value='7'>7</Option>
        <Option value='8'>8</Option>
        <Option value='9'>9</Option>
        <Option value='10'>10</Option>
        <Option value='-1'>All</Option>
      </Select>
    </div>
  );
};
