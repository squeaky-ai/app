import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_TRAFFIC_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsTraffic } from 'types/analytics';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsTraffic | null;
}

interface Props {
  site: Site;
  range: TimeRange;
  pagesPage: number;
}

export const useAnalyticsTraffic = (props: Props): UseAnalytics => {
  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_TRAFFIC_QUERY, {
    variables: {
      siteId: props.site.id,
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
