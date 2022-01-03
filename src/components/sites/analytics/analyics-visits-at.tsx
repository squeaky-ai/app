import React from 'react';
import type { FC } from 'react';
import { groupBy, range } from 'lodash';
import { percentage } from 'lib/maths';
import { getAmPmForHour } from 'lib/charts';
import { getDayByIndex } from 'lib/dates';
import { getDay, getHours } from 'date-fns';
import { ANALYTICS_COLOURS } from 'data/analytics/constants';

interface Props {
  visitsAt: string[];
}

type DateGroups = Record<string, Record<string, Date[]>>;

export const AnalyticsVisitsAt: FC<Props> = ({ visitsAt }) => {
  const visits = visitsAt.map(v => new Date(Number(v)));

  const groupedByDay = groupBy(visits, v => getDay(v));

  const groupedByDayAndHour = Object.entries(groupedByDay).reduce((acc, [day, dates]) => {
    acc[day] = groupBy(dates, d => getHours(d));
    return acc;
  }, {} as DateGroups);
    
  const getCountForIndex = (index: number): number => {
    const day = index % 8;
    const hour = Math.round(index / 8);
    const hours = groupedByDayAndHour[day] || {};

    return hours[hour]?.length || 0;
  };

  const getBackgroundColor = (count: number) => {
    const percent = percentage(maxCount, count);
    const potentials = ANALYTICS_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  const orderedDayAndHourCounts = range(8 * 24).map(i => getCountForIndex(i));

  const maxCount = Math.max(...Object.values(orderedDayAndHourCounts));

  return (
    <div className='visits-at'>
      {orderedDayAndHourCounts.map((count, i) => {
        const day = i % 8;
        const row = (i + 1) / 8;
        const isLabel = day === 7;
        const hour = Math.ceil((i + 1) / 8) - 1;

        if (isLabel) {
          return (
            <div key={i} className='visit y-label'>
              {row % 2 === 1 ? getAmPmForHour(hour) : null}
            </div>
          );
        }

        return (
          <div 
            key={i} 
            className='visit' 
            style={{ background: getBackgroundColor(count).background }}
            data-label={`${getDayByIndex(day)} ${getAmPmForHour(hour)}-${getAmPmForHour(hour === 24 ? 1 : hour + 1)} ${count} Vistors`}
          />
        );
      })}
      <div className='x-label'>
        Mon
      </div>
      <div className='x-label'>
        Tue
      </div>
      <div className='x-label'>
        Wed
      </div>
      <div className='x-label'>
        Thu
      </div>
      <div className='x-label'>
        Fri
      </div>
      <div className='x-label'>
        Sat
      </div>
      <div className='x-label'>
        Sun
      </div>
    </div>
  );
};
