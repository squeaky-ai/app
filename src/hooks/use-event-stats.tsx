import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_STATS_QUERY } from 'data/events/queries';
import type { TimeRange } from 'types/common';
import type { Site, EventsStat } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
  range: TimeRange;
}

interface UseEventStats {
  loading: boolean;
  error: boolean;
  eventStats: EventsStat[];
}

export const useEventStats = (props: Props): UseEventStats => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_STATS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
      ...props.range,
    }
  });

  return {
    loading,
    error: !!error,
    eventStats: data ? data.site.eventStats : [],
  };
};
