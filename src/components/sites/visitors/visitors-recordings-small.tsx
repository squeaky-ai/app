import React from 'react';
import type { FC } from 'react';
import { RecordingSmallItem } from 'components/sites/recordings/recordings-small-item';
import type { Site, Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorsRecordingsSmall: FC<Props> = ({ site, visitor }) => (
  <div className='visitors-recordings-small'>
    {visitor.recordings.items.map(recording => (
      <RecordingSmallItem 
        key={recording.id} 
        site={site} 
        recording={recording} 
      />
    ))}
  </div>
);
