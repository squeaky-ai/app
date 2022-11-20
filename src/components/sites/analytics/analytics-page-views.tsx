import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { Chart } from 'components/sites/chart';
import { ChartOptions } from 'components/sites/chart-options';
import { AnalyticsPageViewsChartTooltip } from 'components/sites/analytics/analytics-page-views-chart-tooltip';
import { formatResultsForGroupType } from 'lib/charts-v2';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { AnalyticsPageView, AnalyticsPageViews as AnalyticsPageViewsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  pageViews: AnalyticsPageViewsType;
}

export const AnalyticsPageViews: FC<Props> = ({ pageViews, period }) => {
  const { scale, type, setScale, setType } = useChartSettings('analytics-page-views');

  const results = formatResultsForGroupType<AnalyticsPageView>(pageViews, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    totalCount: doNotAllowZero(scale, d.count),
  }));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h5>Page Views</h5>
          <h3>{pageViews.total.toLocaleString()}</h3>
          <Trend direction={pageViews.trend >= 0 ? 'up' : 'down'} value={pageViews.trend.toFixed(2)} />
        </div>

        <div className='actions'>
          <ChartOptions
            scale={scale} 
            setScale={setScale} 
            chartType={type}
            setChartType={setType}
          />
        </div>
      </div>
      <div className='graph-wrapper'>
        <Chart
          data={results}
          tooltip={props => <AnalyticsPageViewsChartTooltip {...props} period={period} />}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'totalCount' }]}
        />
      </div>
    </div>
  );
};
