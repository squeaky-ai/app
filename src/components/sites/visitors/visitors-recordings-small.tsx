import React from 'react';
import type { FC } from 'react';
import { RecordingSmallItem } from 'components/sites/recordings/recordings-small-item';
import type { Recordings, Site } from 'types/graphql';

interface Props {
  site: Site;
  recordings: Recordings;
}

export const VisitorsRecordingsSmall: FC<Props> = ({ site, recordings }) => (
  <div className='visitors-recordings-small'>
    {recordings.items.map(recording => (
      <RecordingSmallItem 
        key={recording.id} 
        site={site} 
        recording={recording} 
      />
    ))}
  </div>
);
