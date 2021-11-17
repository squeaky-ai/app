import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';
import { TIME_PERIODS } from 'data/heatmaps/constants';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  setPeriod: (period: TimePeriod) => void;
}


export const HeatmapsPeriods: FC<Props> = ({ period, setPeriod }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };

  return (
    <div className='heatmaps-period'>
      <Label htmlFor='periods-search'>Period</Label>
      <Select onChange={handleChange} value={period}>
        {TIME_PERIODS.map(p => (
          <Option value={p.key} key={p.key}>
            {p.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
