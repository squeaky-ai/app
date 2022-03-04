import { useQuery } from '@apollo/client';
import { GET_ADMIN_ACTIVE_VISITORS_QUERY, GET_ADMIN_QUERY } from 'data/admin/queries';
import type { Admin } from 'types/admin';

interface UseAdmin {
  loading: boolean;
  error: boolean;
  admin: Admin;
}

export const useAdmin = (): UseAdmin => {
  const { loading, error, data } = useQuery(GET_ADMIN_QUERY);

  const { data: activeVisitorsAdmin } = useQuery(GET_ADMIN_ACTIVE_VISITORS_QUERY, {
    pollInterval: 5000,
  });

  const fallback: Admin = {
    sitesAdmin: [],
    usersAdmin: [],
    activeVisitorsAdmin: [],
  };

  return {
    loading, 
    error: !!error,
    admin: {
      ...fallback,
      ...data,
      ...activeVisitorsAdmin?.activeVisitorsAdmin,
    },
  };
};
