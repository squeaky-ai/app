import { useQuery } from '@apollo/client';
import { GET_ADMIN_QUERY } from 'data/admin/queries';
import type { AdminDashboard } from 'types/admin';

interface UseAdminDashboard {
  loading: boolean;
  error: boolean;
  admin: AdminDashboard; 
}

export const useAdminDashboard = (): UseAdminDashboard => {
  const { loading, error, data } = useQuery(GET_ADMIN_QUERY);

  const fallback: AdminDashboard = {
    activeMonthlyUsers: 0,
    activeVisitors: [],
    roles: {
      owners: 0,
      admins: 0,
      members: 0,
      readonly: 0,
    },
    verified: {
      unverified: 0,
      verified: 0,
    },
    sitesCount: 0,
    usersCount: 0,
    recordingsCount: 0,
    recordingsProcessed: 0,
    visitorsCount: 0,
    recordingsStored: [],
    sitesStored: [],
    usersStored: [],
  };

  return {
    loading, 
    error: !!error,
    admin: data?.admin || fallback,
  };
};
