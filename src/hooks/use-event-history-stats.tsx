import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_HISTORY_STATS_QUERY } from 'data/events/queries';
import type { Site, EventsHistoryStat } from 'types/graphql';

interface UseEventHistoryStats {
  loading: boolean;
  error: boolean;
  eventHistoryStats: EventsHistoryStat[];
}

const toArrayOfStrings = (value: string[] | string) => typeof value === 'string' 
  ? value.split(',').filter(v => !!v)
  : value;

export const useEventHistoryStats = (): UseEventHistoryStats => {
  const router = useRouter();

  const { captureId = '', groupId = '' } = router.query;

  const groupIds = toArrayOfStrings(groupId);
  const captureIds = toArrayOfStrings(captureId);

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_HISTORY_STATS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      groupIds,
      captureIds,
    }
  });

  return {
    loading,
    error: !!error,
    eventHistoryStats: data ? data.site.eventHistoryStats : [],
  };
};
