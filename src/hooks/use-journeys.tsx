import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_JOURNEYS_QUERY } from 'data/journeys/queries';
import type { TimeRange } from 'types/common';
import type { Site, AnalyticsUserPath } from 'types/graphql';

interface UseJourneys {
  loading: boolean;
  error: boolean;
  journeys: AnalyticsUserPath[];
}

interface Props {
  startPage?: string;
  endPage?: string;
  range: TimeRange;
}

export const useJourneys = (props: Props): UseJourneys => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_JOURNEYS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      startPage: props.startPage || null,
      endPage: props.endPage || null,
      ...props.range,
    }
  });

  return {
    loading,
    error: !!error,
    journeys: data ? data.site.analytics.userPaths : [],
  };
};
