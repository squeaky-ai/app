import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_HISTORY_STATS_QUERY } from 'data/events/queries';
import type { Site, EventsHistoryStat } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
}

interface UseEventHistoryStats {
  loading: boolean;
  error: boolean;
  eventHistoryStats: EventsHistoryStat[];
}

export const useEventHistoryStats = (props: Props): UseEventHistoryStats => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_HISTORY_STATS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
    }
  });

  return {
    loading,
    error: !!error,
    eventHistoryStats: data ? data.site.eventHistoryStats : [],
  };
};
