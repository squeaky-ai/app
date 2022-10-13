import { useQuery } from '@apollo/client';
import { GET_ADMIN_USERS_PARTNERS_QUERY } from 'data/admin/queries';
import type { AdminUser } from 'types/graphql';

interface UseAdminUsersPartners {
  loading: boolean;
  error: boolean;
  users: AdminUser[];
}

export const useAdminUsersPartners = (): UseAdminUsersPartners => {
  const { loading, error, data } = useQuery(GET_ADMIN_USERS_PARTNERS_QUERY);

  return {
    loading, 
    error: !!error,
    users: data?.admin?.usersPartners || [],
  };
};
