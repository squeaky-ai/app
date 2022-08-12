import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_PAGE_TRAFFIC_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsPageTraffic } from 'types/analytics';

interface UseAnalyticsPageTraffic {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsPageTraffic | null;
}

interface Props {
  site: Site;
  range: TimeRange;
  page: string;
}

export const useAnalyticsPageTraffic = (props: Props): UseAnalyticsPageTraffic => {
  const { data, loading, error } = useQuery<{ site: Site }>(GET_ANALYTICS_PAGE_TRAFFIC_QUERY, {
    variables: {
      siteId: props.site.id,
      ...props,
      ...props.range,
    }
  });

  const fallback: AnalyticsPageTraffic = {
    averageTimeOnPage: {
      average: 0,
      trend: 0,
    },
    averageVisitsPerSession: {
      average: 0,
      trend: 0,
    },
    bounceRate: {
      average: 0,
      trend: 0,
    },
    exitRate: {
      average: 0,
      trend: 0,
    },
    pageViews: {
      groupRange: 0,
      groupType: '',
      total: 0,
      trend: 0,
      items: [],
    },
    visitsAt: [],
  };

  return { 
    loading, 
    error: !!error,
    analytics: data ? data.site.analytics.perPage : fallback,
  };
};
