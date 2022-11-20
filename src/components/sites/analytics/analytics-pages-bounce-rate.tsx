import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import type { AnalyticsPerPageBounceRate } from 'types/graphql';

interface Props {
  bounceRate: AnalyticsPerPageBounceRate;
}

export const AnalyticsPagesBounceRate: FC<Props> = ({ bounceRate }) => {
  const { average, trend } = bounceRate;

  return (
    <>
      <h5>Bounce Rate</h5>
      <h3>{average.toFixed(2)}%</h3>
      <Trend 
        inverse
        direction={trend >= 0 ? 'down' : 'up'} 
        value={`${trend.toFixed(2)}%`} 
      />
    </>
  );
};
