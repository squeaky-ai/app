import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import type { AnalyticsPerPageDuration } from 'types/graphql';

interface Props {
  averageTimeOnPage: AnalyticsPerPageDuration;
}

export const AnalyticsPagesAverageDuration: FC<Props> = ({ averageTimeOnPage }) => {
  const average = Number(averageTimeOnPage.average);
  const trend = Number(averageTimeOnPage.trend);

  return (
    <>
      <h5>Average Time On Page</h5>
      <h3>{toHoursMinutesAndSeconds(average)}</h3>
      <Trend direction={trend >= 0 ? 'up' : 'down'} value={toHoursMinutesAndSeconds(trend)} />
    </>
  );
};
