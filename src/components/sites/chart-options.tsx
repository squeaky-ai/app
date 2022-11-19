import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { Dropdown } from 'components/dropdown';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import type { ChartType } from 'types/charts';

interface Props {
  scale?: ScaleType;
  setScale?: (scale: ScaleType) => void;
  chartType?: ChartType;
  setChartType?: (type: ChartType) => void;
}

export const ChartOptions: FC<Props> = ({ 
  scale,
  setScale,
  chartType,
  setChartType,
}) => (
  <div className='chart-options'>
    <Dropdown button={<Icon name='settings-3-line' />}>
      {scale && setScale && (
        <>
          <Label>Scale</Label>
          <div className='radio-group'>
            <Radio name='scale' checked={scale === 'log'} onChange={() => setScale('log')}>
              Logarithmic
            </Radio>
            <Radio name='scale' checked={scale === 'auto'} onChange={() => setScale('auto')}>
              Linear
            </Radio>
          </div>
        </>
      )}
      {chartType && setChartType && (
        <>
          <Label>Chart Type</Label>
          <div className='radio-group'>
            <Radio name='chartType' checked={chartType === 'line'} onChange={() => setChartType('line')}>
              Line
            </Radio>
            <Radio name='chartType' checked={chartType === 'bar'} onChange={() => setChartType('bar')}>
              Bar
            </Radio>
            <Radio name='chartType' checked={chartType === 'area'} onChange={() => setChartType('area')}>
              Area
            </Radio>
          </div>
        </>
      )}
    </Dropdown>
  </div>
);
