import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import type { SessionDuration } from 'types/analytics';

interface Props {
  sessionDurations: SessionDuration;
}

export const AnalyticsSessionDuration: FC<Props> = ({ sessionDurations }) => {
  const trend = Number(sessionDurations.trend);

  const direction = trend >= 0 ? 'up' : 'down';

  return (
    <>
      <h3>{toHoursMinutesAndSeconds(Number(sessionDurations.average))}</h3>
      <Trend direction={direction} value={`${direction === 'up' ? '+' : '-'}${toHoursMinutesAndSeconds(Math.abs(trend))}`} />
    </>
  );
};
