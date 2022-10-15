import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ADMIN_USER_REFERRALS_QUERY } from 'data/admin/queries';
import type { UsersReferral } from 'types/graphql';

interface UseAdminUserReferrals {
  loading: boolean;
  error: boolean;
  referrals: UsersReferral[];
}

export const useAdminUserReferrals = (): UseAdminUserReferrals => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ADMIN_USER_REFERRALS_QUERY, {
    variables: {
      userId: router.query.user_id as string,
    }
  });

  return {
    loading, 
    error: !!error,
    referrals: data?.admin?.user?.partner?.referrals || [],
  };
};
