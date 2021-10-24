import React from 'react';
import type { FC } from 'react';
import { average } from 'lib/maths';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import type { SessionDuration } from 'types/analytics';

interface Props {
  sessionDurations: SessionDuration[];
}

export const AnalyticsSessionDuration: FC<Props> = ({ sessionDurations }) => {
  const avg = average(sessionDurations.map(s => Number(s.duration)));

  return (
    <div className='chart-wrapper'>
      <h3>{toHoursMinutesAndSeconds(avg)}</h3>
      <div className='chart'>
       
      </div>
    </div>
  );
};
