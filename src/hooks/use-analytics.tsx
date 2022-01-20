import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site, Analytics } from 'types/graphql';
import type { TimeRange } from 'types/common';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: Analytics | null;
}

interface Props {
  range: TimeRange;
  pagesPage: number;
  browsersPage: number;
  referrersPage: number;
}

export const useAnalytics = (props: Props): UseAnalytics => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
      ...props.range,
    }
  });

  return { 
    loading, 
    error: !!error,
    analytics: data
      ? data.site.analytics
      : previousData ? previousData.site.analytics : null
  };
};
