import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_TRAFFIC_QUERY } from 'data/analytics/queries';
import type { AnalyticsPagesSort, Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsTraffic } from 'types/analytics';
import { useSiteId } from 'hooks/use-site-id';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsTraffic | null;
}

interface Props {
  range: TimeRange;
  pagesPage: number;
  pagesSort: AnalyticsPagesSort;
}

export const useAnalyticsTraffic = (props: Props): UseAnalytics => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ANALYTICS_TRAFFIC_QUERY, {
    variables: {
      siteId,
      ...props,
      ...props.range,
    },
    skip,
  });

  const fallback: AnalyticsTraffic = {
    pageViews: {
      groupRange: 0,
      groupType: '',
      total: 0,
      trend: 0,
      items: [],
    },
    pages: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      }
    },
    pagesPerSession: {
      average: 0,
      trend: 0,
    },
    sessionDurations: {
      average: 0,
      trend: 0,
    },
    sessionsPerVisitor: {
      average: 0,
      trend: 0,
    },
    visitors: {
      groupRange: 0,
      groupType: '',
      items: []
    },
    visitorsCount: {
      new: 0,
      total: 0,
    },
    visitsAt: [],
  };

  return { 
    loading: loading || skip, 
    error: !!error,
    analytics: data ? data.site.analytics : fallback,
  };
};
