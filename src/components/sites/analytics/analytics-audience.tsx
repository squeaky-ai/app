import React from 'react';
import type { FC } from 'react';
import { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  period: TimePeriod;
}

export const AnalyticsAudience: FC<Props> = () => {
  return (
    <div className='analytics-audience'>
      <p>...</p>
    </div>
  );
};
