import React from 'react';
import type { FC } from 'react';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  page: string;
  period: TimePeriod;
}

export const AnalyticsPagesTraffic: FC<Props> = () => {
  return  (
    <div className='analytics-traffic pages'>

    </div>
  );
};
