import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_QUERY } from 'data/dashboard/queries';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimeRange } from 'types/common';

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
    },
    recordingLatest: null,
  };

  return {
    loading,
    error: !!error,
    dashboard: (data ? data.site : fallback) as Dashboard
  };
};
