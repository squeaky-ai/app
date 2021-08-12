import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

interface Props {
  page: number;
}

interface UseRecording {
  loading: boolean;
  recording: Recording | null;
}

export const useRecording = (props: Props): UseRecording => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      recordingId: router.query.recording_id as string,
      eventPage: props.page,
    }
  });

  return {
    loading, 
    recording: data 
      ? data.site.recording 
      : previousData ? previousData.site.recording : null
  };
};
