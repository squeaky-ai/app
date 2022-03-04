import { useQuery } from '@apollo/client';
import { GET_ADMIN_QUERY } from 'data/admin/queries';
import type { Admin } from 'types/admin';

interface UseAdmin {
  loading: boolean;
  error: boolean;
  admin: Admin;
}

export const useAdmin = (): UseAdmin => {
  const { loading, error, data } = useQuery(GET_ADMIN_QUERY);

  const fallback: Admin = {
    sitesAdmin: [],
    usersAdmin: [],
    activeVisitorsAdmin: [],
  };

  return {
    loading, 
    error: !!error,
    admin: data || fallback,
  };
};
