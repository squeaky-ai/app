import { useQuery } from '@apollo/client';
import { GET_ANALYTICS_PAGE_AUDIENCE_QUERY } from 'data/analytics/queries';
import type { AnalyticsBrowsersSort, Site } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { AnalyticsPageAudience } from 'types/analytics';
import { useSiteId } from 'hooks/use-site-id';

interface UseAnalyticsPageAudience {
  loading: boolean;
  error: boolean;
  analytics: AnalyticsPageAudience | null;
}

interface Props {
  range: TimeRange;
  page: string;
  referrersPage: number;
  browsersPage: number;
  browsersSort: AnalyticsBrowsersSort;
}

export const useAnalyticsPageAudience = (props: Props): UseAnalyticsPageAudience => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ANALYTICS_PAGE_AUDIENCE_QUERY, {
    variables: {
      siteId,
      ...props,
      ...props.range,
    },
    skip: !props.page || skip,
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
    loading: loading || skip, 
    error: !!error,
    analytics: data ? data.site.analytics.perPage : fallback,
  };
};
