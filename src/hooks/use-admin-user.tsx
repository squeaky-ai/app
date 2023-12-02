import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ADMIN_USER_QUERY } from 'data/admin/queries';
import type { AdminUser } from 'types/graphql';

interface UseAdminUser {
  loading: boolean;
  error: boolean;
  user: AdminUser;
}

export const useAdminUser = (): UseAdminUser => {
  const router = useRouter();

  const skip = !router.isReady;

  const { loading, error, data } = useQuery(GET_ADMIN_USER_QUERY, {
    variables: {
      userId: router.query.user_id as string,
    },
    skip,
  });

  return {
    loading: loading || skip, 
    error: !!error,
    user: data?.admin?.user || null,
  };
};
