import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_JOURNEYS_QUERY } from 'data/journeys/queries';
import { PathPosition } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, AnalyticsUserPath } from 'types/graphql';

interface UseJourneys {
  loading: boolean;
  error: boolean;
  journeys: AnalyticsUserPath[];
}

interface Props {
  page: string;
  position: PathPosition;
  range: TimeRange;
}

export const useJourneys = (props: Props): UseJourneys => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_JOURNEYS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      page: props.page,
      position: props.position,
      ...props.range,
    }
  });

  return {
    loading,
    error: !!error,
    journeys: data ? data.site.analytics.userPaths : [],
  };
};
