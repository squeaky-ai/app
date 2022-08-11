import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import type { AnalyticsPerPageExitRate } from 'types/graphql';

interface Props {
  exitRate: AnalyticsPerPageExitRate;
}

export const AnalyticsPagesExitRate: FC<Props> = ({ exitRate }) => {
  const { average, trend } = exitRate;

  return (
    <>
      <h5>Exit Rate</h5>
      <h3>{average.toFixed(2)}%</h3>
      <Trend direction={trend >= 0 ? 'up' : 'down'} value={`${trend.toFixed(2)}%`} />
    </>
  );
};
