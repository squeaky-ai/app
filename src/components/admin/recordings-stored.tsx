import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { TooltipProps } from 'recharts';
import { Chart } from 'components/sites/chart';
import { ChartOptions } from 'components/sites/chart-options';
import { formatShortNumbers } from 'lib/maths';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { AdminRecordingsStored } from 'types/graphql';

interface Props {
  recordingsStored: AdminRecordingsStored[];
}

export const RecordingsStored: FC<Props> = ({ recordingsStored }) => {
  const { scale, type, setScale, setType } = useChartSettings('admin-recordings-stored');

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const { count } = payload[0].payload;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{label}</p>
        <p className='count all'>{count || 0}</p>
      </div>
    );
  };

  const data = (() => {
    const now = new Date();
  
    const results = range(0, 11).map(month => {
      const thisMonth = subMonths(now, month);

      const count = recordingsStored
        .filter(r => new Date(r.date) <= thisMonth)
        .reduce((acc, r) => acc + r.count, 0);

      return {
        count: doNotAllowZero(scale, count),
        dateKey: format(thisMonth, 'MMM yy'),
      }
    });

    return results.reverse();
  })();

  return (
    <>
      <div className='chart-heading'>
        <h5>Recordings Stored</h5>
        <ChartOptions
          scale={scale} 
          setScale={setScale} 
          chartType={type}
          setChartType={setType}
        />
      </div>
      <div className='chart-wrapper'>
        <Chart
          admin
          data={data}
          tooltip={CustomTooltip}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'count' }]}
          yAxisProps={{
            tickFormatter: (x) => formatShortNumbers(x) || '0',
          }}
        />
      </div>
    </>
  );
};
