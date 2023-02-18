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
  showChartTypes?: ChartType[];
}

export const ChartOptions: FC<Props> = ({ 
  scale,
  setScale,
  chartType,
  setChartType,
  showChartTypes = ['bar', 'line'],
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
            {showChartTypes.includes('line') && (
              <Radio name='chartType' checked={chartType === 'line'} onChange={() => setChartType('line')}>
                Line
              </Radio>
            )}
            {showChartTypes.includes('bar') && (
              <Radio name='chartType' checked={chartType === 'bar'} onChange={() => setChartType('bar')}>
                Bar
              </Radio>
            )}
            {showChartTypes.includes('stacked-bar') && (
              <Radio name='chartType' checked={chartType === 'stacked-bar'} onChange={() => setChartType('stacked-bar')}>
                Stacked Bar
              </Radio>
            )}
          </div>
        </>
      )}
    </Dropdown>
  </div>
);
