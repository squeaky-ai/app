import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useToasts } from 'hooks/use-toasts';
import { GET_RECORDING_QUERY, GET_RECORDING_EVENTS_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/graphql';
import type { Recording, RecordingsEvents } from 'types/graphql';

interface UseRecording {
  loading: boolean;
  error: boolean;
  recording: Recording | null;
  fetchMoreEvents: (eventPage: number) => Promise<RecordingsEvents>;
}

export const useRecording = (id?: string): UseRecording => {
  const router = useRouter();
  const toasts = useToasts();

  const { data, loading, error, fetchMore } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      recordingId: id || router.query.recording_id as string,
      eventPage: 1,
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  const fetchMoreEvents = async (eventPage: number) => {
    // This is a much ligher query so that the pagination
    // only needs to grab the bare essentials
    const { data } = await fetchMore({ 
      query: GET_RECORDING_EVENTS_QUERY,
      variables: {
        siteId: router.query.site_id as string,
        recordingId: router.query.recording_id as string,
        eventPage,
      }
    });

    return data.site.recording.events;
  };

  return {
    loading, 
    error: !!error,
    recording: data 
      ? data.site.recording 
      : null,
      fetchMoreEvents
  };
};
