import { useQuery } from '@apollo/client';
import { GET_ADMIN_USERS_QUERY } from 'data/admin/queries';
import { AdminUserSort } from 'types/graphql';
import type { AdminUsers } from 'types/graphql';

interface Props {
  size: number;
  page: number;
  sort: AdminUserSort;
  search?: string;
}

interface UseAdmin {
  loading: boolean;
  error: boolean;
  users: AdminUsers;
}

export const useAdminUsers = (props: Props): UseAdmin => {
  const { loading, error, data } = useQuery(GET_ADMIN_USERS_QUERY, {
    variables: props,
  });

  const fallback: AdminUsers = {
    items: [],
    pagination: {
      sort: AdminUserSort.CreatedAtDesc,
      total: 0,
      pageSize: 25,
    },
  };

  return {
    loading, 
    error: !!error,
    users: data?.admin?.users || fallback,
  };
};
