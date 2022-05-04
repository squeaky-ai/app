import React from 'react';
import type { FC } from 'react';
import { RecordingSmallItem } from 'components/sites/recordings/recordings-small-item';
import type { Site, Recordings } from 'types/graphql';

interface Props {
  recordings: Recordings;
  site: Site;
}

export const RecordingsSmall: FC<Props> = ({ recordings, site }) => (
  <div className='recordings-small'>
    {recordings.items.map(recording => (
      <RecordingSmallItem 
        key={recording.id} 
        site={site} 
        recording={recording} 
      />
    ))}
  </div>
);
