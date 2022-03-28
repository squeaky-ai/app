import React from 'react';
import type { FC } from 'react';
import { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const AnalyticsTraffic: FC<Props> = () => {
  return (
    <div className='analytics-traffic'>
      <p>...</p>
    </div>
  );
};
