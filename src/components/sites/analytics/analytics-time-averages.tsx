import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { expandDay } from 'lib/dates';
import { getAmPmForHour } from 'lib/charts';
import { AnalyticsVisitAt } from 'types/graphql';

interface Props {
  visitsAt: AnalyticsVisitAt[];
}

type Counts = Record<string, number>;

const getMinOrMax = (counts: Counts, direction: 'asc' | 'desc'): string | null => {
  const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  
  const value = direction === 'asc'
    ? sorted[0]
    : sorted[sorted.length - 1];

  return value ? value[0] : null;
};

export const AnalyticsTimeAverages: FC<Props> = ({ visitsAt }) => {
  const dayCounts = visitsAt.reduce((acc, visit) => {
    acc[visit.day] ||= 0;
    acc[visit.day] += visit.count;

    return acc;
  }, {} as Counts);

  const hourCounts = visitsAt.reduce((acc, visit) => {
    acc[visit.hour] ||= 0;
    acc[visit.hour] += visit.count;

    return acc;
  }, {} as Counts);

  const busiestDay = expandDay(getMinOrMax(dayCounts, 'desc')) || 'None';
  const quiestestDay = expandDay(getMinOrMax(dayCounts, 'asc')) || 'None';
  const busiestHour = Number(getMinOrMax(hourCounts, 'desc') || 0);

  return (
    <div className='time-averages'>
      <p>Average busiest day</p>
      <h4>
        <Icon name='calendar-line' />
        {busiestDay}
      </h4>
      <p>Average busiest time</p>
      <h4>
        <Icon name='time-line' />
        {getAmPmForHour(busiestHour)}-{getAmPmForHour(busiestHour === 24 ? 1 : busiestHour + 1)}
      </h4>
      <p>Average quietest day</p>
      <h4>
        <Icon name='calendar-line' />
        {quiestestDay}
      </h4>
    </div>
  );
};
