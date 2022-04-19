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
    loading, 
    error: !!error,
    analytics: data
      ? data.site.analytics
      : previousData ? previousData.site.analytics : fallback
  };
};
