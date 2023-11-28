import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_AUDIENCE_QUERY } from 'data/analytics/queries';
import type { AnalyticsBrowsersSort, Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsAudience } from 'types/analytics';
import { useSiteId } from 'hooks/use-site-id';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsAudience | null;
}

interface Props {
  range: TimeRange;
  referrersPage: number;
  browsersPage: number;
  browsersSort: AnalyticsBrowsersSort;
}

export const useAnalyticsAudience = (props: Props): UseAnalytics => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ANALYTICS_AUDIENCE_QUERY, {
    variables: {
      siteId,
      ...props,
      ...props.range,
    },
    skip,
  });

  const fallback: AnalyticsAudience = {
    browsers: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      },
    },
    countries: [],
    devices: [
      {
        type: 'desktop',
        count: 0,
      },
      {
        type: 'mobile',
        count: 0,
      }
    ],
    dimensions: [],
    languages: [],
    referrers: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      }
    },
    visitors: {
      groupRange: 0,
      groupType: '',
      items: [],
    },
  };

  return { 
    loading: loading || skip, 
    error: !!error,
    analytics: data ? data.site.analytics : fallback,
  };
};
