import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/site';
import type { Analytics } from 'types/analytics';
import type { TimeRange } from 'lib/dates';

interface UseAnalytics {
  loading: boolean;
  analytics: Analytics;
}

export const useAnalytics = (range: TimeRange): UseAnalytics => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    }
  });

  const fallback: Analytics = {
    pageViewsRange: [],
    visitors: 0,
    pageViews: 0,
    averageSessionDuration: 0,
    pagesPerSession: 0,
    pages: [],
    browsers: [],
    languages: [],
    devices: [
      {
        type: 'mobile',
        count: 0
      },
      {
        type: 'desktop',
        count: 0
      }
    ],
    dimensions: {
      max: 0,
      min: 0,
      avg: 0
    }
  };

  return { 
    loading, 
    analytics: data
      ? data.site.analytics
      : previousData ? previousData.site.analytics : fallback
  };
};