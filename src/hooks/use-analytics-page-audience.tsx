import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_PAGE_AUDIENCE_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsPageAudience } from 'types/analytics';

interface UseAnalyticsPageAudience {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsPageAudience | null;
}

interface Props {
  site: Site;
  range: TimeRange;
  page: string;
  referrersPage: number;
}

export const useAnalyticsPageAudience = (props: Props): UseAnalyticsPageAudience => {
  const { data, loading, error } = useQuery<{ site: Site }>(GET_ANALYTICS_PAGE_AUDIENCE_QUERY, {
    variables: {
      siteId: props.site.id,
      ...props,
      ...props.range,
    }
  });

  const fallback: AnalyticsPageAudience = {
    languages: [],
    countries: [],
    browsers: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      },
    },
    dimensions: [],
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
    referrers: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      },
    },
  };

  return { 
    loading, 
    error: !!error,
    analytics: data ? data.site.analytics.perPage : fallback,
  };
};
