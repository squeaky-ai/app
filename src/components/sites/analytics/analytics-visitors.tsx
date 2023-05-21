import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { Label } from 'components/label';
import { Chart } from 'components/sites/chart';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { ChartOptions } from 'components/sites/chart-options';
import { AnalyticsVisitorsChartTooltip } from 'components/sites/analytics/analytics-visitors-chart-tooltip';
import { formatResultsForGroupType, doNotAllowZero } from 'lib/charts-v2';
import { useChartSettings } from 'hooks/use-chart-settings';
import { useChartShow } from 'hooks/use-chart-show';
import type { AnalyticsVisitor, AnalyticsVisitors as AnalyticsVisitorsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  visitors: AnalyticsVisitorsType;
}

const fallback = { allCount: 0, existingCount: 0, newCount: 0 };

export const AnalyticsVisitors: FC<Props> = ({ visitors, period }) => {
  const { show, setShow } = useChartShow('analytics-visitors');
  const { scale, type, setScale, setType } = useChartSettings('analytics-visitors');

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const results = formatResultsForGroupType<AnalyticsVisitor>(visitors, period, fallback).map(d => ({
    dateKey: d.dateKey,
    allCount: doNotAllowZero(scale, show.includes('all') ? d.allCount : 0),
    existingCount: doNotAllowZero(scale, show.includes('existing') ? d.existingCount : 0),
    newCount: doNotAllowZero(scale, show.includes('new') ? d.newCount : 0),
  }));

  const totalCount = sum(visitors.items.map(d => d.allCount));
  const newCount = sum(visitors.items.map(d => d.newCount));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h5>Visitors</h5>
          <h3>{totalCount.toLocaleString()}</h3>
          <Pill type='tertiary' large>{newCount.toLocaleString()} New</Pill>
        </div>

        <div className='actions'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='purple'>All</Checkbox>
          <Checkbox checked={show.includes('existing')} onChange={() => handleClick('existing')}>Existing</Checkbox>
          <Checkbox checked={show.includes('new')} onChange={() => handleClick('new')} className='rose'>New</Checkbox>
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
          tooltip={props => <AnalyticsVisitorsChartTooltip {...props} show={show} period={period} />}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'allCount' }, { dataKey: 'existingCount' }, { dataKey: 'newCount' }]}
          palette={[
            {
              fill: 'var(--purple-500)', 
              stroke: 'var(--purple-500',
              type: 'solid',
            },
            {
              fill: 'var(--blue-400)',
              stroke: 'var(--blue-400',
              type: 'solid',
             },
             {
              fill: 'var(--rose-500)',
              stroke: 'var(--rose-500',
              type: 'solid',
             },
          ]}
        />
      </div>
    </div>
  );
};
