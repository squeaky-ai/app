import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/site';
import type { Analytics } from 'types/analytics';
import type { TimeRange } from 'lib/dates';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: Analytics;
}

export const useAnalytics = (range: TimeRange): UseAnalytics => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    }
  });

  if (error) {
    console.error(error);
  }

  const fallback: Analytics = {
    recordingsCount: {
      total: 0,
      new: 0,
    },
    visitors: [],
    pageViews: [],
    visitorsCount: {
      total: 0,
      new: 0,
    },
    pageViewCount: 0,
    sessionDurations: {
      average: '0',
      trend: '0',
    },
    pagesPerSession:  {
      average: 0,
      trend: 0,
    },
    sessionsPerVisitor: {
      average: 0,
      trend: 0,
    },
    pages: [],
    browsers: [],
    languages: [],
    referrers: [],
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
    error: !!error,
    analytics: data
      ? data.site.analytics
      : previousData ? previousData.site.analytics : fallback
  };
};
