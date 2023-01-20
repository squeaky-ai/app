import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Chart } from 'components/sites/chart';
import { ChartOptions } from 'components/sites/chart-options';
import { ErrorCountsChartTooltip } from 'components/sites/errors/error-counts-chart-tooltip';
import { formatResultsForGroupType, doNotAllowZero } from 'lib/charts-v2';
import { useChartSettings } from 'hooks/use-chart-settings';
import type { TimePeriod } from 'types/common';
import type { ErrorsCounts, ErrorsCount } from 'types/graphql';

interface Props {
  counts: ErrorsCounts;
  period: TimePeriod;
}

export const ErrorCounts: FC<Props> = ({ counts, period }) => {
  const { scale, setScale, type, setType } = useChartSettings('error-counts');

  const results = formatResultsForGroupType<ErrorsCount>(counts, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: doNotAllowZero(scale, d.count),
  }));

  return (
    <Card className='event-counts'>
      <div className='heading'>
        <div className='title'>
          <h5>All Errors</h5>
          <div className='actions'>
            <ChartOptions
              scale={scale} 
              setScale={setScale}
              chartType={type}
              setChartType={setType}
            />
          </div>
        </div>
      </div>
      <div className='graph-wrapper'>
        <Chart
          data={results}
          tooltip={props => <ErrorCountsChartTooltip {...props} period={period} />}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'count' }]}
          barLineProps={{ stroke: 'var(--rose-500)', fill: 'var(--rose-500)' }}
        />
      </div>
    </Card>
  );
};
