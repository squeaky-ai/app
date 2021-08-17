import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY, GET_RECORDING_EVENTS_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { Recording, PaginatedEventsResponse } from 'types/recording';

interface UseRecording {
  loading: boolean;
  recording: Recording | null;
  fetchMoreEvents: (eventPage: number) => Promise<PaginatedEventsResponse>;
}

export const useRecording = (): UseRecording => {
  const router = useRouter();

  const { data, loading, fetchMore } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      recordingId: router.query.recording_id as string,
      eventPage: 1,
    }
  });

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
    recording: data 
      ? data.site.recording 
      : null,
      fetchMoreEvents
  };
};
