import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_QUERY } from 'data/analytics/queries';
import type { Site } from 'types/site';
import type { Analytics } from 'types/analytics';

export const useAnalytics = (date_string: string): [boolean, Analytics] => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(GET_ANALYTICS_QUERY, {
    variables: {
      site_id: router.query.site_id as string,
      date_string
    }
  });

  const fallback: Analytics = { 
    visitors: 0,
    pageViews: 0,
    averageSessionDuration: 0,
    pagesPerSession: 0,
    pages: [],
    browsers: [],
  };

  const results = data
    ? data.site.analytics
    : fallback;

  return [loading, results];
};
