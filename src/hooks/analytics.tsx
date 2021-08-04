import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/site';
import type { Analytics } from 'types/analytics';

export const useAnalytics = (fromDate: string, toDate: string): [boolean, Analytics] => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      fromDate,
      toDate,
    }
  });

  const fallback: Analytics = {
    viewsAndVisitorsPerHour: [],
    visitors: 0,
    pageViews: 0,
    averageSessionDuration: 0,
    pagesPerSession: 0,
    pages: [],
    browsers: [],
    languages: [],
  };

  const results = data
    ? data.site.analytics
    : fallback;

  return [loading, results];
};
