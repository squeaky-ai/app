import React from 'react';
import type { FC } from 'react';
import { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const AnalyticsAudience: FC<Props> = () => {
  return (
    <div className='analytics-audience'>
      <p>...</p>
    </div>
  );
};
