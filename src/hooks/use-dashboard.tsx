import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_QUERY } from 'data/dashboard/queries';
import type { TimeRange } from 'types/common';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  range: TimeRange;
}

interface UseDashboard {
  loading: boolean;
  error: boolean;
  dashboard: Dashboard;
}

export const useDashboard = (props: Props): UseDashboard => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_DASHBOARD_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props.range,
    }
  });

  const dashboard: Dashboard = data ? {
    pageViewCount: data.site.analytics.pageViewCount,
    pages: data.site.analytics.pages,
    bounceRate: data.site.analytics.bounceRate,
    bounces: data.site.analytics.bounces,
    exits: data.site.analytics.exits,
    visitorsCount: data.site.analytics.visitorsCount,
    recordingsCount: data.site.analytics.recordingsCount,
    errors: data.site.errors.items,
  } : null;

  return {
    loading,
    error: !!error,
    dashboard,
  };
};
