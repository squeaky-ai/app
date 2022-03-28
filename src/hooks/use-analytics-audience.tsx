import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_AUDIENCE_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsAudience } from 'types/analytics';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsAudience | null;
}

interface Props {
  site: Site;
  range: TimeRange;
  browsersPage: number;
  referrersPage: number;
}

export const useAnalyticsAudience = (props: Props): UseAnalytics => {
  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_AUDIENCE_QUERY, {
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
