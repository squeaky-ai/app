import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import { Recording } from 'types/recording';

interface Props {
  cursor?: string;
}

export const useRecording = ({ cursor }: Props): [boolean, Recording | null] => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: { 
      site_id: router.query.site_id as string,
      recording_id: router.query.recording_id as string,
      cursor
    }
  });

  return [
    loading, 
    data ? data.site.recording : null
  ];
};
