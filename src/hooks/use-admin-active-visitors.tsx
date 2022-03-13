import { useQuery } from '@apollo/client';
import { GET_ADMIN_ACTIVE_VISITORS_QUERY } from 'data/admin/queries';
import type { ActiveVisitorCount } from 'types/graphql';

interface UseAdminActiveVisitors {
  loading: boolean;
  error: boolean;
  activeVisitorCount: ActiveVisitorCount[];
}

export const useAdminActiveVisitors = (): UseAdminActiveVisitors => {
  const { data, loading, error } = useQuery(GET_ADMIN_ACTIVE_VISITORS_QUERY, {
    pollInterval: 5000,
  });

  return {
    loading, 
    error: !!error,
    activeVisitorCount: data?.activeVisitorsAdmin || [],
  };
};
