import React from 'react';
import type { FC } from 'react';
import { Radio } from 'components/radio';
import { Divider } from 'components/divider';
import { TIME_PERIODS } from 'data/common/constants';
import type { RelativeTime, TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  onChange: (field: string, value: RelativeTime, shouldValidate?: boolean) => void;
}

export const Relative: FC<Props> = ({ period, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('period', event.target.value as RelativeTime);
  };

  return (
    <div className='relative'>
      <div className='radio-group'>
        {TIME_PERIODS.map(({ key, name }) => (
          <Radio
            key={key}
            name='period'
            value={key} 
            checked={period === key}
            onChange={handleChange}
          >
            {name}
          </Radio>
        ))}
      </div>
      <Divider />
    </div>
  );
};
