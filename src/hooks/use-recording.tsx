import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_RECORDING_QUERY, GET_RECORDING_EVENTS_QUERY } from 'data/recordings/queries';
import { parseRecordingEvents } from 'lib/events';
import type { Event } from 'types/event';
import type { Site, Recording } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseRecording {
  loading: boolean;
  error: boolean;
  recording: Recording | null;
  events: Event[];
  fetchMoreEvents: (eventPage: number) => Promise<Event[]>;
}

export const useRecording = (id?: string): UseRecording => {
  const router = useRouter();
  const siteId = useSiteId();

  const { data, loading, error, fetchMore } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: {
      siteId,
      recordingId: id || router.query.recording_id as string,
      eventPage: 1,
      excludeRecordingIds: [router.query.recording_id], // We don't want to show this in the sidebar
    },
    skip: !siteId,
  });

  const fetchMoreEvents = async (eventPage: number) => {
    // This is a much ligher query so that the pagination
    // only needs to grab the bare essentials
    const { data } = await fetchMore({ 
      query: GET_RECORDING_EVENTS_QUERY,
      variables: {
        siteId,
        recordingId: router.query.recording_id as string,
        eventPage,
      }
    });

    return parseRecordingEvents(data?.site?.recording?.events?.items || []);
  };

  return {
    loading, 
    error: !!error,
    recording: data 
      ? data.site.recording
      : null,
    events: parseRecordingEvents(data?.site?.recording?.events?.items || []),
    fetchMoreEvents
  };
};
