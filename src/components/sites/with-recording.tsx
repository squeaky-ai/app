import React from 'react';
import { useRecording } from 'hooks/use-recording';
import type { Recording } from 'types/recording';

export interface WithRecordingProps {
  page: number;
  recording: Recording;
  fetchNextBatchOfEvents: VoidFunction;
}

export const WithRecording = (Component: React.ComponentClass<WithRecordingProps & any>) => {
  const [page, _setPage] = React.useState<number>(1);
  const { recording } = useRecording({ page });

  const fetchNextBatchOfEvents = async () => {
    console.log('!!');
  };

  return (
    <>
      <Component 
        page={page} 
        recording={recording}
        fetchNextBatchOfEvents={fetchNextBatchOfEvents}
      />
    </>
  );
};
