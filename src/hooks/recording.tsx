import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

interface Props {
  page: number;
}

export const useRecording = (props: Props): [boolean, Recording | null] => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      recordingId: router.query.recording_id as string,
      eventPage: props.page,
    }
  });

  return [
    loading, 
    data 
      ? data.site.recording 
      : previousData ? previousData.site.recording : null
  ];
};
