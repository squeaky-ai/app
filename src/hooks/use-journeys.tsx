import { useQuery } from '@apollo/client';
import { GET_JOURNEYS_QUERY } from 'data/journeys/queries';
import { PathPosition } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, AnalyticsUserPath } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseJourneys {
  loading: boolean;
  error: boolean;
  routes: string[];
  journeys: AnalyticsUserPath[];
  refetch: VoidFunction,
}

interface Props {
  page: string;
  position: PathPosition;
  range: TimeRange;
}

export const useJourneys = (props: Props): UseJourneys => {
  const siteId = useSiteId();

  const { data, loading, error, refetch } = useQuery<{ site: Site }>(GET_JOURNEYS_QUERY, {
    variables: {
      siteId,
      page: props.page,
      position: props.position,
      ...props.range,
    },
    skip: !props.page || !siteId,
  });

  return {
    loading,
    error: !!error,
    routes: data ? data.site.routes : [],
    journeys: data ? data.site.analytics.userPaths : [],
    refetch,
  };
};
