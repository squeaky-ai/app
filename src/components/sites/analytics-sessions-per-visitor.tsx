import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import type { SessionsPerVisitor } from 'types/analytics';

interface Props {
  sessionsPerVisitor: SessionsPerVisitor;
}

export const AnalyticsSessionsPerVisitor: FC<Props> = ({ sessionsPerVisitor }) => {
  const { trend, average } = sessionsPerVisitor;

  const direction = trend >= 0 ? 'up' : 'down';

  return (
    <>
      <h3>{toHoursMinutesAndSeconds(average)}</h3>
      <Trend direction={direction} value={average.toFixed(2)} />
    </>
  );
};
