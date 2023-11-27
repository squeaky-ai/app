import { useQuery } from '@apollo/client';
import { GET_EVENT_STATS_QUERY } from 'data/events/queries';
import type { TimeRange } from 'types/common';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

export type EventStats = Pick<Site, 'eventStats' | 'eventCounts'>

interface Props {
  groupIds: string[];
  captureIds: string[];
  range: TimeRange;
}

interface UseEventStats {
  loading: boolean;
  error: boolean;
  eventStats: EventStats;
}

export const useEventStats = (props: Props): UseEventStats => {
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_STATS_QUERY, {
    variables: {
      siteId,
      ...props,
      ...props.range,
    }
  });

  const fallback: EventStats = {
    eventCounts: {
      groupRange: 0,
      groupType: '',
      items: []
    },
    eventStats: [],
  }

  return {
    loading,
    error: !!error,
    eventStats: data ? data.site : fallback,
  };
};
