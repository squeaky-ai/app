import React from 'react';
import type { FC } from 'react';
import RecordingsContainer from './components/RecordingsContainer';
import Alert from 'components/Alert';
import EmptyState from './components/EmptyState';
import EmptyStateImage from './components/EmptyStateImage';
import { Site } from 'data/sites/types';

interface RecordingsProps {
  site: Site; 
}

const Recordings: FC<RecordingsProps> = ({ site }) => (
  <RecordingsContainer>
    {!site.recordings?.items && (
      <EmptyState>
        <EmptyStateImage />
        <h3>There are currently no recordings available.</h3>
        <Alert style={{ maxWidth: 540 }} text='If you have only recently installed your tracking code it may take a little time before results appear.' />
      </EmptyState>
    )}
  </RecordingsContainer>
);

export default Recordings;
