import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useToasts } from 'hooks/use-toasts';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'lib/dates';
import type { Analytics } from 'types/graphql';

interface UseAnalytics {
  loading: boolean;
  error: boolean;
  analytics: Analytics;
}

export const useAnalytics = (range: TimeRange): UseAnalytics => {
  const router = useRouter();
  const toasts = useToasts();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
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
    dimensions: [],
  };

  return { 
    loading, 
    error: !!error,
    analytics: data
      ? data.site.analytics
      : previousData ? previousData.site.analytics : fallback
  };
};
