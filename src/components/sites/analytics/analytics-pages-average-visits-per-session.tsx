import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { AnalyticsPerPageVisitsPerSession } from 'types/graphql';

interface Props {
  averageVisitsPerSession: AnalyticsPerPageVisitsPerSession;
}

export const AnalyticsPagesAverageVisitsPerSession: FC<Props> = ({ averageVisitsPerSession }) => {
  const { average, trend } = averageVisitsPerSession;

  return (
    <>
      <h5>Average Visits Per Session</h5>
      <h3>{average.toFixed(2)}</h3>
      <Trend direction={trend >= 0 ? 'up' : 'down'} value={trend.toFixed(2)} />
    </>
  );
};
