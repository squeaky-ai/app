import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import { Recording } from 'types/recording';

export const useRecording = (): [boolean, Recording | null] => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      recordingId: router.query.recordingId as string
    }
  });

  return [
    loading, 
    data ? data.site.recording : null
  ];
};
