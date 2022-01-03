import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_QUERY } from 'data/dashboard/queries';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimeRange } from 'types/common';

interface UseDashboard {
  loading: boolean;
  error: boolean;
  dashboard: Dashboard;
}

export const useDashboard = (): UseDashboard => {
  const router = useRouter();

  const now = new Date();

  const range: TimeRange = {
    fromDate: '2021-08-01 ', // earliest thing in the db
    toDate: format(now, 'yyyy-MM-dd')
  };

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_DASHBOARD_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    }
  });

  const fallback: Dashboard = {
    notes: {
      items: []
    },
    analytics: {
      visitorsCount: {
        total: 0,
        new: 0,
      },
      pageViewCount: 0,
      recordingsCount: {
        total: 0,
        new: 0,
      },
      visitsAt: [],
    },
    recordingLatest: null,
  };

  return {
    loading,
    error: !!error,
    dashboard: (data
      ? data.site
      : previousData ? previousData.site : fallback) as Dashboard
  };
};
