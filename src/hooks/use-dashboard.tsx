import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_QUERY } from 'data/dashboard/queries';
import { parseRecordingEvents } from 'lib/events';
import type { TimeRange } from 'types/common';
import type { Event } from 'types/event';
import type { Site, Analytics, Recording, Notes } from 'types/graphql';

interface Props {
  range: TimeRange;
}

interface UseDashboard {
  loading: boolean;
  error: boolean;
  notes: Pick<Notes, 'items'>;
  analytics: Pick<Analytics, 'visitorsCount' | 'pageViewCount' | 'recordingsCount'>;
  recordingLatest: Recording | null;
  recordingLatestEvents: Event[];
}

export const useDashboard = (props: Props): UseDashboard => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_DASHBOARD_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props.range,
    }
  });

  return {
    loading,
    error: !!error,
    notes: data ? data.site.notes : null,
    analytics: data ? data.site.analytics : null,
    recordingLatest: data ? data.site.recordingLatest : null,
    recordingLatestEvents: data ? parseRecordingEvents(data.site.recordingLatest.events.items) : [],
  };
};
