import { useQuery } from '@apollo/client';
import { GET_ADMIN_QUERY } from 'data/admin/queries';
import type { Admin } from 'types/graphql';

interface UseAdmin {
  loading: boolean;
  error: boolean;
  admin: Admin;
}

export const useAdmin = (): UseAdmin => {
  const { loading, error, data } = useQuery(GET_ADMIN_QUERY);

  const fallback: Admin = {
    sites: [],
    users: [],
    activeMonthlyUsers: 0,
    activeVisitors: [],
    roles: {
      owners: 0,
      admins: 0,
      members: 0,
    },
    verified: {
      unverified: 0,
      verified: 0,
    },
    blogImages: [],
    recordingsCount: 0,
    recordingsProcessed: 0,
    visitorsCount: 0,
  };

  return {
    loading, 
    error: !!error,
    admin: data?.admin || fallback,
  };
};
