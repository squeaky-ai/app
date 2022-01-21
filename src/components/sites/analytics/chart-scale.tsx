import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { Dropdown } from 'components/dropdown';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Radio } from 'components/radio';

interface Props {
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
}

export const ChartScale: FC<Props> = ({ scale, setScale }) => (
  <div className='chart-scale'>
    <Dropdown button={<Icon name='settings-3-line' />}>
      <Label>Scale</Label>
      <div className='radio-group'>
        <Radio name='scale' checked={scale === 'log'} onChange={() => setScale('log')}>
          Logarithmic
        </Radio>
        <Radio name='scale' checked={scale === 'auto'} onChange={() => setScale('auto')}>
          Linear
        </Radio>
      </div>
    </Dropdown>
  </div>
);
