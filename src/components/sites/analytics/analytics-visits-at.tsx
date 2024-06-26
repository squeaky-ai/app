import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range } from 'lodash';
import { scaleLog } from 'd3-scale';
import { Icon } from 'components/icon';
import { ChartOptions } from 'components/sites/chart-options';
import { percentage } from 'lib/maths';
import { getAmPmForHour } from 'lib/charts';
import { getDayByIndex } from 'lib/dates';
import { ANALYTICS_COLOURS } from 'data/analytics/constants';
import { useChartSettings } from 'hooks/use-chart-settings';
import { AnalyticsVisitAt } from 'types/graphql';

interface Props {
  visitsAt: AnalyticsVisitAt[];
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return prevProps.visitsAt.length === nextProps.visitsAt.length;
};

export const AnalyticsVisitsAt: FC<Props> = React.memo(({ visitsAt }) => {
  const { scale, setScale } = useChartSettings('analytics-visits-at');

  const logarithmicScale = scaleLog();

  const getHourAndDayForIndex = (index: number) => {
    const hour = index % 25;
    const day = Math.ceil((index + 1) / 25) - 1;

    return [hour, day];
  };
    
  const getCountForIndex = (index: number): number => {
    const [hour, day] = getHourAndDayForIndex(index);

    const match = visitsAt.find(v => getDayByIndex(day).substring(0, 3) === v.day && v.hour === hour - 1);

    return match?.count || 0;
  };

  const getLogarithmicPercentage = (count: number) => {
    if (scale !== 'log') return percentage(maxCount, count);

    const value = logarithmicScale(count) || 0;
    const maxLogCount = logarithmicScale(maxCount) || 0;

    return percentage(maxLogCount, value);
  };

  const getBackgroundColor = (count: number) => {
    const percent = getLogarithmicPercentage(count);

    const potentials = ANALYTICS_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  const orderedDayAndHourCounts = range(25 * 8).map(i => getCountForIndex(i));

  const maxCount = Math.max(...Object.values(orderedDayAndHourCounts));

  return (
    <>
      <div className='chart-heading'>
        <h5><Icon name='group-line' /> Visitors by time of day</h5>
        <ChartOptions
          scale={scale}
          setScale={setScale}
        />
      </div>
      <div className='visits-at'>
        {orderedDayAndHourCounts.map((count, index) => {
          const [hour, day] = getHourAndDayForIndex(index);

          const isYLabel = hour === 0;
          const isXLabel = day === 7;

          if (isYLabel) {
            return (
              <div key={index} className='visit label'>
                {getDayByIndex(day).substring(0, 3)}
              </div>
            );
          }

          if (isXLabel) {
            return (
              <div key={index} className={classnames('visit label', { hidden: hour % 2 === 0 })}>
                {getAmPmForHour(hour)}
              </div>
            );
          }

          return (
            <div 
              key={index} 
              className='visit' 
              style={{ background: getBackgroundColor(count).background }}
              data-label={`${getDayByIndex(day)} ${getAmPmForHour(hour)}-${getAmPmForHour(hour === 24 ? 1 : hour + 1)} ${count.toLocaleString()} Vistors`}
            />
          );
        })}
      </div>
    </>
  );
}, areEqual);

AnalyticsVisitsAt.displayName = 'AnalyticsVisitsAt';
